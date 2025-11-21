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
