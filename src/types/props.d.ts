declare type Flow = 'authenticate' | 'register'

declare interface ConfigProps {
  companyId: string
  userReference?: string
  flowTemplateId?: string
  userEmail?: string
  identityId?: string
}

declare interface EventData {
  eventName: 'IDENTITY_REGISTERED' | 'IDENTITY_AUTHENTICATED',
  identityId: string,
  userReference?: string
}

declare interface WidgetConfig {
  flow: Flow,
  configProps: Partial<ConfigProps>,
  onEvent: (data: EventData) => void,
  isSandbox?: boolean,
  developmentUrl?: string,
}
