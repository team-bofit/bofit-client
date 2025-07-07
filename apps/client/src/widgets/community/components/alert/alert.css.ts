import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '1.6rem',
  whiteSpace: 'pre-wrap',
  gap: '0.8rem',
  backgroundColor: themeVars.color.gray100,
});

export const alertHeader = style({
  display: 'flex',
  gap: '0.8rem',
  alignItems: 'center',
});

export const headerContent = style({
  color: themeVars.color.primary500,
  ...themeVars.fontStyles.head2_b_14,
});
