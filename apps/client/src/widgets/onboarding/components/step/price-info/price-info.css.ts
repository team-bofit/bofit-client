import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const priceContainer = style({
  marginBottom: '17.8rem',
});

export const titleContainer = style({
  margin: '2.7rem auto 4.8rem 1.6rem',
});

export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  margin: '4.8rem 1.6rem auto 1.6rem',
  gap: '3.7rem',
});

export const textContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const sliderLabel = style({
  color: themeVars.color.gray800,
  ...themeVars.fontStyles.title_sb_16,
});

export const sliderValue = style({
  color: themeVars.color.primary500,
  ...themeVars.fontStyles.title_sb_16,
});

export const sliderContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

export const nextButtonContainer = style({
  position: 'fixed',
  bottom: 0,

  maxWidth: '43rem',
  width: '100vw',

  padding: '0 1.6rem 2.4rem',
});
