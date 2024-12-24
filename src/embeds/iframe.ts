import { CONSENT_REQUEST_IFRAME_ID, PRODUCTION_URL, SANDBOX_URL } from '../constants';

import type { ConsentRequestConfig } from './types';

export function cleanupExistingIframe(): void {
  const existingIframe = document.getElementById(CONSENT_REQUEST_IFRAME_ID);
  if (existingIframe) {
    // eslint-disable-next-line no-console
    console.warn('ConsentRequestBox iframe already exists. Removing existing before mounting new one.');
    existingIframe.remove();
  }
}

export function getIframeDivContainer(selector: string): HTMLDivElement {
  const iframeContainer = document.querySelector(selector);

  if (!iframeContainer) {
    throw new Error(`Iframe div container with id '${selector}' not found`);
  }

  if (iframeContainer.tagName.toLowerCase() !== 'div') {
    throw new Error(`Iframe container with id '${selector}' must be a <div> element`);
  }

  return iframeContainer as HTMLDivElement;
}

export function createIframe(url: string): HTMLIFrameElement {
  const iframe = document.createElement('iframe');
  iframe.id = CONSENT_REQUEST_IFRAME_ID;
  iframe.style.zIndex = String(Number.MAX_SAFE_INTEGER);
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.src = url;
  return iframe;
}

export function getFullUrl(consentRequestConfig: ConsentRequestConfig): string {
  const isSandbox = consentRequestConfig.isSandbox ?? false;
  const baseUrl = consentRequestConfig.developmentUrl || (isSandbox ? SANDBOX_URL : PRODUCTION_URL);

  return `${baseUrl}/embed/consents/${consentRequestConfig.consentRequestId}`;
}
