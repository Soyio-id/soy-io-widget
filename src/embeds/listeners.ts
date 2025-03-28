import {
  IFRAME_HEIGHT_CHANGE,
  IFRAME_READY,
  IframeHeightChangeEvent,
  IframeReadyEvent,
  TOOLTIP_STATE_CHANGE,
  TooltipStateChangeEvent,
} from './base/types';
import { CONSENT_STATE_CHANGE, ConsentState } from './consent/types';

type PostRobotListener = ReturnType<typeof import('post-robot')['on']>;

export type Events = {
  // BASE
  onHeightChange?: (height: number) => void;
  onIframeReady?: () => void;
  onTooltipChange?: (tooltipState: TooltipStateChangeEvent) => void;

  // CONSENT
  onStateChange?: (state: ConsentState) => void;
};

type IframeIdentifier = string

type InstanceListeners = {
  // BASE
  onHeightChange: Record<IframeIdentifier, Events['onHeightChange']>;
  onIframeReady: Record<IframeIdentifier, Events['onIframeReady']>;
  onTooltipChange: Record<IframeIdentifier, Events['onTooltipChange']>;

  // CONSENT
  onStateChange: Record<IframeIdentifier, Events['onStateChange']>;
};

const instanceListeners: InstanceListeners = {
  // BASE
  onHeightChange: {},
  onIframeReady: {},
  onTooltipChange: {},

  // CONSENT
  onStateChange: {},
};

let globalHeightChangeListener: PostRobotListener | undefined;
let globalReadyListener: PostRobotListener | undefined;
let globalTooltipChangeListener: PostRobotListener | undefined;
let globalStateChangeListener: PostRobotListener | undefined;

export async function setupPostrobotListeners() {
  const postRobot = await import('post-robot');

  if (globalHeightChangeListener
    || globalReadyListener
    || globalTooltipChangeListener
    || globalStateChangeListener
  ) return;

  globalHeightChangeListener = postRobot.on(IFRAME_HEIGHT_CHANGE, async (event) => {
    const eventData = event.data as IframeHeightChangeEvent;
    const onHeightChange = instanceListeners.onHeightChange[eventData.identifier];
    if (onHeightChange) onHeightChange(eventData.height);
  });

  globalReadyListener = postRobot.on(IFRAME_READY, async (event) => {
    const eventData = event.data as IframeReadyEvent;
    const onIframeReady = instanceListeners.onIframeReady[eventData.identifier];
    if (onIframeReady) onIframeReady();
  });

  globalTooltipChangeListener = postRobot.on(TOOLTIP_STATE_CHANGE, async (event) => {
    const eventData = event.data as TooltipStateChangeEvent;
    const onTooltipChange = instanceListeners.onTooltipChange[eventData.identifier];
    if (onTooltipChange) onTooltipChange(eventData);
  });

  globalStateChangeListener = postRobot.on(CONSENT_STATE_CHANGE, async (event) => {
    const eventData = event.data as ConsentState & { identifier: string };
    const onStateChange = instanceListeners.onStateChange[eventData.identifier];
    if (onStateChange) onStateChange(eventData);
  });
}

export function mountInstanceListeners(iframeIdentifier: string, events: Events) {
  const {
    onHeightChange, onIframeReady, onTooltipChange, onStateChange,
  } = events;

  if (onHeightChange) instanceListeners.onHeightChange[iframeIdentifier] = onHeightChange;
  if (onIframeReady) instanceListeners.onIframeReady[iframeIdentifier] = onIframeReady;
  if (onTooltipChange) instanceListeners.onTooltipChange[iframeIdentifier] = onTooltipChange;
  if (onStateChange) instanceListeners.onStateChange[iframeIdentifier] = onStateChange;
}

export function removeInstanceListeners(iframeIdentifier: string) {
  delete instanceListeners.onHeightChange[iframeIdentifier];
  delete instanceListeners.onIframeReady[iframeIdentifier];
  delete instanceListeners.onTooltipChange[iframeIdentifier];
  delete instanceListeners.onStateChange[iframeIdentifier];
}
