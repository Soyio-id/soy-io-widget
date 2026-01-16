import type { SoyioTheme } from '../appearance/types';
import type { ISkeletonView } from '../base/types';

export class ConsentSkeleton implements ISkeletonView {
  private element: HTMLDivElement;
  private readonly identifier: string;

  constructor(identifier: string, theme?: SoyioTheme) {
    this.identifier = `skeleton-${identifier}`;
    this.element = document.createElement('div');
    this.element.id = this.identifier;

    const isDarkMode = theme === 'night';
    const backgroundColor = isDarkMode ? '#1E293B' : '#FFFFFF';
    const borderColor = isDarkMode ? '#334155' : '#E5E7EB';
    const shimmerStart = isDarkMode ? '#334155' : '#f0f0f0';
    const shimmerMid = isDarkMode ? '#475569' : '#e0e0e0';
    const shimmerEnd = isDarkMode ? '#334155' : '#f0f0f0';

    this.element.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: ${backgroundColor};
      border: 1px solid ${borderColor};
      border-radius: 0.25rem;
      opacity: 1;
      transition: opacity 0.3s ease-out;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      z-index: 1;
    `;

    const mainContainer = document.createElement('div');
    mainContainer.style.cssText = `
      padding: 1rem;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 0.75rem;
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
      background: linear-gradient(90deg, ${shimmerStart} 25%, ${shimmerMid} 50%, ${shimmerEnd} 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 50%;
      flex-shrink: 0;
      `;

    const personalizedTitleSkeleton = document.createElement('div');
    personalizedTitleSkeleton.style.cssText = `
      height: 1rem;
      width: 30%;
      background: linear-gradient(90deg, ${shimmerStart} 25%, ${shimmerMid} 50%, ${shimmerEnd} 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 0.125rem;
    `;

    const expandButtonCircleSkeleton = document.createElement('div');
    expandButtonCircleSkeleton.style.cssText = `
      width: 3rem;
      height: 1.25rem;
      background: linear-gradient(90deg, ${shimmerStart} 25%, ${shimmerMid} 50%, ${shimmerEnd} 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: .25rem;
      margin-left: auto;
      flex-shrink: 0;
    `;

    const bottomRow = document.createElement('div');
    bottomRow.style.cssText = `
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    `;

    // Container to center the checkbox under the icon (matching icon width)
    const checkboxContainer = document.createElement('div');
    checkboxContainer.style.cssText = `
      width: 2rem;
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    `;

    const checkboxSkeleton = document.createElement('div');
    checkboxSkeleton.style.cssText = `
      width: 1rem;
      height: 1rem;
      background: linear-gradient(90deg, ${shimmerStart} 25%, ${shimmerMid} 50%, ${shimmerEnd} 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 0.25rem;
      flex-shrink: 0;
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
      background: linear-gradient(90deg, ${shimmerStart} 25%, ${shimmerMid} 50%, ${shimmerEnd} 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 0.125rem;
    `;

    const textLine2 = document.createElement('div');
    textLine2.style.cssText = `
      height: 0.875rem;
      width: 60%;
      background: linear-gradient(90deg, ${shimmerStart} 25%, ${shimmerMid} 50%, ${shimmerEnd} 75%);
      background-size: 200% 100%;
      animation: shimmer 2s infinite;
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
        @keyframes skeletonFadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `;
      document.head.appendChild(styleSheet);
    }

    topRow.appendChild(dataUseCircleSkeleton);
    topRow.appendChild(personalizedTitleSkeleton);
    topRow.appendChild(expandButtonCircleSkeleton);

    textContentSkeleton.appendChild(textLine1);
    textContentSkeleton.appendChild(textLine2);
    checkboxContainer.appendChild(checkboxSkeleton);
    bottomRow.appendChild(checkboxContainer);
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
    this.element.style.animation = 'skeletonFadeOut 0.2s ease-out forwards';
    setTimeout(() => this.element.remove(), 200);
  }
}
