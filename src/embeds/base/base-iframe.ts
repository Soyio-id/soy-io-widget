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
  createWidgetWrapper,
  generateUniqueIframeId,
  getIframeDivContainer,
  IframeCSSConfig,
} from './utils';

import { DEFAULT_IFRAME_CSS_CONFIG } from '@/constants';
import { isBrowser } from '@/utils';

export abstract class BaseIframeBox<TEvent, T extends BaseConfig<TEvent>> {
  protected iframe: HTMLIFrameElement | null = null;
  protected wrapper: HTMLDivElement | null = null;
  protected skeleton: ISkeletonView | null = null;

  protected readonly options: T;
  protected appearance: SoyioAppearance | null;
  protected readonly tooltipManager: TooltipManager;
  readonly defaultIframeCSSConfig: IframeCSSConfig = DEFAULT_IFRAME_CSS_CONFIG;
  protected Skeleton: SkeletonConstructor | null = null;
  private isIframeReady = false;

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

  protected async handleIframeReady(): Promise<void> {
    if (!this.iframe) return;
    if (this.isIframeReady) return;
    this.isIframeReady = true;

    if (this.options.onReady) this.options.onReady();

    await sendAppearanceConfig(this.iframe, this.appearance, this.uniqueIdentifier);

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
      onInfo: (info: Record<string, unknown>) => this.options.onEvent(info as TEvent),
    };

    mountInstanceListeners(this.uniqueIdentifier, listeners);
  }

  async mount(selector: string): Promise<this> {
    if (!isBrowser) return this;

    this.isIframeReady = false;
    await this.setupListeners();

    cleanupExistingIframe(this.iframeIdentifier);

    const iframeDivContainer = getIframeDivContainer(selector);
    const url = this.iframeUrl();

    // Create a wrapper for the widget content to avoid messing with the host container's styles
    this.wrapper = createWidgetWrapper(this.uniqueIdentifier);
    iframeDivContainer.appendChild(this.wrapper);

    this.iframe = createIframe(url, this.iframeIdentifier, this.defaultIframeCSSConfig);

    if (this.Skeleton) {
      const theme = this.appearance?.theme;
      this.skeleton = new this.Skeleton(this.uniqueIdentifier, theme);
      this.skeleton.mount(this.wrapper);
    }

    this.wrapper.appendChild(this.iframe);

    return this;
  }

  unmount(): void {
    if (!isBrowser) return;

    removeInstanceListeners(this.uniqueIdentifier);
    this.isIframeReady = false;

    if (this.skeleton) {
      this.skeleton.hide();
      this.skeleton = null;
    }

    if (this.iframe) {
      this.iframe.remove();
      this.iframe = null;
    }

    if (this.wrapper) {
      this.wrapper.remove();
      this.wrapper = null;
    }
  }

  /**
   * Update the appearance of the widget without remounting.
   * This sends the new appearance config to the already-mounted iframe.
   */
  async updateAppearance(appearance: SoyioAppearance): Promise<void> {
    this.appearance = appearance;
    if (!this.iframe || !this.isIframeReady) return;
    await sendAppearanceConfig(this.iframe, appearance, this.uniqueIdentifier);
  }
}
