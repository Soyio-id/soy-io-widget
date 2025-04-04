import { BaseConfig } from '../base/types';

export type PrivacyCenterConfig = BaseConfig & {
  companyId: `com_${string}`;
  subjectId?: `ent_${string}`;
};
