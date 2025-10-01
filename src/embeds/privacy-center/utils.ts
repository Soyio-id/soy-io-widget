import { version } from '../../../package.json';
import { PRIVACY_BASE_URL, PRIVACY_SANDBOX_URL } from '../../constants';

import type { PrivacyCenterConfig } from './types';

function getIframeUrl(privacyCenterConfig: PrivacyCenterConfig): string {
  const isSandbox = privacyCenterConfig.isSandbox ?? false;
  const baseUrl = privacyCenterConfig.developmentUrl || (isSandbox ? PRIVACY_SANDBOX_URL : PRIVACY_BASE_URL);

  const urlParams = new URLSearchParams();
  urlParams.set('sdkVersion', version);

  if (privacyCenterConfig.sessionToken) {
    urlParams.set('sessionToken', privacyCenterConfig.sessionToken);
  } else if (privacyCenterConfig.companyId) {
    urlParams.set('companyId', privacyCenterConfig.companyId);

    if (privacyCenterConfig.subjectId) {
      urlParams.set('subjectId', privacyCenterConfig.subjectId);
    }
  }

  if (privacyCenterConfig.enabledFeatures?.length) {
    urlParams.set('enabledFeatures', privacyCenterConfig.enabledFeatures.join(','));
  }

  if (privacyCenterConfig.dataSubjects?.length) {
    urlParams.set('dataSubjects', privacyCenterConfig.dataSubjects.join(','));
  }

  const queryString = urlParams.toString();
  return `${baseUrl}${queryString ? `?${queryString}` : ''}`;
}

export { getIframeUrl };
