export type SoyioTheme = 'soyio';

export type CSSProperties = {
  appearance?: string;
  accentColor?: string;
  backgroundColor?: string;
  border?: string;
  borderBottom?: string;
  borderBottomColor?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
  borderBottomStyle?: string;
  borderBottomWidth?: string;
  borderColor?: string;
  borderLeft?: string;
  borderLeftColor?: string;
  borderLeftStyle?: string;
  borderLeftWidth?: string;
  borderRadius?: string;
  borderRight?: string;
  borderRightColor?: string;
  borderRightStyle?: string;
  borderRightWidth?: string;
  borderStyle?: string;
  borderTop?: string;
  borderTopColor?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderTopStyle?: string;
  borderTopWidth?: string;
  borderWidth?: string;
  boxShadow?: string;
  color?: string;
  cursor?: string;
  fill?: string;
  fillOpacity?: number;
  fontFamily?: string;
  fontSize?: string;
  fontVariant?: string;
  fontWeight?: string | number;
  height?: string;
  letterSpacing?: string;
  lineHeight?: string | number;
  margin?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  marginTop?: string;
  opacity?: number;
  outline?: string;
  outlineOffset?: string;
  padding?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingTop?: string;
  mozOsxFontSmoothing?: 'auto' | 'grayscale' | 'unset';
  WebkitAppearance?: string;
  webkitFontSmoothing?: 'auto' | 'antialiased' | 'subpixel-antialiased';
  webkitTextFillColor?: string;
  width?: string;
};

export type SoyioElementState =
  | '--checked';

export type SoyioPseudoClass = ':hover' | ':focus' | ':active' | ':disabled' | ':autofill' | ':focus-visible';

export type SoyioPseudoElement = '::placeholder' | '::selection';

export type SoyioBaseRule =
  | '.MainContainer'
  | '.Button'
  | '.Checkbox'
  | '.CheckboxInput'
  | '.CheckboxLabel'
  | '.Input'
  | '.Label'
  | '.Title'
  | '.Link'
  | '.Card'
  | '.Select'
  | '.Loader'
  | '.TextArea'
  | '.ErrorMessage'
  | '.Description'
  | '.Switch'
  | '.SwitchRoot'
  | '.SwitchThumb'
  | '.SwitchIcon'
  | '.Alert'
  | '.Alert--error'
  | '.Alert--warning'
  | '.Alert--information'
  | '.Alert--success'
  | '.Radio'
  | '.RadioLabel'
  | '.Chip'
  | '.Chip--info'
  | '.Chip--green'
  | '.Chip--red'
  | '.Chip--amber'
  | '.Dialog'
  | '.DialogOverlay'
  | '.DialogContent'
  | '.Combobox'
  | '.NinInput'
  | '.RadioCard'
  | '.RadioCardIndicator'
  | '.RadioCardIndicatorPoint'
  | '.TooltipContent';

export type SoyioRuleKey = `${SoyioBaseRule}${SoyioElementState | SoyioPseudoClass | SoyioPseudoElement | ''}`;

export type SoyioRule = {
  [K in SoyioRuleKey]?: CSSProperties;
};

export interface SoyioAppearanceVariables {
  fontFamily?: string;
  fontSizeBase?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderStyle?: string;
  colorPrimary?: string;
  colorSecondary?: string;
  colorBackground?: string;
  colorText?: string;
  colorTextSecondary?: string;
  colorTextSubtle?: string;
  colorTextInverted?: string;
  colorPrimarySurface?: string;
  colorSurface?: string;
  colorSurfaceMuted?: string;
  colorSurfaceStrong?: string;
  colorBorder?: string;
  colorBorderMuted?: string;
  colorSwitchBorder?: string;
  colorInfo?: string;
  colorInfoBg?: string;
  colorSuccess?: string;
  colorSuccessBg?: string;
  colorWarning?: string;
  colorWarningBg?: string;
  colorDanger?: string;
  colorDangerBg?: string;
  colorOverlay?: string;
}

export interface SoyioAppearance {
  theme?: SoyioTheme;
  variables?: SoyioAppearanceVariables;
  rules?: SoyioRule;
}
