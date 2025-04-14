import { SoyioAppearance } from './types';

import { isBrowser } from '@/utils';

export async function sendAppearanceConfig(
  iframe: HTMLIFrameElement,
  appearance: SoyioAppearance | null,
  identifier: string,
): Promise<void> {
  if (!isBrowser) return;

  if (!iframe.contentWindow) {
    throw new Error('Invalid iframe: contentWindow is null');
  }

  const postRobot = await import('post-robot');

  try {
    await postRobot.send(iframe.contentWindow, 'SET_APPEARANCE', { appearance, identifier });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to send appearance config:', error);
  }
}
