export type SoyioErrors = 'user_exists' | 'facial_validation_error' | 'document_validation_error' | 'unknown_error';
export type Flow = 'authenticate' | 'register'

export type ConfigProps = {
  companyId: string
  userReference?: string
  flowTemplateId?: string
  userEmail?: string
  identityId?: string
  forceError?: SoyioErrors
  customColor?: string
}

export type EventData = {
  eventName: 'IDENTITY_REGISTERED' | 'IDENTITY_AUTHENTICATED',
  identityId: string,
  userReference?: string
}

export type WidgetConfig = {
  flow: Flow,
  configProps: Partial<ConfigProps>,
  onEvent: (data: EventData) => void,
  isSandbox?: boolean,
  developmentUrl?: string,
}
