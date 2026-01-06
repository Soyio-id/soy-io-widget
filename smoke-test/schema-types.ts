import { PrivacyCenterConfig } from '../src/embeds/privacy-center/types';
import { ConsentConfig } from '../src/embeds/consent/types';

export type SmokeTestConfig = Partial<PrivacyCenterConfig> & Partial<ConsentConfig> & {
  companyId?: string;
  sessionToken?: string;
};
