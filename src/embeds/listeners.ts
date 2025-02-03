import {
  CONSENT_STATE_CHANGE,
  ConsentState,
  IFRAME_HEIGHT_CHANGE,
  IFRAME_READY,
  IframeHeightChangeEvent,
  IframeReadyEvent,
} from './types';

type PostRobotListener = ReturnType<typeof import('post-robot')['on']>;

type Events = {
  onHeightChange: (height: number) => void;
  onIframeReady: () => void;
  onStateChange: (state: ConsentState) => void;
};

type InstanceListeners = {
  onHeightChange: Record<string, Events['onHeightChange']>;
  onIframeReady: Record<string, Events['onIframeReady']>;
  onStateChange: Record<string, Events['onStateChange']>;
};

const instanceListeners: InstanceListeners = {
  onHeightChange: {},
  onIframeReady: {},
  onStateChange: {},
};

let globalHeightChangeListener: PostRobotListener | undefined;
let globalReadyListener: PostRobotListener | undefined;
let globalStateChangeListener: PostRobotListener | undefined;

export async function setupPostrobotListeners() {
  const postRobot = await import('post-robot');
  if (globalHeightChangeListener || globalReadyListener || globalStateChangeListener) return;

  globalHeightChangeListener = postRobot.on(IFRAME_HEIGHT_CHANGE, async (event) => {
    const eventData = event.data as IframeHeightChangeEvent;
    const onHeightChange = instanceListeners.onHeightChange[eventData.identifier];
    if (!onHeightChange) throw new Error(`No height change listener found for identifier: ${eventData.identifier}`);

    onHeightChange(eventData.height);
  });

  globalReadyListener = postRobot.on(IFRAME_READY, async (event) => {
    const eventData = event.data as IframeReadyEvent;
    const onIframeReady = instanceListeners.onIframeReady[eventData.identifier];
    if (!onIframeReady) throw new Error(`No iframe ready listener found for identifier: ${eventData.identifier}`);

    onIframeReady();
  });

  globalStateChangeListener = postRobot.on(CONSENT_STATE_CHANGE, async (event) => {
    const eventData = event.data as ConsentState & { identifier: string };
    const onStateChange = instanceListeners.onStateChange[eventData.identifier];
    if (!onStateChange) throw new Error(`No state change listener found for identifier: ${eventData.identifier}`);

    onStateChange(eventData);
  });
}

export function mountInstanceListeners(identifier: string, events: Events) {
  const { onHeightChange, onIframeReady, onStateChange } = events;

  instanceListeners.onHeightChange[identifier] = onHeightChange;
  instanceListeners.onIframeReady[identifier] = onIframeReady;
  instanceListeners.onStateChange[identifier] = onStateChange;
}

export function removeInstanceListeners(identifier: string) {
  delete instanceListeners.onHeightChange[identifier];
  delete instanceListeners.onIframeReady[identifier];
  delete instanceListeners.onStateChange[identifier];
}
