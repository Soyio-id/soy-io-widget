export type Flow = 'authenticate' | 'register'

export type ConfigProps = {
  companyId: string
  userReference?: string
  flowTemplateId?: string
  userEmail?: string
  identityId?: string
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
