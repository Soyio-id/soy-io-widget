import type { PrivacyCenterConfig } from './types';

export async function sendPrivacyCenterConfig(
  iframe: HTMLIFrameElement,
  config: PrivacyCenterConfig,
  identifier: string,
): Promise<void> {
  if (!iframe.contentWindow) {
    throw new Error('Invalid iframe: contentWindow is null');
  }

  const { redecOperationIds, content, header, rightExamples, appearance } = config;
  const showHeader = appearance?.config?.showHeader;

  const payload: Record<string, unknown> = {};
  if (typeof redecOperationIds !== 'undefined') payload.redecOperationIds = redecOperationIds;
  if (typeof content !== 'undefined') payload.content = content;
  if (typeof header !== 'undefined') payload.header = header;
  if (typeof rightExamples !== 'undefined') payload.rightExamples = rightExamples;
  if (typeof showHeader === 'boolean') payload.appearance = { config: { showHeader } };

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
