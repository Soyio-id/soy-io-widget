import { PRODUCTION_URL, SANDBOX_URL } from '../../constants';

import type { PrivacyCenterConfig } from './types';

function getIframeUrl(privacyCenterConfig: PrivacyCenterConfig): string {
  if (privacyCenterConfig.developmentUrl) {
    return privacyCenterConfig.developmentUrl;
  }

  // TODO: SET CORRECT URL

  const isSandbox = privacyCenterConfig.isSandbox ?? false;
  const baseUrl = isSandbox ? SANDBOX_URL : PRODUCTION_URL;

  return `${baseUrl}/embed/privacy-center`;
}

export { getIframeUrl };
