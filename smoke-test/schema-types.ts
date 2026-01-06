import { ConsentConfig } from '../src/embeds/consent/types';
import { PrivacyCenterConfig } from '../src/embeds/privacy-center/types';

export type SmokeTestConfig = Partial<PrivacyCenterConfig> & Partial<ConsentConfig> & {
  companyId?: string;
  sessionToken?: string;
};
