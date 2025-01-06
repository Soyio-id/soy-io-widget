import {
  cleanupExistingIframe,
  createIframe,
  getFullUrl,
  getIframeDivContainer,
} from './iframe';
import { removeListeners, setListener } from './listeners';
import type { ConsentConfig } from './types';

class ConsentBox {
  private options: ConsentConfig;
  private iframe: HTMLIFrameElement | null = null;

  constructor(options: ConsentConfig) {
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

  mount(selector: string): ConsentBox {
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

export { ConsentBox };
