import {
  ConsentRequestEvent,
  IFRAME_EVENT,
  IFRAME_HEIGHT_CHANGE,
  IframeHeightChangeEvent,
} from './types';

type Events = {
  onEvent: (event: ConsentRequestEvent) => void;
  onHeightChange: (height: number) => void;
};

type PostRobotListener = ReturnType<typeof import('post-robot')['on']>;

let activeListener: PostRobotListener | null = null;
let heightChangeListener: PostRobotListener | null = null;

function removeListeners() {
  activeListener?.cancel();
  activeListener = null;

  heightChangeListener?.cancel();
  heightChangeListener = null;
}

export async function setListener(events: Events) {
  const { onEvent, onHeightChange } = events;
  const postRobot = await import('post-robot');

  removeListeners();

  activeListener = postRobot.on(IFRAME_EVENT, async (event) => {
    const eventData = event.data as ConsentRequestEvent;
    onEvent(eventData);
  });

  heightChangeListener = postRobot.on(IFRAME_HEIGHT_CHANGE, async (event) => {
    const eventData = event.data as IframeHeightChangeEvent;
    onHeightChange(eventData.height);
  });
}

export { removeListeners };
