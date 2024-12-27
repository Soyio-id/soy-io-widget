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
  const iframeDivContainer = document.querySelector(selector);

  if (!iframeDivContainer) {
    throw new Error(`Iframe div container with id '${selector}' not found`);
  }

  if (iframeDivContainer.tagName.toLowerCase() !== 'div') {
    throw new Error(`Iframe container with id '${selector}' must be a <div> element`);
  }

  const container = iframeDivContainer as HTMLDivElement;
  container.style.position = 'relative';
  container.style.cssText += `
    padding: 0 !important;
    margin: 0 !important;
    display: block !important;
    border: none !important;
    transition: height 0.35s !important;
    opacity: 1 !important;
  `;

  return container;
}

export function createIframe(url: string): HTMLIFrameElement {
  const iframe = document.createElement('iframe');
  iframe.id = CONSENT_REQUEST_IFRAME_ID;
  iframe.src = url;

  iframe.style.cssText += `
    width: 100% !important;
    border: none !important;
    height: 110px !important;
    overflow: hidden !important;
    opacity: 1;
    transition: height 0.35s,
    opacity 0.4s 0.1s;
  `;

  return iframe;
}

export function getFullUrl(consentRequestConfig: ConsentRequestConfig): string {
  const isSandbox = consentRequestConfig.isSandbox ?? false;
  const baseUrl = consentRequestConfig.developmentUrl || (isSandbox ? SANDBOX_URL : PRODUCTION_URL);

  return `${baseUrl}/embed/consents/${consentRequestConfig.consentRequestId}`;
}
