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

export type IframeCSSConfig = {
  minWidth?: string;
}

export function createIframe(url: string, identifier: string, cssConfig: IframeCSSConfig): HTMLIFrameElement {
  const iframe = document.createElement('iframe');
  iframe.id = identifier;
  iframe.src = url;

  iframe.style.cssText += `
    width: 100% !important;
    min-width: ${cssConfig.minWidth} !important;
    border: none !important;
    overflow: hidden !important;
    opacity: 1;
    transition: height 0.35s,
    opacity 0.4s 0.1s;
  `;

  return iframe;
}

export function generateUniqueIframeId(): string {
  return Math.random().toString(36).substring(2, 10);
}
