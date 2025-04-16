import type { SoyioAppearance } from '../appearance/types';

export const IFRAME_READY = 'IFRAME_READY';
export const CONSENT_STATE_CHANGE = 'CONSENT_STATE_CHANGE';
export const IFRAME_HEIGHT_CHANGE = 'IFRAME_HEIGHT_CHANGE';
export const APPEARANCE_CONFIG = 'APPEARANCE_CONFIG';
export const TOOLTIP_STATE_CHANGE = 'TOOLTIP_STATE_CHANGE';
export const INFO_EVENT = 'INFO_EVENT';

export interface ISkeletonView {
  mount(container: HTMLElement): void;
  hide(): void;
}

export interface IBaseEventData {
  identifier: string;
  eventName: string;
}

export interface IframeReadyEvent extends IBaseEventData {
  eventName: 'IFRAME_READY';
}

export interface IframeHeightChangeEvent extends IBaseEventData {
  eventName: 'IFRAME_HEIGHT_CHANGE';
  height: number;
}

export interface IAppearanceConfigEvent extends IBaseEventData {
  eventName: 'APPEARANCE_CONFIG';
  appearance: SoyioAppearance;
}

export interface ITooltipStateChangeEvent extends IBaseEventData {
  eventName: 'TOOLTIP_STATE_CHANGE';
  text: string;
  coordinates: {
    x: number;
    y: number;
  };
  isVisible: boolean;
}

export type ConsentEvent =
  | IframeHeightChangeEvent
  | IframeReadyEvent
  | IAppearanceConfigEvent
  | ITooltipStateChangeEvent;

export type BaseConfig = {
  onEvent: (event: Record<string, unknown>) => void,
  onReady?: () => void,
  isSandbox?: boolean,
  appearance?: SoyioAppearance,
  developmentUrl?: string,
}

export type SkeletonConstructor = new (id: string) => ISkeletonView;
