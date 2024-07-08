import type { AttemptConfig } from './types';
import { getFullUrl } from './utils';

const POPUP_CHECK_INTERVAL_MS = 500;

let popupWindow: Window | null = null;
let popupCheckInterval: NodeJS.Timeout | null = null;

function focusPopup() {
  if (popupWindow && !popupWindow.closed) {
    popupWindow.focus();
  }
}

function setPopupCheckInterval() {
  popupCheckInterval = setInterval(() => {
    if (!popupWindow || popupWindow.closed) {
      if (popupCheckInterval) clearInterval(popupCheckInterval);
      document.body.style.filter = 'none';
    }
  }, POPUP_CHECK_INTERVAL_MS);
}

export function showPopUp(options: AttemptConfig) {
  const url = getFullUrl(options);

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
  setPopupCheckInterval();
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
