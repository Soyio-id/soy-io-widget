import type { SoyioAppearance } from '../appearance/types';

export const IFRAME_READY = 'IFRAME_READY';
export const CONSENT_STATE_CHANGE = 'CONSENT_STATE_CHANGE';
export const IFRAME_HEIGHT_CHANGE = 'IFRAME_HEIGHT_CHANGE';
export const APPEARANCE_CONFIG = 'APPEARANCE_CONFIG';
export const TOOLTIP_STATE_CHANGE = 'TOOLTIP_STATE_CHANGE';

export interface ISkeletonView {
  mount(container: HTMLElement): void;
  hide(): void;
}

export interface BaseEventData {
  identifier: string;
}

export interface IframeReadyEvent extends BaseEventData {
  eventName: 'IFRAME_READY';
}

export interface IframeHeightChangeEvent extends BaseEventData {
  eventName: 'IFRAME_HEIGHT_CHANGE';
  height: number;
}

export interface AppearanceConfigEvent extends BaseEventData {
  eventName: 'APPEARANCE_CONFIG';
  appearance: SoyioAppearance;
}

export interface TooltipStateChangeEvent extends BaseEventData {
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
  | AppearanceConfigEvent
  | TooltipStateChangeEvent;

export interface BaseIframeConfig {
  onReady?: () => void;
}

export type BaseConfig = {
  onReady?: () => void,
  isSandbox?: boolean,
  appearance?: SoyioAppearance,
  developmentUrl?: string,
}

export type SkeletonConstructor = new (id: string) => ISkeletonView;
