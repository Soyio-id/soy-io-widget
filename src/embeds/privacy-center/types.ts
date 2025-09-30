import { BaseConfig } from '../base/types';

export type PrivacyManagerFeature = 'DataSubjectRequest' | 'ConsentManagement' | 'RequestTracking';

export type DataSubject =
| 'anonymous_user'
| 'citizen_voter'
| 'commuter'
| 'consultant'
| 'customer'
| 'employee'
| 'job_applicant'
| 'next_of_kin'
| 'passenger'
| 'patient'
| 'prospect'
| 'shareholder'
| 'supplier_vendor'
| 'trainee'
| 'visitor';

export type PrivacyCenterConfigWithSessionToken = BaseConfig & {
  sessionToken: string;
  enabledFeatures?: PrivacyManagerFeature[];
  companyId?: never;
  subjectId?: never;
  dataSubjects?: DataSubject[];
};

export type PrivacyCenterConfigWithoutSessionToken = BaseConfig & {
  sessionToken?: never;
  enabledFeatures?: PrivacyManagerFeature[];
  companyId: `com_${string}`;
  subjectId?: `ent_${string}`;
  dataSubjects?: DataSubject[];
};

export type PrivacyCenterConfig =
  | PrivacyCenterConfigWithSessionToken
  | PrivacyCenterConfigWithoutSessionToken;
