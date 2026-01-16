import { BaseConfig } from '../base/types';

export type PrivacyManagerFeature = 'DataSubjectRequest' | 'ConsentManagement' | 'RequestTracking';
export type PrivacyCenterRight = 'arsop' | 'redec';

export type RedecOperationId = {
  id: string;
  label: string;
};

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
  enabledRights?: PrivacyCenterRight[];
  dataSubjects?: DataSubject[];
  requestReference?: string;
  demo?: boolean;
  fileRequisites?: {
    allowedExtensions?: string[];
    maxFileSize?: number;
  };
  redecOperationIds?: RedecOperationId[];
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
