import { BaseConfig } from '../base/types';

export type PrivacyCenterConfig = BaseConfig & {
  entityId?: `ent_${string}`;
};
