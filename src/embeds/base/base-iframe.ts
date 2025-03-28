import { sendAppearanceConfig } from '../appearance/send';
import { SoyioAppearance } from '../appearance/types';
import {
  mountInstanceListeners,
  removeInstanceListeners,
  setupPostrobotListeners,
} from '../listeners';

import { TooltipManager } from './tooltip-manager';
import type {
  BaseConfig, ISkeletonView, SkeletonConstructor, TooltipStateChangeEvent,
} from './types';
import {
  cleanupExistingIframe,
  createIframe,
  generateUniqueIframeId,
  getIframeDivContainer,
} from './utils';

export abstract class BaseIframeBox<T extends BaseConfig> {
  protected iframe: HTMLIFrameElement | null = null;
  protected skeleton: ISkeletonView | null = null;
  protected defaultIframePrefix: string = 'soyio-iframe';

  protected readonly options: T;
  protected readonly appearance: SoyioAppearance | null;
  protected readonly tooltipManager: TooltipManager;
  protected SkeletonKlass: SkeletonConstructor | null = null;

  private readonly defaultUniqueId: string;

  constructor(options: T) {
    this.options = options;
    this.appearance = options.appearance || null;
    this.tooltipManager = new TooltipManager();
    this.defaultUniqueId = BaseIframeBox.generateUniqueId();
  }

  static generateUniqueId(): string {
    return generateUniqueIframeId();
  }

  get uniqueIdentifier(): string {
    return this.defaultUniqueId;
  }

  get iframePrefix(): string {
    return this.defaultIframePrefix;
  }

  abstract iframeUrl(): string;

  get iframeIdentifier(): string {
    return `${this.iframePrefix}-${this.uniqueIdentifier}`;
  }

  protected handleHeightChange(height: number): void {
    if (!this.iframe) return;

    this.iframe.style.height = `${height}px`;

    if (height > 0) return;

    const { parentElement } = this.iframe;
    if (parentElement) parentElement.style.display = 'none';
  }

  protected handleIframeReady(): void {
    if (!this.iframe) return;
    if (this.skeleton) this.skeleton.hide();
    if (this.options.onReady) this.options.onReady();

    if (this.appearance) {
      sendAppearanceConfig(this.iframe, this.appearance, this.uniqueIdentifier);
    }
  }

  protected handleTooltipChange(tooltipState: TooltipStateChangeEvent): void {
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

  protected async setupListeners(): Promise<void> {
    await setupPostrobotListeners();

    const listeners = {
      onHeightChange: this.handleHeightChange.bind(this),
      onIframeReady: this.handleIframeReady.bind(this),
      onTooltipChange: this.handleTooltipChange.bind(this),
    };

    mountInstanceListeners(this.uniqueIdentifier, listeners);
  }

  async mount(selector: string): Promise<this> {
    await this.setupListeners();

    cleanupExistingIframe(this.iframeIdentifier);

    const iframeDivContainer = getIframeDivContainer(selector);
    const url = this.iframeUrl();

    this.iframe = createIframe(url, this.iframeIdentifier);

    if (this.SkeletonKlass) {
      this.skeleton = new this.SkeletonKlass(this.uniqueIdentifier);
      this.skeleton.mount(iframeDivContainer);
    }

    iframeDivContainer.appendChild(this.iframe);

    return this;
  }

  unmount(): void {
    removeInstanceListeners(this.uniqueIdentifier);

    if (this.skeleton) {
      this.skeleton.hide();
      this.skeleton = null;
    }

    if (this.iframe) {
      this.iframe.remove();
      this.iframe = null;
    }
  }
}
