import {
  ConsentEvent,
  IFRAME_HEIGHT_CHANGE,
  IFRAME_READY,
  IframeHeightChangeEvent,
  IframeReadyEvent,
  INFO_EVENT,
  ITooltipStateChangeEvent,
  TOOLTIP_STATE_CHANGE,
} from './base/types';
import { CONSENT_STATE_CHANGE, ConsentState } from './consent/types';

type PostRobotListener = ReturnType<typeof import('post-robot')['on']>;

export type Events = {
  // BASE
  onHeightChange?: (height: number) => void;
  onIframeReady?: () => void;
  onTooltipChange?: (tooltipState: ITooltipStateChangeEvent) => void;
  onInfo?: (info: Record<string, unknown>) => void;

  // CONSENT
  onStateChange?: (state: ConsentState) => void;
};

type IframeIdentifier = string

type InstanceListeners = {
  // BASE
  onHeightChange: Record<IframeIdentifier, Events['onHeightChange']>;
  onIframeReady: Record<IframeIdentifier, Events['onIframeReady']>;
  onTooltipChange: Record<IframeIdentifier, Events['onTooltipChange']>;
  onInfo: Record<IframeIdentifier, Events['onInfo']>;

  // CONSENT
  onStateChange: Record<IframeIdentifier, Events['onStateChange']>;
};

const instanceListeners: InstanceListeners = {
  // BASE
  onHeightChange: {},
  onIframeReady: {},
  onTooltipChange: {},
  onInfo: {},

  // CONSENT
  onStateChange: {},
};

let globalHeightChangeListener: PostRobotListener | undefined;
let globalReadyListener: PostRobotListener | undefined;
let globalTooltipChangeListener: PostRobotListener | undefined;
let globalStateChangeListener: PostRobotListener | undefined;
let globalInfoEventListener: PostRobotListener | undefined;

export async function setupPostrobotListeners() {
  const postRobot = await import('post-robot');

  if (globalHeightChangeListener
    || globalReadyListener
    || globalTooltipChangeListener
    || globalStateChangeListener
    || globalInfoEventListener
  ) return;

  globalHeightChangeListener = postRobot.on(IFRAME_HEIGHT_CHANGE, async (event) => {
    const eventData = event.data as IframeHeightChangeEvent;
    const onHeightChange = instanceListeners.onHeightChange[eventData.identifier];
    if (onHeightChange) onHeightChange(eventData.height);

    return Promise.resolve();
  });

  globalReadyListener = postRobot.on(IFRAME_READY, async (event) => {
    const eventData = event.data as IframeReadyEvent;
    const onIframeReady = instanceListeners.onIframeReady[eventData.identifier];
    if (onIframeReady) onIframeReady();

    return Promise.resolve();
  });

  globalTooltipChangeListener = postRobot.on(TOOLTIP_STATE_CHANGE, async (event) => {
    const eventData = event.data as ITooltipStateChangeEvent;
    const onTooltipChange = instanceListeners.onTooltipChange[eventData.identifier];
    if (onTooltipChange) onTooltipChange(eventData);

    return Promise.resolve();
  });

  globalStateChangeListener = postRobot.on(CONSENT_STATE_CHANGE, async (event) => {
    const eventData = event.data as ConsentState & { identifier: string };
    const onStateChange = instanceListeners.onStateChange[eventData.identifier];
    if (onStateChange) onStateChange(eventData);

    return Promise.resolve();
  });

  globalInfoEventListener = postRobot.on(INFO_EVENT, async ({ data }: { data: ConsentEvent }) => {
    const { identifier, ...dataWithoutIdentifier } = data;
    const onInfo = instanceListeners.onInfo[identifier];
    if (onInfo) onInfo(dataWithoutIdentifier);

    return Promise.resolve();
  });
}

export function mountInstanceListeners(iframeIdentifier: string, events: Events) {
  const {
    onHeightChange, onIframeReady, onTooltipChange, onStateChange, onInfo,
  } = events;

  if (onHeightChange) instanceListeners.onHeightChange[iframeIdentifier] = onHeightChange;
  if (onIframeReady) instanceListeners.onIframeReady[iframeIdentifier] = onIframeReady;
  if (onTooltipChange) instanceListeners.onTooltipChange[iframeIdentifier] = onTooltipChange;
  if (onStateChange) instanceListeners.onStateChange[iframeIdentifier] = onStateChange;
  if (onInfo) instanceListeners.onInfo[iframeIdentifier] = onInfo;
}

export function removeInstanceListeners(iframeIdentifier: string) {
  delete instanceListeners.onHeightChange[iframeIdentifier];
  delete instanceListeners.onIframeReady[iframeIdentifier];
  delete instanceListeners.onTooltipChange[iframeIdentifier];
  delete instanceListeners.onStateChange[iframeIdentifier];
  delete instanceListeners.onInfo[iframeIdentifier];
}
