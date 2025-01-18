import { sendAppearanceConfig } from './appearance/send';
import { SoyioAppearance } from './appearance/types';
import {
  cleanupExistingIframe,
  createIframe,
  getFullUrl,
  getIframeDivContainer,
} from './iframe';
import { removeListeners, setListener } from './listeners';
import type { ConsentCheckboxChangeEvent, ConsentConfig, ConsentState } from './types';

class ConsentBox {
  private readonly appearance: SoyioAppearance | null;
  private readonly options: ConsentConfig;
  private iframe: HTMLIFrameElement | null = null;
  private state: ConsentState = {
    isSelected: false,
    actionToken: null,
  };

  constructor(options: ConsentConfig) {
    this.options = options;
    this.appearance = options.appearance || null;

    setListener({
      onHeightChange: this.handleHeightChange.bind(this),
      onIframeReady: this.handleIframeReady.bind(this),
      onStateChange: this.handleStateChange.bind(this),
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

  private handleStateChange(newState: ConsentState): void {
    const { isSelected, actionToken } = newState;
    this.state = { isSelected, actionToken };

    this.options.onEvent({
      eventName: 'CONSENT_CHECKBOX_CHANGE',
      isSelected,
      actionToken,
    } as ConsentCheckboxChangeEvent);
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

  getState(): ConsentState {
    return { ...this.state };
  }
}

export { ConsentBox };
