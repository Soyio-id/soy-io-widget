import { BaseConfig } from '../base/types';

type WithSubjectId = {
  subjectId: `ent_${string}`;
  companyId?: `com_${string}`;
};

type WithCompanyId = {
  subjectId?: `ent_${string}`;
  companyId: `com_${string}`;
};

export type PrivacyCenterConfig = BaseConfig & (WithSubjectId | WithCompanyId);
