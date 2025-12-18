import {
  POPUP_CHECK_INTERVAL_MS,
  POPUP_HEIGHT,
  POPUP_WIDTH,
} from '../constants';

import type { RequestConfig } from './types';
import { getFullUrl } from './utils';

let popupWindow: Window | null = null;
let popupCheckInterval: NodeJS.Timeout | null = null;

function focusPopup(event: MouseEvent | null = null) {
  if (popupWindow && !popupWindow.closed) {
    popupWindow.focus();
  }
  event?.preventDefault();
}

export function clearOverlayEffects() {
  document.body.style.filter = '';
  document.body.removeEventListener('click', focusPopup);
}

function setPopupCheckInterval() {
  popupCheckInterval = setInterval(() => {
    if (!popupWindow || popupWindow.closed) {
      if (popupCheckInterval) clearInterval(popupCheckInterval);

      clearOverlayEffects();
    }
  }, POPUP_CHECK_INTERVAL_MS);
}

// https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
export function showPopUp(options: RequestConfig) {
  const url = getFullUrl(options);
  const w = POPUP_WIDTH;
  const h = POPUP_HEIGHT;

  // Handle dual screen position
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

  // Get the actual width and height of the browser window
  const width = window.innerWidth
                || document.documentElement.clientWidth
                || window.screen.width;
  const height = window.innerHeight
                 || document.documentElement.clientHeight
                 || window.screen.height;

  // Calculate system zoom factor
  const systemZoom = width / window.screen.availWidth;

  // Calculate centered position considering zoom and screen position
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;

  const popupFeatures = [
    'scrollbars=yes',
    `width=${w}`,
    `height=${h}`,
    `top=${top}`,
    `left=${left}`,
  ].join(',');

  // Safari and some blockers require the window to be opened synchronously with a user gesture.
  // Start with about:blank, then redirect to the target URL once the window exists.
  const newPopup = window.open('about:blank', 'Soyio', popupFeatures);

  if (newPopup) {
    popupWindow = newPopup;
    popupWindow.location.href = url;

    document.body.style.filter = 'blur(5px)';
    document.body.addEventListener('click', focusPopup);

    focusPopup();
    setPopupCheckInterval();
  } else {
    clearOverlayEffects();
    alert('Debes habilitar las ventanas emergentes para poder iniciar el flujo.');
  }
}

export function removePopUp() {
  if (popupWindow) {
    popupWindow.close();
    popupWindow = null;
  }
  clearOverlayEffects();
}
