import { sendAppearanceConfig } from './appearance/send';
import { SoyioAppearance } from './appearance/types';
import {
  cleanupExistingIframe,
  createIframe,
  getFullUrl,
  getIframeDivContainer,
} from './iframe';
import { removeListeners, setListener } from './listeners';
import type { ConsentConfig } from './types';

class ConsentBox {
  private readonly appearance: SoyioAppearance | null;
  private readonly options: ConsentConfig;
  private iframe: HTMLIFrameElement | null = null;

  constructor(options: ConsentConfig) {
    this.options = options;
    this.appearance = options.appearance || null;

    setListener({
      onEvent: this.options.onEvent.bind(this),
      onHeightChange: this.handleHeightChange.bind(this),
      onIframeReady: this.handleIframeReady.bind(this),
    });
  }

  private handleHeightChange(height: number): void {
    if (this.iframe) {
      this.iframe.style.height = `${height}px`;
    }
  }

  private async handleIframeReady(): Promise<void> {
    if (!this.iframe || !this.appearance) return;

    await sendAppearanceConfig(this.iframe, this.appearance);
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
