export type ForceErrors = 'facial_validation_error' | 'document_validation_error' | 'unknown_error' | 'expiration_error' | 'camera_permission_error';
export type Flow = 'authenticate' | 'register' | 'signature'

export type AuthAttemptProps = {
  companyId: string
  identityId: string
  userReference?: string
  forceError?: ForceErrors
  customColor?: string
}

export type ValidationAttemptProps = {
  companyId: string
  flowTemplateId: string
  userReference?: string
  userEmail?: string
  forceError?: ForceErrors
  customColor?: string
}

export type SignatureAttemptProps = {
  signatureAttemptId: string
  forceError?: ForceErrors
  customColor?: string
}

export type EventData = {
  eventName: 'IDENTITY_REGISTERED' | 'IDENTITY_AUTHENTICATED' | 'IDENTITY_SIGNATURE' | 'DENIED_CAMERA_PERMISSION' | 'REJECTED_SIGNATURE',
  identityId: string,
  userReference?: string
}

export type ValidationAttemptConfig = {
  flow: 'register',
  configProps: ValidationAttemptProps,
  onEvent: (data: EventData) => void,
  isSandbox?: boolean,
  developmentUrl?: string,
}

export type AuthAttemptConfig = {
  flow: 'authenticate',
  configProps: AuthAttemptProps,
  onEvent: (data: EventData) => void,
  isSandbox?: boolean,
  developmentUrl?: string,
}

export type SignatureAttemptConfig = {
  flow: 'signature',
  configProps: SignatureAttemptProps,
  onEvent: (data: EventData) => void,
  isSandbox?: boolean,
  developmentUrl?: string,
}

export type AttemptConfig = ValidationAttemptConfig | AuthAttemptConfig | SignatureAttemptConfig;
