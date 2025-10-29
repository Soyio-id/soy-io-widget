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

export type PrivacyCenterConfig = BaseConfig & {
  enabledFeatures?: PrivacyManagerFeature[];
  dataSubjects?: DataSubject[];
} & (
  | {
      companyId: `com_${string}`;
      sessionToken?: never;
    }
  | {
      sessionToken: string;
      companyId?: never;
    }
);
