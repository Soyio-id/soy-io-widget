declare type Flow = 'authenticate' | 'register'

declare interface ConfigProps {
  companyId: string
  userReference?: string
  flowTemplateId?: string
  identityId?: string
}

declare interface EventData {
  eventName: 'IDENTITY_REGISTERED' | 'IDENTITY_AUTHENTICATED',
  identityId: string,
  userReference?: string
}
