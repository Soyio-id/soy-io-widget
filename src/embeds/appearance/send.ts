import { SoyioAppearance } from './types';

export async function sendAppearanceConfig(
  iframe: HTMLIFrameElement,
  appearance: SoyioAppearance | null,
  identifier: string,
): Promise<void> {
  if (!iframe.contentWindow) {
    throw new Error('Invalid iframe: contentWindow is null');
  }

  const postRobot = await import('post-robot');

  try {
    await postRobot.send(iframe.contentWindow, 'SET_APPEARANCE', { appearance, identifier });
  } catch (error) {
     
    console.error('Failed to send appearance config:', error);
  }
}
