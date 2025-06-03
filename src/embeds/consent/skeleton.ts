import type { ISkeletonView } from '../base/types';

export class ConsentSkeleton implements ISkeletonView {
  private element: HTMLDivElement;
  private readonly identifier: string;

  constructor(identifier: string) {
    this.identifier = `skeleton-${identifier}`;
    this.element = document.createElement('div');
    this.element.id = this.identifier;

    this.element.style.cssText = `
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      min-width: 375px;
      height: 120px;
      background: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 0.25rem;
      opacity: 1;
      transition: opacity 0.3s ease-out;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    `;

    const mainContainer = document.createElement('div');
    mainContainer.style.cssText = `
      padding: 1rem;
      height: 100%;
      max-width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `;

    const topRow = document.createElement('div');
    topRow.style.cssText = `
      display: flex;
      align-items: center;
      gap: 0.75rem;
    `;

    const dataUseCircleSkeleton = document.createElement('div');
    dataUseCircleSkeleton.style.cssText = `
      width: 2rem;
      height: 2rem;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 50%;
      flex-shrink: 0;
      `;

    const personalizedTitleSkeleton = document.createElement('div');
    personalizedTitleSkeleton.style.cssText = `
      height: 1rem;
      width: 30%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 0.125rem;
    `;

    const expandButtonCircleSkeleton = document.createElement('div');
    expandButtonCircleSkeleton.style.cssText = `
      width: 1.5rem;
      height: 1.5rem;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 50%;
      margin-left: auto;
      margin-right: 3px;
    `;

    const bottomRow = document.createElement('div');
    bottomRow.style.cssText = `
      display: flex;
      align-items: center;
      gap: 1rem;
    `;

    const checkboxSkeleton = document.createElement('div');
    checkboxSkeleton.style.cssText = `
      width: 1rem;
      height: 1rem;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 0.25rem;
      flex-shrink: 0;
      margin-left: 10px;
    `;

    const textContentSkeleton = document.createElement('div');
    textContentSkeleton.style.cssText = `
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    `;

    const textLine1 = document.createElement('div');
    textLine1.style.cssText = `
      height: 0.875rem;
      width: 80%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 0.125rem;
    `;

    const textLine2 = document.createElement('div');
    textLine2.style.cssText = `
      height: 0.875rem;
      width: 60%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 0.125rem;
    `;

    if (!document.getElementById('skeleton-animation')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'skeleton-animation';
      styleSheet.textContent = `
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `;
      document.head.appendChild(styleSheet);
    }

    topRow.appendChild(dataUseCircleSkeleton);
    topRow.appendChild(personalizedTitleSkeleton);
    topRow.appendChild(expandButtonCircleSkeleton);

    textContentSkeleton.appendChild(textLine1);
    textContentSkeleton.appendChild(textLine2);
    bottomRow.appendChild(checkboxSkeleton);
    bottomRow.appendChild(textContentSkeleton);

    mainContainer.appendChild(topRow);
    mainContainer.appendChild(bottomRow);

    this.element.appendChild(mainContainer);
  }

  private cleanupExistingSkeleton(): void {
    const existingSkeleton = document.getElementById(this.identifier);
    if (existingSkeleton) {
      existingSkeleton.remove();
    }
  }

  mount(container: HTMLDivElement): void {
    this.cleanupExistingSkeleton();
    container.appendChild(this.element);
  }

  hide(): void {
    this.element.style.opacity = '0';
    setTimeout(() => this.element.remove(), 300);
  }
}
