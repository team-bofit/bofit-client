import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const featureSection = style({
  backgroundColor: themeVars.color.white,
  padding: '2.4rem 0',
  borderRadius: '24px 24px 0px 0px',

  display: 'flex',
  flexDirection: 'column',
  gap: '2.8rem',
});

export const communityContainer = style({
  padding: '0 1.6rem',
});

export const sectionTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  marginBottom: '0.8rem',
});

export const title = style({
  ...themeVars.fontStyles.head_eb_18,
  color: themeVars.color.gray800,
});

export const insuranceContainer = style({
  padding: '0 0 0 1.6rem',
});

export const indicatorContainer = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '0.8rem',
});

export const slideItem = style({
  width: '205px !important',
});
