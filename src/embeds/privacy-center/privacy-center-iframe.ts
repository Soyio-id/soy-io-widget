import { PRIVACY_CENTER_DEFAULT_IFRAME_CSS_CONFIG } from '../../constants';
import { BaseIframeBox } from '../base/base-iframe';
import { IframeCSSConfig } from '../base/utils';

import type { PrivacyCenterConfig } from './types';
import { getIframeUrl } from './utils';

export class PrivacyCenterBox extends BaseIframeBox<PrivacyCenterConfig> {
  readonly defaultIframePrefix = 'privacy-center';
  protected readonly _uniqueIdentifier = 'privacy-center';
  readonly defaultIframeCSSConfig: IframeCSSConfig = PRIVACY_CENTER_DEFAULT_IFRAME_CSS_CONFIG;

  override get uniqueIdentifier(): string {
    return this._uniqueIdentifier;
  }

  iframeUrl(): string {
    return getIframeUrl(this.options);
  }
}
