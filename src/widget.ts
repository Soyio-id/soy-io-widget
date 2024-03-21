import { CONTAINER_ID, IFRAME_ID } from './constants';
import { getFullUrl } from './utils';

function iframeExists(): boolean {
  return !!document.getElementById(IFRAME_ID);
}

function getIframeContainer(): HTMLDivElement | undefined {
  return document.getElementById(CONTAINER_ID) as HTMLDivElement | undefined;
}

// eslint-disable-next-line max-statements, complexity
function mountIframe(
  flow: Flow,
  configProps: Partial<ConfigProps>,
  isSandbox: boolean,
  developmentUrl: string | undefined,
): HTMLIFrameElement {
  const iframeContainer = getIframeContainer();
  if (!iframeContainer) {
    throw new Error('Iframe container does not exist');
  }

  const iframe = document.createElement('iframe');
  iframe.src = getFullUrl(flow, configProps, isSandbox, developmentUrl);
  iframe.id = IFRAME_ID;
  iframe.style.zIndex = String(Number.MAX_SAFE_INTEGER);
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.allow = 'autoplay';
  iframe.allow = 'camera';
  iframe.allow = 'publickey-credentials-get *';
  // iframe.allow = 'publickey-credentials-create *';
  iframeContainer.appendChild(iframe);

  return iframe;
}

export function mountIframeToDOM(
  flow: Flow,
  configProps: Partial<ConfigProps>,
  isSandbox: boolean,
  developmentUrl: string | undefined,
): HTMLIFrameElement {
  if (!iframeExists()) {
    return mountIframe(flow, configProps, isSandbox, developmentUrl);
  }

  return document.getElementById(IFRAME_ID) as HTMLIFrameElement;
}

export function removeWidget(): void {
  const iframe = document.getElementById(IFRAME_ID);
  if (iframe) {
    iframe.remove();
  }
}
