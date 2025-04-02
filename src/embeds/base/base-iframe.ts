import { DEFAULT_IFRAME_CSS_CONFIG } from '../../constants';
import { sendAppearanceConfig } from '../appearance/send';
import { SoyioAppearance } from '../appearance/types';
import {
  mountInstanceListeners,
  removeInstanceListeners,
  setupPostrobotListeners,
} from '../listeners';

import { TooltipManager } from './tooltip-manager';
import type {
  BaseConfig, ISkeletonView, ITooltipStateChangeEvent, SkeletonConstructor,
} from './types';
import {
  cleanupExistingIframe,
  createIframe,
  generateUniqueIframeId,
  getIframeDivContainer,
  IframeCSSConfig,
} from './utils';

export abstract class BaseIframeBox<T extends BaseConfig> {
  protected iframe: HTMLIFrameElement | null = null;
  protected skeleton: ISkeletonView | null = null;

  protected readonly options: T;
  protected readonly appearance: SoyioAppearance | null;
  protected readonly tooltipManager: TooltipManager;
  readonly defaultIframeCSSConfig: IframeCSSConfig = DEFAULT_IFRAME_CSS_CONFIG;
  protected Skeleton: SkeletonConstructor | null = null;

  private readonly defaultUniqueId: string;
  abstract readonly defaultIframePrefix: string;

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

  abstract iframeUrl(): string;

  get iframeIdentifier(): string {
    return `${this.defaultIframePrefix}-${this.uniqueIdentifier}`;
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
    if (this.options.onReady) this.options.onReady();

    sendAppearanceConfig(this.iframe, this.appearance, this.uniqueIdentifier);

    if (this.skeleton) this.skeleton.hide();
  }

  protected handleTooltipChange(tooltipState: ITooltipStateChangeEvent): void {
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

    this.iframe = createIframe(url, this.iframeIdentifier, this.defaultIframeCSSConfig);

    if (this.Skeleton) {
      this.skeleton = new this.Skeleton(this.uniqueIdentifier);
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
