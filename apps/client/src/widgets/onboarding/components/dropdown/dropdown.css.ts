import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const dropdownContainer = style({
  display: 'flex',
  width: '100%',
  height: '5.6rem',
  padding: '1.6rem 1.6rem 1.6rem 2rem',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '12px',
  border: `1px solid ${themeVars.color.primary300}`,
});

export const dropdownPlaceHolder = style({
  ...themeVars.fontStyles.body2_r_16,
  color: themeVars.color.primary700,
});
