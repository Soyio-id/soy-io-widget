export const IFRAME_EVENT = 'IFRAME_EVENT';

export type ConsentRequestEvent = {
  eventName: 'CONSENT_CHECKBOX_CHANGE'
  entityId: `ent_${string}`
  isSelected: boolean
}

export type ConsentRequestConfig = {
  consentRequestId: `consreq_${string}`,
  onEvent: (data: ConsentRequestEvent) => void,
  isSandbox?: boolean,
  developmentUrl?: string,
}
