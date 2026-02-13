import { BaseIframeBox } from '../embeds/base/base-iframe';
import {
  mountInstanceListeners,
} from '../embeds/listeners';

import { WIDGET_EVENT } from './constants';
import type {
  DisclosureRequestBoxConfig,
  DisclosureRequestBoxEvent,
  DisclosureRequestBoxPasskeyAuthenticatedEvent,
  DisclosureRequestBoxPasskeyAuthenticationRequiredEvent,
  DisclosureRequestBoxPasskeyRegisteredEvent,
  DisclosureRequestBoxPasskeyRequiredEvent,
} from './types';
import {
  getDisclosureRequestBoxUrl,
  getPasskeyAuthenticationPopupUrl,
  getRegisterPasskeyPopupUrl,
} from './utils';

type PostRobotListener = ReturnType<typeof import('post-robot')['on']>;

function isPasskeyRequiredEvent(event: DisclosureRequestBoxEvent): event is DisclosureRequestBoxPasskeyRequiredEvent {
  return event.eventName === 'PASSKEY_REQUIRED' && event.type === 'PASSKEY_REQUIRED';
}

function isPasskeyAuthenticationRequiredEvent(
  event: DisclosureRequestBoxEvent,
): event is DisclosureRequestBoxPasskeyAuthenticationRequiredEvent {
  return event.eventName === 'PASSKEY_AUTHENTICATION_REQUIRED' && event.type === 'PASSKEY_AUTHENTICATION_REQUIRED';
}

class DisclosureRequestBox extends BaseIframeBox<DisclosureRequestBoxConfig> {
  readonly defaultIframePrefix = 'disclosure-request-box';

  private passkeyPopupWindow: Window | null = null;
  private popupListener: PostRobotListener | null = null;
  private isReadyCallbackFired = false;

  iframeUrl(): string {
    return getDisclosureRequestBoxUrl(this.options, this.uniqueIdentifier);
  }

  override async mount(selector: string): Promise<this> {
    this.isReadyCallbackFired = false;

    await super.mount(selector);
    if (!this.iframe) return this;

    this.iframe.style.height = this.options.height || '720px';
    this.iframe.style.minHeight = this.options.minHeight || this.iframe.style.height;

    this.iframe.onload = () => {
      this.notifyReady();
    };

    return this;
  }

  override unmount(): void {
    this.removePopupListener();
    this.passkeyPopupWindow?.close();
    this.passkeyPopupWindow = null;
    this.isReadyCallbackFired = false;

    super.unmount();
  }

  protected override async setupListeners(): Promise<void> {
    await super.setupListeners();
    await this.mountPopupListener();

    mountInstanceListeners(this.uniqueIdentifier, {
      onInfo: (info) => this.handleInfoEvent(info as DisclosureRequestBoxEvent),
    });
  }

  protected override async handleIframeReady(): Promise<void> {
    this.notifyReady();
  }

  private notifyReady() {
    if (this.isReadyCallbackFired) return;

    this.isReadyCallbackFired = true;
    this.options.onReady?.();
  }

  private triggerEvent(data: DisclosureRequestBoxEvent) {
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
        this.notifyPasskeyRegistered();
        this.triggerEvent({
          eventName: 'PASSKEY_REGISTERED',
          type: 'PASSKEY_REGISTERED',
          identifier: this.uniqueIdentifier,
        } satisfies DisclosureRequestBoxPasskeyRegisteredEvent);
      }

      if (data.eventName === 'PASSKEY_AUTHENTICATED') {
        this.notifyPasskeyAuthenticated();
        this.triggerEvent({
          eventName: 'PASSKEY_AUTHENTICATED',
          type: 'PASSKEY_AUTHENTICATED',
          identifier: this.uniqueIdentifier,
        } satisfies DisclosureRequestBoxPasskeyAuthenticatedEvent);
      }

      return Promise.resolve();
    });
  }

  private removePopupListener() {
    if (!this.popupListener) return;

    this.popupListener.cancel();
    this.popupListener = null;
  }

  private handleInfoEvent(event: DisclosureRequestBoxEvent) {
    this.triggerEvent(event);

    if (isPasskeyRequiredEvent(event)) {
      this.openPasskeyRegistrationPopup(event);

      return;
    }

    if (isPasskeyAuthenticationRequiredEvent(event)) {
      this.openPasskeyAuthenticationPopup(event);
    }
  }

  private notifyPasskeyEvent(type: 'PASSKEY_REGISTERED' | 'PASSKEY_AUTHENTICATED') {
    if (!this.iframe?.contentWindow) return;

    const targetOrigin = new URL(this.iframe.src).origin;
    this.iframe.contentWindow.postMessage(JSON.stringify({ type }), targetOrigin);
  }

  private notifyPasskeyRegistered() {
    this.notifyPasskeyEvent('PASSKEY_REGISTERED');
  }

  private notifyPasskeyAuthenticated() {
    this.notifyPasskeyEvent('PASSKEY_AUTHENTICATED');
  }

  private openPasskeyRegistrationPopup(event: DisclosureRequestBoxPasskeyRequiredEvent) {
    if (!event.sessionToken || !event.companyId) return;

    const url = getRegisterPasskeyPopupUrl(this.options, {
      sessionToken: event.sessionToken,
      companyId: event.companyId,
      identifier: this.uniqueIdentifier,
    });

    this.passkeyPopupWindow = window.open(url, 'SoyioPasskeyRegistration', 'width=420,height=720,scrollbars=yes');
  }

  private openPasskeyAuthenticationPopup(event: DisclosureRequestBoxPasskeyAuthenticationRequiredEvent) {
    if (!event.requestableToken) return;

    const url = getPasskeyAuthenticationPopupUrl(this.options, {
      requestableToken: event.requestableToken,
      identifier: this.uniqueIdentifier,
    });

    this.passkeyPopupWindow = window.open(url, 'SoyioPasskeyAuthentication', 'width=420,height=720,scrollbars=yes');
  }
}

export default DisclosureRequestBox;
export { DisclosureRequestBox };
