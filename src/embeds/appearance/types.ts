export type SoyioTheme = 'soyio' | 'night' | 'flat';

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
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  width?: string;
  // Layout
  display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flex?: string;
  gap?: string;
  // Positioning
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: number | string;
  // Transitions & Transforms
  transition?: string;
  transitionProperty?: string;
  transitionDuration?: string;
  transitionTimingFunction?: string;
  transitionDelay?: string;
  transform?: string;
  transformOrigin?: string;
  // Visibility & Overflow
  visibility?: 'visible' | 'hidden' | 'collapse';
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto';
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto';
  // Text
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  textDecoration?: string;
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line';
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
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
  | '.HintIcon'
  | '.Title'
  | '.StepTitle'
  | '.Link'
  | '.Card'
  | '.CardTitle'
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
  | '.AlertIcon'
  | '.AlertContent'
  | '.Radio'
  | '.RadioButton'
  | '.RadioIndicator'
  | '.RadioLabel'
  | '.Chip'
  | '.Dialog'
  | '.DialogOverlay'
  | '.DialogContent'
  | '.DialogTitle'
  | '.DialogDescription'
  | '.Combobox'
  | '.NinInput'
  | '.TrackingCodeInput'
  | '.TrackingCodeInputCell'
  | '.TrackingCodeInputSeparator'
  | '.RadioCard'
  | '.RadioCardButton'
  | '.RadioCardIndicator'
  | '.RadioCardTitle'
  | '.StepIndicatorContainer'
  | '.StepIndicator'
  | '.StepIndicatorLine'
  | '.StepIndicatorIcon'
  | '.StepIndicatorDot'
  | '.StepIndicatorNumber'
  | '.TooltipContent';

// State-specific rules that should not be combined with SoyioElementState
export type SoyioStateRule =
  | '.Input--error'
  | '.Alert--error'
  | '.Alert--warning'
  | '.Alert--info'
  | '.Alert--success'
  | '.Chip--info'
  | '.Chip--green'
  | '.Chip--red'
  | '.Chip--amber'
  | '.RadioCard--checked'
  | '.RadioCardIndicator--checked'
  | '.StepIndicator--active'
  | '.StepIndicator--completed'
  | '.StepIndicator--pending'
  | '.StepIndicatorLine--top'
  | '.StepIndicatorLine--bottom';

export type SoyioRuleKey =
  | `${SoyioBaseRule}${SoyioElementState | SoyioPseudoClass | SoyioPseudoElement | ''}`
  | SoyioStateRule;

export type SoyioRule = {
  [K in SoyioRuleKey]?: CSSProperties;
};

export interface SoyioAppearanceVariables {
  fontFamily?: string;
  fontFamilyBody?: string;
  fontFamilyTitle?: string;
  fontSizeBase?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderStyle?: string;
  colorPrimary?: string;
  colorPrimarySurface?: string;
  colorSecondary?: string;
  colorBackground?: string;
  colorSurface?: string;
  colorSurfaceMuted?: string;
  colorSurfaceStrong?: string;
  colorBorder?: string;
  colorBorderMuted?: string;
  colorSwitchBorder?: string;
  colorText?: string;
  colorTextSecondary?: string;
  colorTextSubtle?: string;
  colorTextInverted?: string;
  colorTextTitle?: string;
  colorLink?: string;
  colorInputFocus?: string;
  colorInputErrorFocus?: string;
  colorSelectArrow?: string;
  colorInfo?: string;
  colorInfoBg?: string;
  colorSuccess?: string;
  colorSuccessBg?: string;
  colorWarning?: string;
  colorWarningBg?: string;
  colorDanger?: string;
  colorDangerBg?: string;
  colorOverlay?: string;
  dataUseIconColor?: string;
}

export type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';

export interface SoyioIconConfig {
  /**
   * Icon weight/style variant.
   * - thin: Thinnest stroke
   * - light: Light stroke
   * - regular: Default stroke (default)
   * - bold: Bold stroke
   * - fill: Filled/solid icons
   * - duotone: Two-tone icons with opacity
   * @default 'regular'
   */
  weight?: IconWeight;

  /**
   * Default icon size in pixels.
   * @default 24
   */
  size?: number;

  /**
   * Override variant for data use icons in consent management.
   * If not set, uses the company's configured iconVariant.
   */
  dataUseVariant?: 'duotone' | 'outline' | 'solid';
}

export interface SoyioAppearanceConfig {
  helperTextPosition?: 'top' | 'bottom';
  /**
   * Icon name to use for hint/help tooltips on input labels.
   * Available icons: 'Question' (default), 'Info', 'QuestionMark', etc.
   * @default 'Question'
   */
  hintIcon?: string;
  /**
   * Global icon appearance configuration.
   * Controls default weight and size for all icons.
   */
  icon?: SoyioIconConfig;
  /**
   * Per-component icon overrides.
   * Allows customizing icon styles for specific components.
   *
   * @example
   * ```ts
   * iconRules: {
   *   Alert: { weight: 'fill' },
   *   Switch: { weight: 'bold' },
   *   'Alert.error': { weight: 'fill', size: 20 },
   * }
   * ```
   */
  iconRules?: Record<string, SoyioIconConfig>;
  /**
   * Number of columns in the main page feature cards grid.
   * @default 2
   */
  mainPageColumns?: 1 | 2 | 3 | 4;
}

export interface SoyioAppearance {
  theme?: SoyioTheme;
  variables?: SoyioAppearanceVariables;
  rules?: SoyioRule;
  config?: SoyioAppearanceConfig;
}
