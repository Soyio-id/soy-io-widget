import {
  cleanupExistingIframe,
  createIframe,
  getFullUrl,
  getIframeDivContainer,
} from './iframe';
import type { ConsentRequestConfig } from './types';

class ConsentRequestBox {
  private options: ConsentRequestConfig;
  private iframe: HTMLIFrameElement | null = null;

  constructor(options: ConsentRequestConfig) {
    this.options = options;
  }

  mount(selector: string): ConsentRequestBox {
    cleanupExistingIframe();

    const iframeDivContainer = getIframeDivContainer(selector);
    const url = getFullUrl(this.options);

    this.iframe = createIframe(url);
    iframeDivContainer.appendChild(this.iframe);

    return this;
  }

  unmount(): void {
    if (this.iframe) {
      this.iframe.remove();
      this.iframe = null;
    }
  }
}

export { ConsentRequestBox };
