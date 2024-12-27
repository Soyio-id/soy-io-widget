import {
  cleanupExistingIframe,
  createIframe,
  getFullUrl,
  getIframeDivContainer,
} from './iframe';
import { removeListeners, setListener } from './listeners';
import type { ConsentRequestConfig } from './types';

class ConsentRequestBox {
  private options: ConsentRequestConfig;
  private iframe: HTMLIFrameElement | null = null;

  constructor(options: ConsentRequestConfig) {
    this.options = options;

    setListener({
      onEvent: this.options.onEvent.bind(this),
      onHeightChange: this.handleHeightChange.bind(this),
    });
  }

  private handleHeightChange(height: number): void {
    if (this.iframe) {
      this.iframe.style.height = `${height}px`;
    }
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
    removeListeners();

    if (this.iframe) {
      this.iframe.remove();
      this.iframe = null;
    }
  }
}

export { ConsentRequestBox };
