import { version } from '../../../package.json';
import { PRODUCTION_URL, SANDBOX_URL } from '../../constants';

import type { ConsentConfig } from './types';

function getIframeUrl(consentConfig: ConsentConfig): string {
  const URL_PARAMS = [
    'actionToken',
    'entityId',
    'context',
    'optionalReconsentBehavior',
    'mandatoryReconsentBehavior',
    'allowGranularScopeSelection',
  ] as const;

  const isSandbox = consentConfig.isSandbox ?? false;
  const baseUrl = consentConfig.developmentUrl || (isSandbox ? SANDBOX_URL : PRODUCTION_URL);

  const urlParams = new URLSearchParams();
  urlParams.set('sdkVersion', version);

  URL_PARAMS.forEach((param) => {
    const value = consentConfig[param];

    if (value === undefined) return;
    if (typeof value === 'string' && value.length === 0) return;

    urlParams.set(param, String(value));
  });

  const queryString = urlParams.toString();
  return `${baseUrl}/embed/consents/${consentConfig.consentTemplateId}${queryString ? `?${queryString}` : ''}`;
}

export { getIframeUrl };
