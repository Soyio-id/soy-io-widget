export const IFRAME_EVENT = 'IFRAME_EVENT';
export const IFRAME_HEIGHT_CHANGE = 'IFRAME_HEIGHT_CHANGE';

export type ConsentCheckboxChangeEvent = {
  eventName: 'CONSENT_CHECKBOX_CHANGE'
  isSelected: boolean
  jwt: string
}

export type IframeHeightChangeEvent = {
  eventName: 'IFRAME_HEIGHT_CHANGE'
  height: number
}

export type ConsentEvent = ConsentCheckboxChangeEvent | IframeHeightChangeEvent;

export type ConsentConfig = {
  consentTemplateId: `constpl_${string}`,
  onEvent: (data: ConsentEvent) => void,
  isSandbox?: boolean,
  developmentUrl?: string,
}
