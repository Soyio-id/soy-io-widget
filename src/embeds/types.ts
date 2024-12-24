export type ConsentRequestEvent = {
  eventName: 'CONSENT_CHECKBOX_CHANGE'
  entityId: `ent_${string}`
  userReference?: string
}

export type ConsentRequestConfig = {
  consentRequestId: `consreq_${string}`,
  onEvent: (data: ConsentRequestEvent) => void,
  isSandbox?: boolean,
  developmentUrl?: string,
}
