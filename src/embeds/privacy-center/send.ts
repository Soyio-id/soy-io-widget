import type { PrivacyCenterConfig } from './types';

export async function sendPrivacyCenterConfig(
  iframe: HTMLIFrameElement,
  config: PrivacyCenterConfig,
  identifier: string,
): Promise<void> {
  if (!iframe.contentWindow) {
    throw new Error('Invalid iframe: contentWindow is null');
  }

  const showHeader = config.appearance?.config?.showHeader;
  const shouldSendConfig =
    typeof config.redecOperationIds !== 'undefined' ||
    typeof showHeader === 'boolean' ||
    typeof config.content !== 'undefined' ||
    typeof config.header !== 'undefined' ||
    typeof config.rightExamples !== 'undefined';

  if (!shouldSendConfig) return;

  const postRobot = await import('post-robot');

  try {
    await postRobot.send(iframe.contentWindow, 'SET_PRIVACY_CENTER_CONFIG', {
      identifier,
      ...(typeof config.redecOperationIds !== 'undefined' ? { redecOperationIds: config.redecOperationIds } : {}),
      ...(typeof showHeader === 'boolean' ? { appearance: { config: { showHeader } } } : {}),
      ...(typeof config.content !== 'undefined' ? { content: config.content } : {}),
      ...(typeof config.header !== 'undefined' ? { header: config.header } : {}),
      ...(typeof config.rightExamples !== 'undefined' ? { rightExamples: config.rightExamples } : {}),
    });
  } catch (error) {
    console.error('Failed to send privacy center config:', error);
  }
}
