import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const userSection = style({
  width: '100%',
  height: '100svh',
  background: themeVars.color.gradientPrimary,
  boxShadow: `0px 0px 30px 0px ${themeVars.color.gray300}`,
});

export const userProfileSection = style({
  position: 'relative',
});

export const userContent = style({
  width: '100%',
  display: 'flex',
  padding: '3.2rem 1.6rem 2.4rem 1.6rem',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.6rem',
});

export const addImageContainer = style({
  position: 'absolute',
  bottom: '0',
  right: '0',
  display: 'flex',
  width: '3.5rem',
  height: '3.5rem',
  borderRadius: '90px',
  backgroundColor: themeVars.color.white,
  padding: '0.8rem',
  alignItems: 'center',
  cursor: 'pointer',
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
