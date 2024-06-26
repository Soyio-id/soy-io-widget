import postRobot from 'post-robot';

import type { AttemptConfig } from './types';

function setReady(iframe: HTMLIFrameElement) {
  postRobot.send(iframe.contentWindow, 'ready');
}

function setConfig(iframe: HTMLIFrameElement, config: Partial<AttemptConfig>) {
  postRobot.send(iframe.contentWindow, 'config', config);
}

export { setReady, setConfig };
