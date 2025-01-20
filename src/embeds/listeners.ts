import {
  CONSENT_STATE_CHANGE,
  ConsentState,
  IFRAME_HEIGHT_CHANGE,
  IFRAME_READY,
  IframeHeightChangeEvent,
} from './types';

type Events = {
  onHeightChange: (height: number) => void;
  onIframeReady: () => void;
  onStateChange: (state: ConsentState) => void;
};

type PostRobotListener = ReturnType<typeof import('post-robot')['on']>;

let heightChangeListener: PostRobotListener | null = null;
let readyListener: PostRobotListener | null = null;
let stateChangeListener: PostRobotListener | null = null;

export function removeListeners() {
  heightChangeListener?.cancel();
  heightChangeListener = null;

  readyListener?.cancel();
  readyListener = null;

  stateChangeListener?.cancel();
  stateChangeListener = null;
}

export async function setListener(events: Events) {
  const { onHeightChange, onIframeReady, onStateChange } = events;
  const postRobot = await import('post-robot');

  removeListeners();

  heightChangeListener = postRobot.on(IFRAME_HEIGHT_CHANGE, async (event) => {
    const eventData = event.data as IframeHeightChangeEvent;
    onHeightChange(eventData.height);
  });

  readyListener = postRobot.on(IFRAME_READY, async () => {
    onIframeReady();
  });

  stateChangeListener = postRobot.on(CONSENT_STATE_CHANGE, async (event) => {
    const eventData = event.data as ConsentState;
    onStateChange(eventData);
  });
}
