export type ForceErrors = 'facial_validation_error' | 'document_validation_error' | 'unknown_error' | 'expiration_error' | 'camera_permission_error';
export type Flow = 'authenticate' | 'register'

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

export type ConfigProps = AuthAttemptProps | ValidationAttemptProps

export type EventData = {
  eventName: 'IDENTITY_REGISTERED' | 'IDENTITY_AUTHENTICATED' | 'DENIED_CAMERA_PERMISSION',
  identityId: string,
  userReference?: string
}

export type WidgetConfig = {
  flow: Flow,
  configProps: ConfigProps,
  onEvent: (data: EventData) => void,
  isSandbox?: boolean,
  developmentUrl?: string,
}
