import postRobot from 'post-robot';
import { WidgetProps } from './index';

function setReady(iframe: HTMLIFrameElement) {
  postRobot.send(iframe.contentWindow, 'ready');
}

function setConfig(iframe: HTMLIFrameElement, config: WidgetProps) {
  postRobot.send(iframe.contentWindow, 'config', config);
}

export { setReady, setConfig };
