import { ConsentConfig } from './embeds/consent/types';
import { PrivacyCenterConfig } from './embeds/privacy-center/types';

/**
 * Combined configuration type for generating the JSON schema.
 * This includes all possible configuration options for both PrivacyCenterBox and ConsentBox.
 */
export type SoyioWidgetConfig = PrivacyCenterConfig | ConsentConfig;
