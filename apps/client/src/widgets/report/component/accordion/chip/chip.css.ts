import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  backgroundColor: themeVars.color.whiteBackground,
  width: '4.1rem',
  height: '2.5rem',
  borderRadius: '6px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const chipText = style({
  ...themeVars.fontStyles.body1_m_12,
  color: themeVars.color.error,
});
