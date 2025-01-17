import type { SoyioAppearance } from './appearance/types';

export const IFRAME_READY = 'IFRAME_READY';
export const IFRAME_EVENT = 'IFRAME_EVENT';
export const IFRAME_HEIGHT_CHANGE = 'IFRAME_HEIGHT_CHANGE';
export const APPEARANCE_CONFIG = 'APPEARANCE_CONFIG';

export type ConsentCheckboxChangeEvent = {
  eventName: 'CONSENT_CHECKBOX_CHANGE'
  isSelected: boolean
  actionToken?: string
}

export type IframeReadyEvent = {
  eventName: 'IFRAME_READY';
};

export type IframeHeightChangeEvent = {
  eventName: 'IFRAME_HEIGHT_CHANGE'
  height: number
}

export type AppearanceConfigEvent = {
  eventName: 'APPEARANCE_CONFIG';
  appearance: SoyioAppearance;
};

export type ConsentEvent =
  | ConsentCheckboxChangeEvent
  | IframeHeightChangeEvent
  | IframeReadyEvent
  | AppearanceConfigEvent;

export type ConsentConfig = {
  consentTemplateId: `constpl_${string}`,
  onEvent: (data: ConsentEvent) => void,
  isSandbox?: boolean,
  developmentUrl?: string,
  appearance?: SoyioAppearance,
}
