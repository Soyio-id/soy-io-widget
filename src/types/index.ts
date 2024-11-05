export type ForceErrors = 'facial_validation_error' | 'document_validation_error' | 'unknown_error' | 'expiration_error' | 'camera_permission_error';
export type Request = 'disclosure' | 'signature'

export type NewDisclosureRequestProps = {
  companyId: string;
  templateId: string;
  disclosureRequestId?: never;
  userReference: string;
  userEmail?: string;
  forceError?: ForceErrors;
  customColor?: string;
}

export type ExistingDisclosureRequestProps = {
  companyId?: never;
  templateId?: never;
  disclosureRequestId: string;
  userReference?: never;
  userEmail?: never;
  forceError?: ForceErrors;
  customColor?: string;
}

export type DisclosureRequestProps = NewDisclosureRequestProps | ExistingDisclosureRequestProps;

export type SignatureAttemptProps = {
  signatureAttemptId: string
  forceError?: ForceErrors
  customColor?: string
}

export type EventData = {
  eventName: 'IDENTITY_VALIDATED' | 'IDENTITY_AUTHENTICATED' | 'IDENTITY_SIGNATURE' | 'DENIED_CAMERA_PERMISSION' | 'REJECTED_SIGNATURE' | 'DISCLOSURE_REQUEST_SUCCESSFUL' | 'UNEXPECTED_ERROR',
  identityId: string,
  userReference?: string
}

export type DisclosureRequestConfig = {
  request: 'disclosure',
  configProps: DisclosureRequestProps,
  onEvent: (data: EventData) => void,
  isSandbox?: boolean,
  developmentUrl?: string,
}

export type SignatureAttemptConfig = {
  request: 'signature',
  configProps: SignatureAttemptProps,
  onEvent: (data: EventData) => void,
  isSandbox?: boolean,
  developmentUrl?: string,
}

export type AttemptConfig = DisclosureRequestConfig | SignatureAttemptConfig;
