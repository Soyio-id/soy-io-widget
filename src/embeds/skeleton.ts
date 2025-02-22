export class Skeleton {
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
      max-width: 36rem;
      height: 120px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border: 1px solid #E5E7EB;
      border-radius: 0.25rem;
      opacity: 1;
      transition: opacity 0.3s ease-out;
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `;
    document.head.appendChild(styleSheet);
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
