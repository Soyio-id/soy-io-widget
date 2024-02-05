import {
  CONTAINER_ID,
  IFRAME_ID,
  STAGING_WIDGET_URL,
  LOCALHOST_WIDGET_URL,
} from './constants';

function iframeExists(): boolean {
  return !!document.getElementById(IFRAME_ID);
}

function getIframeContainer(): HTMLDivElement | undefined {
  return document.getElementById(CONTAINER_ID) as HTMLDivElement | undefined;
}

// eslint-disable-next-line max-statements
function mountIframe(widgetUrl: WidgetUrl): HTMLIFrameElement {
  const iframeContainer = getIframeContainer();
  if (!iframeContainer) {
    throw new Error('Iframe container does not exist');
  }

  const iframe = document.createElement('iframe');
  iframe.src = widgetUrl === 'staging' ? STAGING_WIDGET_URL : LOCALHOST_WIDGET_URL;
  iframe.id = IFRAME_ID;
  iframe.style.zIndex = String(Number.MAX_SAFE_INTEGER);
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframeContainer.appendChild(iframe);

  return iframe;
}

export function mountIframeToDOM(widgetUrl: WidgetUrl): HTMLIFrameElement {
  if (!iframeExists()) {
    return mountIframe(widgetUrl);
  }

  return document.getElementById(IFRAME_ID) as HTMLIFrameElement;
}
