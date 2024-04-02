import postRobot from 'post-robot';

import type { ConfigProps } from './types';

function setReady(iframe: HTMLIFrameElement) {
  postRobot.send(iframe.contentWindow, 'ready');
}

function setConfig(iframe: HTMLIFrameElement, config: Partial<ConfigProps>) {
  postRobot.send(iframe.contentWindow, 'config', config);
}

export { setReady, setConfig };
