import { BaseConfig } from '../base/types';

export type PrivacyManagerFeature = 'DataSubjectRequest' | 'ConsentManagement';

export type PrivacyCenterConfigWithSessionToken = BaseConfig & {
  sessionToken: string;
  enabledFeatures?: PrivacyManagerFeature[];
  companyId?: never;
  subjectId?: never;
};

export type PrivacyCenterConfigWithoutSessionToken = BaseConfig & {
  sessionToken?: never;
  enabledFeatures?: PrivacyManagerFeature[];
  companyId: `com_${string}`;
  subjectId?: `ent_${string}`;
};

export type PrivacyCenterConfig =
  | PrivacyCenterConfigWithSessionToken
  | PrivacyCenterConfigWithoutSessionToken;
