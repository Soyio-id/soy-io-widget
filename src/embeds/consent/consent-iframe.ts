import { BaseIframeBox } from '../base/base-iframe';
import { IframeCSSConfig } from '../base/utils';
import { mountInstanceListeners } from '../listeners';

import { ConsentSkeleton } from './skeleton';
import type {
  ConsentCheckboxChangeEvent,
  ConsentConfig,
  ConsentState,
} from './types';
import { getIframeUrl } from './utils';

import { CONSENT_DEFAULT_IFRAME_CSS_CONFIG } from '@/constants';

export class ConsentBox extends BaseIframeBox<ConsentConfig> {
  readonly defaultIframePrefix = 'consent-box';
  readonly defaultIframeCSSConfig: IframeCSSConfig = CONSENT_DEFAULT_IFRAME_CSS_CONFIG;

  private state: ConsentState = {
    isSelected: false,
    actionToken: null,
  };

  constructor(options: ConsentConfig) {
    super(options);
    this.Skeleton = ConsentSkeleton;
  }

  override get uniqueIdentifier(): string {
    return this.options.consentTemplateId;
  }

  iframeUrl(): string {
    return getIframeUrl(this.options);
  }

  protected handleStateChange(newState: ConsentState): void {
    const { isSelected, actionToken } = newState;
    this.state = { isSelected, actionToken };

    this.options.onEvent({
      eventName: 'CONSENT_CHECKBOX_CHANGE',
      isSelected,
      actionToken,
    } as ConsentCheckboxChangeEvent);
  }

  protected async setupListeners(): Promise<void> {
    await super.setupListeners();

    mountInstanceListeners(this.uniqueIdentifier, {
      onStateChange: this.handleStateChange.bind(this),
    });
  }

  getState(): Readonly<ConsentState> {
    return this.state;
  }
}
