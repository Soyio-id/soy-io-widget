import { CONTAINER_ID, DEVELOPMENT_WIDGET_URL } from './constants';

const WIDGET_URL = DEVELOPMENT_WIDGET_URL;

function getIframeContainer(): HTMLDivElement | undefined {
  return document.getElementById(CONTAINER_ID) as HTMLDivElement | undefined;
}

export function mountIframeToDOM(): HTMLIFrameElement {
  const iframeContainer = getIframeContainer();
  if (!iframeContainer) {
    throw new Error('Iframe container does not exist');
  }

  const iframe = document.createElement('iframe');
  iframe.src = WIDGET_URL;
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframeContainer.appendChild(iframe);

  return iframe;
}
