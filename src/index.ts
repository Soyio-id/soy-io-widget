import { TooltipManager } from './embeds/base/tooltip-manager';
import { ConsentBox } from './embeds/consent';
import { PrivacyCenterBox } from './embeds/privacy-center';
import * as SoyioTypes from './types';
import { DisclosureRequestBox, SoyioWidget } from './widget';

export default SoyioWidget;
export {
  ConsentBox,
  DisclosureRequestBox,
  PrivacyCenterBox,
  SoyioWidget,
  SoyioTypes,
  TooltipManager as _TooltipManager,
};

export { default as appearanceSchema } from './schemas/appearance.schema.json';
export { default as configSchema } from './schemas/config.schema.json';
