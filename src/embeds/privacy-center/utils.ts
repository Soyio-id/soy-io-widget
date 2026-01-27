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
  }

  if (privacyCenterConfig.enabledFeatures?.length) {
    urlParams.set('enabledFeatures', privacyCenterConfig.enabledFeatures.join(','));
  }

  if (privacyCenterConfig.enabledRights?.length) {
    urlParams.set('enabledRights', privacyCenterConfig.enabledRights.join(','));
  }

  if (privacyCenterConfig.dataSubjects?.length) {
    urlParams.set('dataSubjects', privacyCenterConfig.dataSubjects.join(','));
  }

  if (privacyCenterConfig.requestReference) urlParams.set('requestReference', privacyCenterConfig.requestReference);

  if (privacyCenterConfig.fileRequisites) {
    const fileRequisitesJSON = JSON.stringify(privacyCenterConfig.fileRequisites);
    if (fileRequisitesJSON !== '{}') {
      urlParams.set('fileRequisites', fileRequisitesJSON);
    }
  }

  if (privacyCenterConfig.demo) {
    urlParams.set('demo', 'true');
  }

  if (privacyCenterConfig.consentMode) {
    urlParams.set('consentMode', privacyCenterConfig.consentMode);
  }

  const consentControl = privacyCenterConfig.appearance?.config?.consentControl;
  if (consentControl) {
    urlParams.set('consentControl', consentControl);
  }

  if (privacyCenterConfig.consentRetentionPeriod) {
    urlParams.set('consentRetentionPeriod', privacyCenterConfig.consentRetentionPeriod);
  }

  if (privacyCenterConfig.showBatchConsentConfirmation) {
    urlParams.set('showBatchConsentConfirmation', 'true');
  }

  const queryString = urlParams.toString();
  return `${baseUrl}${queryString ? `?${queryString}` : ''}`;
}

export { getIframeUrl };
