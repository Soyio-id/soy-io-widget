import type { PrivacyCenterConfig } from './types';

export async function sendPrivacyCenterConfig(
  iframe: HTMLIFrameElement,
  config: PrivacyCenterConfig,
  identifier: string,
): Promise<void> {
  if (!iframe.contentWindow) {
    throw new Error('Invalid iframe: contentWindow is null');
  }

  if (!config.redecOperationIds) return;

  const postRobot = await import('post-robot');

  try {
    await postRobot.send(iframe.contentWindow, 'SET_PRIVACY_CENTER_CONFIG', {
      identifier,
      redecOperationIds: config.redecOperationIds,
    });
  } catch (error) {
    console.error('Failed to send privacy center config:', error);
  }
}
