import { isBrowser } from '@/utils';

export class TooltipManager {
  private tooltipElement: HTMLElement | null = null;
  private tooltipContent: HTMLElement | null = null;
  private readonly tooltipClass = 'soyio-tooltip';
  private hideTimeout: NodeJS.Timeout | null = null;

  constructor() {
    if (isBrowser) {
      this.createTooltipElement();
      this.setupGlobalListeners();
    }
  }

  private createTooltipElement(): void {
    const existingTooltip = document.querySelector(`.${this.tooltipClass}`);

    this.tooltipElement = existingTooltip as HTMLElement || document.createElement('div');
    this.tooltipElement.className = this.tooltipClass;

    this.tooltipElement.style.cssText = `
      position: fixed;
      z-index: 99999;
      background: white;
      padding: 8px 12px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      font-size: 14px;
      font-family: Helvetica neue, Helvetica, Arial, sans-serif;
      max-width: 300px;
      word-wrap: break-word;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
      transform: translateX(-50%) translateY(-100%);
      margin-top: -8px;
    `;

    const existingContent = this.tooltipElement.children[0];
    this.tooltipContent = existingContent as HTMLElement || document.createElement('div');
    this.tooltipContent.style.cssText = 'text-align: left;';
    this.tooltipElement.appendChild(this.tooltipContent);

    // TODO: Place arrow and tooltip content correctly
    // const arrow = document.createElement('div');
    // arrow.style.cssText = `
    //   position: absolute;
    //   bottom: -4px;
    //   left: 50%;
    //   transform: translateX(-50%) rotate(45deg);
    //   width: 8px;
    //   height: 8px;
    //   background: white;
    //   box-shadow: 2px 2px 2px rgba(0,0,0,0.1);
    // `;
    // this.tooltipElement.appendChild(arrow);

    document.body.appendChild(this.tooltipElement);
  }

  private setupGlobalListeners(): void {
    if (!isBrowser) return;

    window.addEventListener('scroll', () => this.hide(), true);
    window.addEventListener('resize', () => this.hide());
    window.addEventListener('orientationchange', () => this.hide());
  }

  show(text: string, x: number, y: number): void {
    if (!this.tooltipElement || !this.tooltipContent) return;

    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    this.tooltipContent.textContent = text;
    this.tooltipElement.style.left = `${x}px`;
    this.tooltipElement.style.top = `${y}px`;
    this.tooltipElement.style.opacity = '1';
  }

  hide(): void {
    if (!this.tooltipElement) return;

    this.tooltipElement.style.opacity = '0';
  }

  destroy(): void {
    this.tooltipElement?.remove();
    this.tooltipElement = null;
    this.tooltipContent = null;

    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }
}
