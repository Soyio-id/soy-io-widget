import { getFullUrl } from './utils';

let popupWindow: Window | null = null;

// eslint-disable-next-line max-statements, complexity
export function showPopUp(
  flow: Flow,
  configProps: Partial<ConfigProps>,
  isSandbox: boolean,
  developmentUrl: string | undefined,
) {
  const url = getFullUrl(flow, configProps, isSandbox, developmentUrl);

  const w = 710;
  const h = 720;

  // eslint-disable-next-line max-len, no-nested-ternary
  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
  // eslint-disable-next-line max-len, no-nested-ternary
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;

  // eslint-disable-next-line no-magic-numbers
  const left = ((width / 2) - (w / 2));
  // eslint-disable-next-line no-magic-numbers
  const top = ((height / 2) - (h / 2));

  // eslint-disable-next-line max-len
  popupWindow = window.open(url, 'Soyio', `scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`);

  if (popupWindow) {
    popupWindow.focus();
  } else {
    throw new Error('Failed to open new window');
  }
}

export function removePopUp() {
  if (popupWindow) {
    popupWindow.close();
    popupWindow = null;
  }
}
