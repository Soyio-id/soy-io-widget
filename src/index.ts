import { TooltipManager } from './embeds/base/tooltip-manager';
import { ConsentBox } from './embeds/consent';
import { PrivacyCenterBox } from './embeds/privacy-center';
import * as SoyioTypes from './types';
import { SoyioWidget } from './widget';

export default SoyioWidget;
export {
  ConsentBox,
  PrivacyCenterBox,
  SoyioWidget,
  SoyioTypes,
  TooltipManager as _TooltipManager,
};
