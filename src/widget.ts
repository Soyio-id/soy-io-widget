import {
  CONTAINER_ID,
  IFRAME_ID,
  BASE_URL,
} from './constants';

function getFullUrl(flow: Flow, configProps: ConfigProps, developmentUrl?: string): string {
  let url = developmentUrl ?? BASE_URL;
  url += `/${flow}?isWeb=true&companyId=${configProps.companyId}`;
  if (flow === 'authenticate') {
    url += `&identityId=${configProps.identityId}`;
  } else if (flow === 'register') {
    url += `&flowTemplateId=${configProps.flowTemplateId}`;
  } else {
    url += 'INVALID PARAMS: ';
  }

  return url;
}

function iframeExists(): boolean {
  return !!document.getElementById(IFRAME_ID);
}

function getIframeContainer(): HTMLDivElement | undefined {
  return document.getElementById(CONTAINER_ID) as HTMLDivElement | undefined;
}

// eslint-disable-next-line max-statements
function mountIframe(flow: Flow, configProps: ConfigProps, developmentUrl?: string): HTMLIFrameElement {
  const iframeContainer = getIframeContainer();
  if (!iframeContainer) {
    throw new Error('Iframe container does not exist');
  }

  const iframe = document.createElement('iframe');
  iframe.src = getFullUrl(flow, configProps, developmentUrl);
  iframe.id = IFRAME_ID;
  iframe.style.zIndex = String(Number.MAX_SAFE_INTEGER);
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframeContainer.appendChild(iframe);

  return iframe;
}

export function mountIframeToDOM(flow: Flow, configProps: ConfigProps, developmentUrl?: string): HTMLIFrameElement {
  if (!iframeExists()) {
    return mountIframe(flow, configProps, developmentUrl);
  }

  return document.getElementById(IFRAME_ID) as HTMLIFrameElement;
}

export function removeWidget(): void {
  const iframe = document.getElementById(IFRAME_ID);
  if (iframe) {
    iframe.remove();
  }
}
