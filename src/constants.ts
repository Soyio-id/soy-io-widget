import { IframeCSSConfig } from './embeds/base/utils';

export const PRODUCTION_URL = 'https://app.soyio.id';
export const SANDBOX_URL = 'https://sandbox.soyio.id';
export const FINISHING_EVENTS = [
  'DISCLOSURE_REQUEST_SUCCESSFUL',
  'IDENTITY_REGISTERED',
  'IDENTITY_SIGNATURE',
  'UNEXPECTED_ERROR',
  'DENIED_CAMERA_PERMISSION',
  'REJECTED_SIGNATURE',
];
export const CLOSED_EVENT = 'WIDGET_CLOSED';

export const POPUP_WIDTH = 420;
export const POPUP_HEIGHT = 720;
export const POPUP_CHECK_INTERVAL_MS = 500;

export const CONSENT_DEFAULT_HEIGHT_PX = 120;

export const DEFAULT_IFRAME_CSS_CONFIG: IframeCSSConfig = {
  minWidth: '375px',
  maxWidth: '50rem',
};

export const CONSENT_DEFAULT_IFRAME_CSS_CONFIG: IframeCSSConfig = {
  minWidth: '375px',
  maxWidth: '36rem',
};

export const PRIVACY_CENTER_DEFAULT_IFRAME_CSS_CONFIG: IframeCSSConfig = {
  minWidth: '375px',
  maxWidth: '50rem',
};
