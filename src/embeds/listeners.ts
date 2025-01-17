import {
  ConsentEvent,
  IFRAME_EVENT,
  IFRAME_HEIGHT_CHANGE,
  IFRAME_READY,
  IframeHeightChangeEvent,
} from './types';

type Events = {
  onEvent: (event: ConsentEvent) => void;
  onHeightChange: (height: number) => void;
  onIframeReady: () => void;
};

type PostRobotListener = ReturnType<typeof import('post-robot')['on']>;

let activeListener: PostRobotListener | null = null;
let heightChangeListener: PostRobotListener | null = null;
let readyListener: PostRobotListener | null = null;

export function removeListeners() {
  activeListener?.cancel();
  activeListener = null;

  heightChangeListener?.cancel();
  heightChangeListener = null;

  readyListener?.cancel();
  readyListener = null;
}

export async function setListener(events: Events) {
  const { onEvent, onHeightChange, onIframeReady } = events;
  const postRobot = await import('post-robot');

  removeListeners();

  activeListener = postRobot.on(IFRAME_EVENT, async (event) => {
    const eventData = event.data as ConsentEvent;
    onEvent(eventData);
  });

  heightChangeListener = postRobot.on(IFRAME_HEIGHT_CHANGE, async (event) => {
    const eventData = event.data as IframeHeightChangeEvent;
    onHeightChange(eventData.height);
  });

  readyListener = postRobot.on(IFRAME_READY, async () => {
    onIframeReady();
  });
}
