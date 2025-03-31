import { BaseIframeBox } from '../base/base-iframe';
import { mountInstanceListeners } from '../listeners';

import { ConsentSkeleton } from './skeleton';
import type {
  ConsentCheckboxChangeEvent,
  ConsentConfig,
  ConsentState,
} from './types';
import { getIframeUrl } from './utils';

export class ConsentBox extends BaseIframeBox<ConsentConfig> {
  private state: ConsentState = {
    isSelected: false,
    actionToken: null,
  };

  constructor(options: ConsentConfig) {
    super(options);
    this.defaultIframePrefix = 'consent-box';
    this.SkeletonKlass = ConsentSkeleton;
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
