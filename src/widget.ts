import { CONTAINER_ID, IFRAME_ID, DEVELOPMENT_WIDGET_URL } from './constants';

const WIDGET_URL = DEVELOPMENT_WIDGET_URL;

function iframeExists(): boolean {
  return !!document.getElementById(IFRAME_ID);
}

function getIframeContainer(): HTMLDivElement | undefined {
  return document.getElementById(CONTAINER_ID) as HTMLDivElement | undefined;
}

// eslint-disable-next-line max-statements
function mountIframe(): HTMLIFrameElement {
  const iframeContainer = getIframeContainer();
  if (!iframeContainer) {
    throw new Error('Iframe container does not exist');
  }

  const iframe = document.createElement('iframe');
  iframe.src = WIDGET_URL;
  iframe.id = IFRAME_ID;
  iframe.style.zIndex = String(Number.MAX_SAFE_INTEGER);
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframeContainer.appendChild(iframe);

  return iframe;
}

export function mountIframeToDOM(): HTMLIFrameElement {
  if (!iframeExists()) {
    return mountIframe();
  }

  return document.getElementById(IFRAME_ID) as HTMLIFrameElement;
}
