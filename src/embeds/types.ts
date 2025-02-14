import type { SoyioAppearance } from './appearance/types';

export const IFRAME_READY = 'IFRAME_READY';
export const CONSENT_STATE_CHANGE = 'CONSENT_STATE_CHANGE';
export const IFRAME_HEIGHT_CHANGE = 'IFRAME_HEIGHT_CHANGE';
export const APPEARANCE_CONFIG = 'APPEARANCE_CONFIG';
export const TOOLTIP_STATE_CHANGE = 'TOOLTIP_STATE_CHANGE';

export type ConsentState = {
  isSelected: boolean;
  actionToken: string | null;
}

export type ConsentCheckboxChangeEvent = {
  eventName: 'CONSENT_CHECKBOX_CHANGE';
  isSelected: boolean;
  actionToken?: string;
  identifier: string;
}

export type IframeReadyEvent = {
  eventName: 'IFRAME_READY';
  identifier: string;
};

export type IframeHeightChangeEvent = {
  eventName: 'IFRAME_HEIGHT_CHANGE'
  height: number
  identifier: string;
}

export type AppearanceConfigEvent = {
  eventName: 'APPEARANCE_CONFIG';
  appearance: SoyioAppearance;
  identifier: string;
};

export type TooltipStateChangeEvent = {
  eventName: 'TOOLTIP_STATE_CHANGE';
  identifier: string;
  text: string;
  coordinates: {
    x: number;
    y: number;
  };
  isVisible: boolean;
};

export type ConsentEvent =
  | ConsentCheckboxChangeEvent
  | IframeHeightChangeEvent
  | IframeReadyEvent
  | AppearanceConfigEvent
  | TooltipStateChangeEvent;

export type ConsentConfig = {
  consentTemplateId: `constpl_${string}`,
  onEvent: (data: ConsentEvent) => void,
  isSandbox?: boolean,
  appearance?: SoyioAppearance,
  actionToken?: string,
  developmentUrl?: string,
}
