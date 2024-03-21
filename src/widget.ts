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
  const url = getFullUrl(flow, configProps, isSandbox, developmentUrl);

  const w = 510;
  const h = 520;

  // eslint-disable-next-line max-len, no-nested-ternary
  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
  // eslint-disable-next-line max-len, no-nested-ternary
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;

  // eslint-disable-next-line no-magic-numbers
  const left = ((width / 2) - (w / 2));
  // eslint-disable-next-line no-magic-numbers
  const top = ((height / 2) - (h / 2));

  // eslint-disable-next-line max-len
  const newWindow = window.open(url, 'Soyio', `scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`);

  if (newWindow) {
    newWindow.focus();
  } else {
    throw new Error('Failed to open new window');
  }

  return getIframeContainer() as HTMLIFrameElement;
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
