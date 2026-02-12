import { CLOSED_EVENT } from '@/constants';

export type Request = 'disclosure' | 'signature' | 'authentication';

export type NewDisclosureRequestProps = {
  companyId: `com_${string}`;
  templateId: `dtpl_${string}`;
  disclosureRequestId?: never;
  userReference: string;
  userEmail?: string;
  customColor?: string;
}

export type ExistingDisclosureRequestProps = {
  companyId?: never;
  templateId?: never;
  disclosureRequestId: `dreq_${string}`;
  userReference?: never;
  userEmail?: never;
  customColor?: string;
}

export type DisclosureRequestProps = NewDisclosureRequestProps | ExistingDisclosureRequestProps;

export type SignatureAttemptProps = {
  signatureAttemptId: `sa_${string}`
  customColor?: string
}

export type AuthRequestProps = {
  authRequestId: `authreq_${string}`
  customColor?: string
}

export type EventData = {
  eventName: |
    'IDENTITY_VALIDATED' |
    'IDENTITY_AUTHENTICATED' |
    'IDENTITY_SIGNATURE' |
    'DENIED_CAMERA_PERMISSION' |
    'REJECTED_SIGNATURE' |
    'DISCLOSURE_REQUEST_SUCCESSFUL' |
    'UNEXPECTED_ERROR' |
    'AUTH_REQUEST_SUCCESSFUL' |
    typeof CLOSED_EVENT
  identityId: `id_${string}`
  userReference?: string
}

export type EmbeddedPasskeyRequiredEvent = {
  eventName: 'PASSKEY_REQUIRED';
  type: 'PASSKEY_REQUIRED';
  sessionToken: string;
  companyId: `com_${string}`;
}

export type EmbeddedPasskeyAuthenticationRequiredEvent = {
  eventName: 'PASSKEY_AUTHENTICATION_REQUIRED';
  type: 'PASSKEY_AUTHENTICATION_REQUIRED';
  requestableToken: string;
}

export type EmbeddedPasskeyRegisteredEvent = {
  eventName: 'PASSKEY_REGISTERED';
  type: 'PASSKEY_REGISTERED';
  identifier: string;
}

export type EmbeddedPasskeyAuthenticatedEvent = {
  eventName: 'PASSKEY_AUTHENTICATED';
  type: 'PASSKEY_AUTHENTICATED';
  identifier: string;
}

export type EmbeddedInfoEvent =
  EventData |
  EmbeddedPasskeyRequiredEvent |
  EmbeddedPasskeyAuthenticationRequiredEvent |
  EmbeddedPasskeyRegisteredEvent |
  EmbeddedPasskeyAuthenticatedEvent;

export type DisclosureRequestConfig = {
  request: 'disclosure',
  configProps: DisclosureRequestProps,
  onEvent: (data: EventData) => void,
  isSandbox?: boolean,
  developmentUrl?: string,
}

export type SignatureRequestConfig = {
  request: 'signature',
  configProps: SignatureAttemptProps,
  onEvent: (data: EventData) => void,
  isSandbox?: boolean,
  developmentUrl?: string,
}

export type AuthRequestConfig = {
  request: 'authentication_request',
  configProps: AuthRequestProps,
  onEvent: (data: EventData) => void,
  isSandbox?: boolean,
  developmentUrl?: string,
}

export type RequestConfig = DisclosureRequestConfig | SignatureRequestConfig | AuthRequestConfig;

export type EmbeddedDisclosureRequestProps = ExistingDisclosureRequestProps;

export type EmbeddedWidgetSizing = {
  height?: string;
  minHeight?: string;
}

export type EmbeddedDisclosureRequestConfig = {
  request: 'disclosure',
  configProps: EmbeddedDisclosureRequestProps,
  onEvent: (data: EmbeddedInfoEvent) => void,
  onReady?: () => void,
  isSandbox?: boolean,
  developmentUrl?: string,
} & EmbeddedWidgetSizing;
