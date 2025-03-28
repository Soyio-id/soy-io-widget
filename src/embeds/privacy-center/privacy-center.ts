import { BaseIframeBox } from '../base/base-iframe';

import type { PrivacyCenterConfig } from './types';
import { getIframeUrl } from './utils';

export class PrivacyCenterBox extends BaseIframeBox<PrivacyCenterConfig> {
  constructor(options: PrivacyCenterConfig) {
    super(options);
    this.defaultIframePrefix = 'privacy-center';
  }

  iframeUrl(): string {
    return getIframeUrl(this.options);
  }
}
