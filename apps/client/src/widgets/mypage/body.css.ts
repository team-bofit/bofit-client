import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const userSection = style({
  position: 'relative',
  width: '100%',
  height: '100svh',
  background: themeVars.color.gradientPrimary,
});

export const userContent = style({
  width: '100%',
  display: 'flex',
  padding: '3.2rem 1.6rem 2.4rem 1.6rem',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.6rem',
  boxShadow: `0px 0px 30px 0px ${themeVars.color.gray300}`,
});

export const contentName = style({
  ...themeVars.fontStyles.head2_b_24,
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  width: '100%',
  textAlign: 'center',
  color: themeVars.color.white,
});
