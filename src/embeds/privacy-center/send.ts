import type { PrivacyCenterConfig } from './types';

export async function sendPrivacyCenterConfig(
  iframe: HTMLIFrameElement,
  config: PrivacyCenterConfig,
  identifier: string,
): Promise<void> {
  if (!iframe.contentWindow) {
    throw new Error('Invalid iframe: contentWindow is null');
  }

  const { redecOperationIds, content, header, rightExamples, consentManagement, appearance } = config;
  const showHeader = appearance?.config?.showHeader;
  const showConsentManagementHeader = appearance?.config?.showConsentManagementHeader;
  const normalizedConsentManagement =
    consentManagement && Array.isArray(consentManagement.scopeGroups) && consentManagement.scopeGroups.length === 0
      ? undefined
      : consentManagement;

  const payload: Record<string, unknown> = {};
  if (typeof redecOperationIds !== 'undefined') payload.redecOperationIds = redecOperationIds;
  if (typeof content !== 'undefined') payload.content = content;
  if (typeof header !== 'undefined') payload.header = header;
  if (typeof rightExamples !== 'undefined') payload.rightExamples = rightExamples;
  if (typeof normalizedConsentManagement !== 'undefined') payload.consentManagement = normalizedConsentManagement;
  if (typeof showHeader === 'boolean' || typeof showConsentManagementHeader === 'boolean') {
    payload.appearance = {
      config: {
        ...(typeof showHeader === 'boolean' ? { showHeader } : {}),
        ...(typeof showConsentManagementHeader === 'boolean' ? { showConsentManagementHeader } : {}),
      },
    };
  }

  if (Object.keys(payload).length === 0) return;

  const postRobot = await import('post-robot');

  try {
    await postRobot.send(iframe.contentWindow, 'SET_PRIVACY_CENTER_CONFIG', {
      identifier,
      ...payload,
    });
  } catch (error) {
    console.error('Failed to send privacy center config:', error);
  }
}
