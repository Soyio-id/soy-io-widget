import { generateUniqueIframeId } from '../embeds/base/utils';
import {
  mountInstanceListeners,
  removeInstanceListeners,
  setupPostrobotListeners,
} from '../embeds/listeners';

import { WIDGET_EVENT } from './constants';
import type {
  EmbeddedPasskeyAuthenticatedEvent,
  EmbeddedPasskeyAuthenticationRequiredEvent,
  EmbeddedDisclosureRequestConfig,
  EmbeddedInfoEvent,
  EmbeddedPasskeyRequiredEvent,
  EmbeddedPasskeyRegisteredEvent,
} from './types';
import {
  getEmbeddedFullUrl,
  getPasskeyAuthenticationPopupUrl,
  getRegisterPasskeyPopupUrl,
} from './utils';

import { isBrowser } from '@/utils';

type PostRobotListener = ReturnType<typeof import('post-robot')['on']>;

function isPasskeyRequiredEvent(event: EmbeddedInfoEvent): event is EmbeddedPasskeyRequiredEvent {
  return event.eventName === 'PASSKEY_REQUIRED' && event.type === 'PASSKEY_REQUIRED';
}

function isPasskeyAuthenticationRequiredEvent(
  event: EmbeddedInfoEvent,
): event is EmbeddedPasskeyAuthenticationRequiredEvent {
  return event.eventName === 'PASSKEY_AUTHENTICATION_REQUIRED' && event.type === 'PASSKEY_AUTHENTICATION_REQUIRED';
}

class EmbeddedSoyioWidget {
  private readonly options: EmbeddedDisclosureRequestConfig;
  private readonly identifier: string;
  private iframe: HTMLIFrameElement | null = null;
  private passkeyPopupWindow: Window | null = null;
  private popupListener: PostRobotListener | null = null;

  constructor(options: EmbeddedDisclosureRequestConfig) {
    this.options = options;
    this.identifier = generateUniqueIframeId();
  }

  get uniqueIdentifier(): string {
    return this.identifier;
  }

  async mount(selector: string): Promise<this> {
    if (!isBrowser) return this;

    const container = document.querySelector(selector);
    if (!container) {
      throw new Error(`Iframe container with selector '${selector}' not found`);
    }

    await setupPostrobotListeners();
    await this.mountPopupListener();
    mountInstanceListeners(this.uniqueIdentifier, {
      onInfo: (info) => this.handleInfoEvent(info as EmbeddedInfoEvent),
    });

    if (this.iframe) this.iframe.remove();

    this.iframe = document.createElement('iframe');
    this.iframe.id = `soyio-embedded-widget-${this.uniqueIdentifier}`;
    this.iframe.src = getEmbeddedFullUrl(this.options, this.uniqueIdentifier);
    this.iframe.style.width = '100%';
    this.iframe.style.border = 'none';
    this.iframe.style.minWidth = '375px';
    this.iframe.style.height = this.options.height || '720px';
    this.iframe.style.minHeight = this.options.minHeight || this.iframe.style.height;

    if (this.options.onReady) {
      this.iframe.onload = () => {
        this.options.onReady?.();
      };
    }

    container.appendChild(this.iframe);

    return this;
  }

  unmount(): void {
    if (!isBrowser) return;

    removeInstanceListeners(this.uniqueIdentifier);
    this.removePopupListener();
    this.passkeyPopupWindow?.close();
    this.passkeyPopupWindow = null;

    if (this.iframe) {
      this.iframe.remove();
      this.iframe = null;
    }
  }

  private triggerEvent(data: EmbeddedInfoEvent) {
    this.options.onEvent(data);
  }

  private async mountPopupListener() {
    const postRobot = await import('post-robot');

    this.removePopupListener();
    this.popupListener = postRobot.on(WIDGET_EVENT, async ({ data }: { data: Record<string, unknown> }) => {
      if (data.eventName !== 'PASSKEY_REGISTERED' && data.eventName !== 'PASSKEY_AUTHENTICATED') {
        return Promise.resolve();
      }

      if (data.identifier !== this.uniqueIdentifier) return Promise.resolve();

      if (data.eventName === 'PASSKEY_REGISTERED') {
        this.notifyEmbeddedPasskeyRegistered();
        this.triggerEvent({
          eventName: 'PASSKEY_REGISTERED',
          type: 'PASSKEY_REGISTERED',
          identifier: this.uniqueIdentifier,
        } satisfies EmbeddedPasskeyRegisteredEvent);
      }

      if (data.eventName === 'PASSKEY_AUTHENTICATED') {
        this.notifyEmbeddedPasskeyAuthenticated();
        this.triggerEvent({
          eventName: 'PASSKEY_AUTHENTICATED',
          type: 'PASSKEY_AUTHENTICATED',
          identifier: this.uniqueIdentifier,
        } satisfies EmbeddedPasskeyAuthenticatedEvent);
      }

      return Promise.resolve();
    });
  }

  private removePopupListener() {
    if (!this.popupListener) return;

    this.popupListener.cancel();
    this.popupListener = null;
  }

  private handleInfoEvent(event: EmbeddedInfoEvent) {
    this.triggerEvent(event);

    if (isPasskeyRequiredEvent(event)) {
      this.openPasskeyRegistrationPopup(event);

      return;
    }

    if (isPasskeyAuthenticationRequiredEvent(event)) {
      this.openPasskeyAuthenticationPopup(event);
    }
  }

  private notifyEmbeddedPasskeyEvent(type: 'PASSKEY_REGISTERED' | 'PASSKEY_AUTHENTICATED') {
    if (!this.iframe?.contentWindow) return;

    this.iframe.contentWindow.postMessage(JSON.stringify({ type }), '*');
  }

  private notifyEmbeddedPasskeyRegistered() {
    this.notifyEmbeddedPasskeyEvent('PASSKEY_REGISTERED');
  }

  private notifyEmbeddedPasskeyAuthenticated() {
    this.notifyEmbeddedPasskeyEvent('PASSKEY_AUTHENTICATED');
  }

  private openPasskeyRegistrationPopup(event: EmbeddedPasskeyRequiredEvent) {
    if (!event.sessionToken || !event.companyId) return;

    const url = getRegisterPasskeyPopupUrl(this.options, {
      sessionToken: event.sessionToken,
      companyId: event.companyId,
      identifier: this.uniqueIdentifier,
    });

    this.passkeyPopupWindow = window.open(url, 'SoyioPasskeyRegistration', 'width=420,height=720,scrollbars=yes');
  }

  private openPasskeyAuthenticationPopup(event: EmbeddedPasskeyAuthenticationRequiredEvent) {
    if (!event.requestableToken) return;

    const url = getPasskeyAuthenticationPopupUrl(this.options, {
      requestableToken: event.requestableToken,
      identifier: this.uniqueIdentifier,
    });

    this.passkeyPopupWindow = window.open(url, 'SoyioPasskeyAuthentication', 'width=420,height=720,scrollbars=yes');
  }
}

export default EmbeddedSoyioWidget;
export { EmbeddedSoyioWidget };
