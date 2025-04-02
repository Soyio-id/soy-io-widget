import { PRIVACY_BASE_URL, PRIVACY_SANDBOX_URL } from '../../constants';

import type { PrivacyCenterConfig } from './types';

function getIframeUrl(privacyCenterConfig: PrivacyCenterConfig): string {
  const URL_PARAMS = [
    'subjectId',
    'companyId',
  ] as const;

  const isSandbox = privacyCenterConfig.isSandbox ?? false;
  const baseUrl = privacyCenterConfig.developmentUrl || (isSandbox ? PRIVACY_SANDBOX_URL : PRIVACY_BASE_URL);

  const urlParams = new URLSearchParams();
  URL_PARAMS.forEach((param) => {
    if (privacyCenterConfig[param]) urlParams.set(param, privacyCenterConfig[param]!);
  });

  const queryString = urlParams.toString();
  return `${baseUrl}/${queryString ? `?${queryString}` : ''}`;
}

export { getIframeUrl };
