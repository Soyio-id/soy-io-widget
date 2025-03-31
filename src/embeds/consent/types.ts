import type { BaseConfig } from '../base/types';

export const CONSENT_STATE_CHANGE = 'CONSENT_STATE_CHANGE';

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

export type ConsentEvent = ConsentCheckboxChangeEvent;

export type ConsentConfig = BaseConfig & {
  consentTemplateId: `constpl_${string}`,
  onEvent: (data: ConsentEvent) => void,
  actionToken?: string,
  entityId?: `ent_${string}`,
  context?: string,
  optionalReconsentBehavior?: 'notice' | 'askAgain' | 'hide',
  mandatoryReconsentBehavior?: 'notice' | 'askAgain',
}
