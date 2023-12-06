import { IFRAME_ID, DEVELOPMENT_WIDGET_URL } from './constants';

const WIDGET_URL = DEVELOPMENT_WIDGET_URL;

function getIframe(): HTMLIFrameElement | undefined {
  return document.getElementById(IFRAME_ID) as HTMLIFrameElement | undefined;
}

export function mountIframeToDOM(): HTMLIFrameElement {
  const iframe = getIframe();
  if (!iframe) {
    throw new Error('Iframe does not exist');
  }
  iframe.src = WIDGET_URL;

  return iframe;
}
