import { isBrowser } from '@/utils';

interface PlacementConfig {
  top: number;
  left: number;
  placement: 'top' | 'bottom' | 'left' | 'right';
}

const EASE_DURATION = 200;

export class TooltipManager {
  private tooltipElement: HTMLElement | null = null;
  private tooltipContent: HTMLElement | null = null;
  private readonly tooltipClass = 'soyio-tooltip';
  private hideTimeout: NodeJS.Timeout | null = null;

  constructor() {
    if (!isBrowser) return;

    this.createTooltipElement();
  }

  private createTooltipElement(): void {
    const existingTooltip = document.querySelector(`.${this.tooltipClass}`);
    if (existingTooltip) {
      this.tooltipElement = existingTooltip as HTMLElement;
      this.tooltipContent = this.tooltipElement.querySelector('.soyio-tooltip-content');
      return;
    }

    this.tooltipElement = document.createElement('div');
    this.tooltipElement.className = this.tooltipClass;
    this.tooltipElement.style.cssText = `
      position: fixed;
      z-index: 99999;
      background: rgba(30, 30, 30, 0.9);
      color: #f5f5f5;
      padding: 10px 16px;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      font-size: 14px;
      font-family: Helvetica neue, Helvetica, Arial, sans-serif;
      max-width: 300px;
      word-wrap: break-word;
      pointer-events: none;
      opacity: 0;
      transition: opacity ${EASE_DURATION}ms ease, transform ${EASE_DURATION}ms ease;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      transform: scale(0.95);
    `;

    this.tooltipContent = document.createElement('div');
    this.tooltipContent.className = 'soyio-tooltip-content';
    this.tooltipElement.appendChild(this.tooltipContent);

    document.body.appendChild(this.tooltipElement);
  }

  show(text: string, anchorX: number, anchorY: number): void {
    if (!this.tooltipElement || !this.tooltipContent) return;

    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    this.tooltipContent.textContent = text;
    this.tooltipElement.style.opacity = '0';
    this.tooltipElement.style.transform = 'scale(0.95)';

    const placement = this.calculateOptimalPlacement(anchorX, anchorY);
    this.applyPlacement(placement);

    requestAnimationFrame(() => {
      if (this.tooltipElement) {
        this.tooltipElement.style.opacity = '1';
        this.tooltipElement.style.transform = 'scale(1)';
      }
    });
  }

  private calculateOptimalPlacement(anchorX: number, anchorY: number): PlacementConfig {
    const tooltipWidth = this.tooltipElement!.offsetWidth;
    const tooltipHeight = this.tooltipElement!.offsetHeight;
    const { innerWidth: vpWidth, innerHeight: vpHeight } = window;
    const margin = 4;

    const placements = {
      top: {
        top: anchorY - tooltipHeight - margin,
        left: anchorX - tooltipWidth / 2,
        placement: 'top' as const,
      },
      bottom: {
        top: anchorY + margin,
        left: anchorX - tooltipWidth / 2,
        placement: 'bottom' as const,
      },
      right: {
        top: anchorY - tooltipHeight / 2,
        left: anchorX + margin,
        placement: 'right' as const,
      },
      left: {
        top: anchorY - tooltipHeight / 2,
        left: anchorX - tooltipWidth - margin,
        placement: 'left' as const,
      },
    };

    for (const [, config] of Object.entries(placements)) {
      if (TooltipManager.fitsInViewport(config, tooltipWidth, tooltipHeight, vpWidth, vpHeight)) {
        return config;
      }
    }

    const fallback = placements.top;
    fallback.left = Math.max(margin, Math.min(fallback.left, vpWidth - tooltipWidth - margin));
    fallback.top = Math.max(margin, Math.min(fallback.top, vpHeight - tooltipHeight - margin));

    return fallback;
  }

  private static fitsInViewport(
    config: { top: number; left: number },
    width: number,
    height: number,
    vpWidth: number,
    vpHeight: number,
  ): boolean {
    return (
      config.top >= 0
      && config.left >= 0
      && config.top + height <= vpHeight
      && config.left + width <= vpWidth
    );
  }

  private applyPlacement(config: PlacementConfig): void {
    if (!this.tooltipElement) return;

    this.tooltipElement.style.left = `${config.left}px`;
    this.tooltipElement.style.top = `${config.top}px`;
  }

  hide(): void {
    if (!this.tooltipElement) return;

    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    this.tooltipElement.style.opacity = '0';
    this.tooltipElement.style.transform = 'scale(0.95)';
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
