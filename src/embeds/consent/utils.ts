import { PRODUCTION_URL, SANDBOX_URL } from '../../constants';

import type { ConsentConfig } from './types';

function getIframeUrl(consentConfig: ConsentConfig): string {
  const URL_PARAMS = [
    'actionToken',
    'entityId',
    'context',
    'optionalReconsentBehavior',
    'mandatoryReconsentBehavior',
  ] as const;

  const isSandbox = consentConfig.isSandbox ?? false;
  const baseUrl = consentConfig.developmentUrl || (isSandbox ? SANDBOX_URL : PRODUCTION_URL);

  const urlParams = new URLSearchParams();
  URL_PARAMS.forEach((param) => {
    if (consentConfig[param]) urlParams.set(param, consentConfig[param]!);
  });

  const queryString = urlParams.toString();
  return `${baseUrl}/embed/consents/${consentConfig.consentTemplateId}${queryString ? `?${queryString}` : ''}`;
}

export { getIframeUrl };
