import { PRIVACY_BASE_URL, PRIVACY_SANDBOX_URL } from '../../constants';

import type { PrivacyCenterConfig } from './types';

function getIframeUrl(privacyCenterConfig: PrivacyCenterConfig): string {
  const isSandbox = privacyCenterConfig.isSandbox ?? false;
  const baseUrl = privacyCenterConfig.developmentUrl || (isSandbox ? PRIVACY_SANDBOX_URL : PRIVACY_BASE_URL);

  const urlParams = new URLSearchParams();

  if (privacyCenterConfig.sessionToken) {
    urlParams.set('sessionToken', privacyCenterConfig.sessionToken);
  } else if (privacyCenterConfig.companyId) {
    urlParams.set('companyId', privacyCenterConfig.companyId);

    if (privacyCenterConfig.subjectId) {
      urlParams.set('subjectId', privacyCenterConfig.subjectId);
    }
  }

  const queryString = urlParams.toString();
  return `${baseUrl}${queryString ? `?${queryString}` : ''}`;
}

export { getIframeUrl };
