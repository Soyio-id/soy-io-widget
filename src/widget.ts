import { getFullUrl } from './utils';

let popupWindow: Window | null = null;

function focusPopup() {
  if (popupWindow && !popupWindow.closed) {
    popupWindow.focus();
  } else {
    throw new Error('Popup window does not exist or is closed.');
  }
}

export function showPopUp(
  flow: Flow,
  configProps: Partial<ConfigProps>,
  isSandbox: boolean,
  developmentUrl: string | undefined,
) {
  const url = getFullUrl(flow, configProps, isSandbox, developmentUrl);

  const w = 510;
  const h = 720;

  // eslint-disable-next-line max-len, no-nested-ternary
  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
  // eslint-disable-next-line max-len, no-nested-ternary
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;

  const left = ((width / 2) - (w / 2));
  const top = ((height / 2) - (h / 2));

  document.body.style.filter = 'blur(5px)';
  document.body.addEventListener('click', (event) => {
    focusPopup();
    event.preventDefault();
  });

  popupWindow = window.open(url, 'Soyio', `scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`);

  focusPopup();
}

export function clearOverlayEffects() {
  document.body.style.filter = '';
  document.body.removeEventListener('click', focusPopup);
}

export function removePopUp() {
  if (popupWindow) {
    popupWindow.close();
    popupWindow = null;
  }
  clearOverlayEffects();
}
