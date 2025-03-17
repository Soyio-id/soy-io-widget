import { sendAppearanceConfig } from './appearance/send';
import { SoyioAppearance } from './appearance/types';
import {
  cleanupExistingIframe,
  createIframe,
  getFullUrl,
  getIframeDivContainer,
} from './iframe';
import { mountInstanceListeners, removeInstanceListeners, setupPostrobotListeners } from './listeners';
import { Skeleton } from './skeleton';
import { TooltipManager } from './tooltip-manager';
import type {
  ConsentCheckboxChangeEvent,
  ConsentConfig,
  ConsentState,
  TooltipStateChangeEvent,
} from './types';

class ConsentBox {
  private readonly appearance: SoyioAppearance | null;
  private readonly options: ConsentConfig;
  private readonly tooltipManager: TooltipManager;
  private readonly skeleton: Skeleton;
  private iframe: HTMLIFrameElement | null = null;
  private state: ConsentState = {
    isSelected: false,
    actionToken: null,
  };

  constructor(options: ConsentConfig) {
    this.options = options;
    this.appearance = options.appearance || null;
    this.tooltipManager = new TooltipManager();
    this.skeleton = new Skeleton(this.uniqueIdentifier);

    this.setup();
  }

  private handleHeightChange(height: number): void {
    if (!this.iframe) return;

    this.iframe.style.height = `${height}px`;

    if (height > 0) return;

    const { parentElement } = this.iframe;
    if (parentElement) parentElement.style.display = 'none';
  }

  private async handleIframeReady(): Promise<void> {
    if (!this.iframe) return;
    this.skeleton.hide();

    if (this.options.onReady) {
      this.options.onReady();
    }

    if (this.appearance) {
      sendAppearanceConfig(this.iframe, this.appearance, this.uniqueIdentifier);
    }
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

  private async setup(): Promise<void> {
    await setupPostrobotListeners();
    mountInstanceListeners(this.uniqueIdentifier, {
      onHeightChange: this.handleHeightChange.bind(this),
      onIframeReady: this.handleIframeReady.bind(this),
      onStateChange: this.handleStateChange.bind(this),
      onTooltipChange: this.handleTooltipChange.bind(this),
    });
  }

  private handleTooltipChange(tooltipState: TooltipStateChangeEvent): void {
    if (!this.iframe) return;

    const iframeRect = this.iframe.getBoundingClientRect();
    const { text, coordinates, isVisible } = tooltipState;

    const absoluteX = coordinates.x + iframeRect.left;
    const absoluteY = coordinates.y + iframeRect.top;

    if (isVisible) {
      this.tooltipManager.show(text, absoluteX, absoluteY);
    } else {
      this.tooltipManager.hide();
    }
  }

  mount(selector: string): ConsentBox {
    cleanupExistingIframe(this.iframeIdentifier);

    const iframeDivContainer = getIframeDivContainer(selector);
    const url = getFullUrl(this.options);

    this.iframe = createIframe(url, this.iframeIdentifier);
    this.skeleton.mount(iframeDivContainer);
    iframeDivContainer.appendChild(this.iframe);

    return this;
  }

  unmount(): void {
    removeInstanceListeners(this.uniqueIdentifier);
    this.skeleton.hide();

    if (this.iframe) {
      this.iframe.remove();
      this.iframe = null;
    }
  }

  getState(): ConsentState {
    return { ...this.state };
  }

  get iframeIdentifier(): string {
    return `consent-box-${this.uniqueIdentifier}`;
  }

  get uniqueIdentifier(): string {
    return this.options.consentTemplateId;
  }
}

export { ConsentBox };
