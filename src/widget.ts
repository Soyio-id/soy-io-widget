import { IFRAME_ID, DEVELOPMENT_WIDGET_URL } from './constants';

const WIDGET_URL = DEVELOPMENT_WIDGET_URL;

function getIframe(): HTMLIFrameElement {
  return document.getElementById(IFRAME_ID) as HTMLIFrameElement;
}

function iframeExists(): boolean {
  return !!getIframe();
}

function addIframeInfo(iframe: HTMLIFrameElement): HTMLIFrameElement {
  iframe.src = WIDGET_URL;
  iframe.id = IFRAME_ID;

  return iframe;
}

function mountIframe(): HTMLIFrameElement {
  const iframe = document.createElement('iframe');
  iframe.src = WIDGET_URL;
  iframe.id = IFRAME_ID;
  document.body.appendChild(iframe);

  return iframe;
}

export function mountIframeToDOM(): HTMLIFrameElement {
  if (!iframeExists()) {
    return mountIframe();
  }
  const iframe = getIframe();

  return addIframeInfo(iframe);
}
