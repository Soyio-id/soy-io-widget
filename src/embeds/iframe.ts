import { PRODUCTION_URL, SANDBOX_URL } from '../constants';

import type { ConsentConfig } from './types';

export function cleanupExistingIframe(identifier: string): void {
  const existingIframe = document.getElementById(identifier);
  if (existingIframe) {
    // eslint-disable-next-line no-console
    console.warn('ConsentBox iframe already exists. Removing existing before mounting new one.');
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
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    border: none !important;
    transition: height 0.35s !important;
    opacity: 1 !important;
  `;

  return container;
}

export function createIframe(url: string, identifier: string): HTMLIFrameElement {
  const iframe = document.createElement('iframe');
  iframe.id = identifier;
  iframe.src = url;

  iframe.style.cssText += `
    width: 100% !important;
    min-width: 375px !important;
    max-width: 36rem !important;
    border: none !important;
    height: 120px !important;
    overflow: hidden !important;
    opacity: 1;
    transition: height 0.35s,
    opacity 0.4s 0.1s;
  `;

  return iframe;
}

export function getFullUrl(consentConfig: ConsentConfig): string {
  const isSandbox = consentConfig.isSandbox ?? false;
  const baseUrl = consentConfig.developmentUrl || (isSandbox ? SANDBOX_URL : PRODUCTION_URL);

  const urlParams = new URLSearchParams();
  if (consentConfig.actionToken) {
    urlParams.set('actionToken', consentConfig.actionToken);
  }

  const queryString = urlParams.toString();
  return `${baseUrl}/embed/consents/${consentConfig.consentTemplateId}${queryString ? `?${queryString}` : ''}`;
}
