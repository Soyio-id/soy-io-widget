import { BaseConfig } from '../base/types';

export type PrivacyCenterConfigWithSessionToken = BaseConfig & {
  sessionToken: string;
  companyId?: never;
  subjectId?: never;
};

export type PrivacyCenterConfigWithoutSessionToken = BaseConfig & {
  sessionToken?: never;
  companyId: `com_${string}`;
  subjectId?: `ent_${string}`;
};

export type PrivacyCenterConfig =
  | PrivacyCenterConfigWithSessionToken
  | PrivacyCenterConfigWithoutSessionToken;
