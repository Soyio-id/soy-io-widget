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
    const hasFileRequisites = Object.values(privacyCenterConfig.fileRequisites).some(
      (value) => value !== undefined && value !== null,
    );

    if (hasFileRequisites) {
      const fileRequisitesJSON = JSON.stringify(privacyCenterConfig.fileRequisites);
      urlParams.set('fileRequisites', fileRequisitesJSON);
    }
  }

  if (privacyCenterConfig.consentManagement) {
    const { scopeGroups } = privacyCenterConfig.consentManagement;
    const hasConsentManagementConfig = Array.isArray(scopeGroups) && scopeGroups.length > 0;

    if (hasConsentManagementConfig) {
      const consentManagementJSON = JSON.stringify(privacyCenterConfig.consentManagement);
      urlParams.set('consentManagement', consentManagementJSON);
    }
  }

  if (privacyCenterConfig.demo !== undefined) {
    urlParams.set('demo', String(privacyCenterConfig.demo));
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

  if (privacyCenterConfig.allowGranularScopeSelection !== undefined) {
    urlParams.set('allowGranularScopeSelection', String(privacyCenterConfig.allowGranularScopeSelection));
  }

  if (privacyCenterConfig.groupConsentsByScope !== undefined) {
    urlParams.set('groupConsentsByScope', String(privacyCenterConfig.groupConsentsByScope));
  }

  if (privacyCenterConfig.showBatchConsentConfirmation !== undefined) {
    urlParams.set('showBatchConsentConfirmation', String(privacyCenterConfig.showBatchConsentConfirmation));
  }

  const queryString = urlParams.toString();
  return `${baseUrl}${queryString ? `?${queryString}` : ''}`;
}

export { getIframeUrl };
