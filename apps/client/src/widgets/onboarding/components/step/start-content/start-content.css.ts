import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 100px)',
  padding: 'clamp(2.4rem, 12vw, 6.4rem) 1.6rem 11.9rem',
});

export const imageContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export const title = style({
  marginBottom: '0.8rem',
  whiteSpace: 'pre-wrap',
  color: themeVars.color.gray900,
  ...themeVars.fontStyles.head_eb_24,
});

export const message = style({
  marginBottom: 'clamp(2.4rem, 16vw, 7.6rem)',
  whiteSpace: 'pre-wrap',
  color: themeVars.color.gray700,
  ...themeVars.fontStyles.body2_r_14,
});

export const image = style({
  width: '28rem',
  margin: '0 auto',
});

export const buttonContainer = style({
  position: 'fixed',
  bottom: 0,

  maxWidth: '43rem',
  width: '100vw',
  display: 'flex',

  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 1.6rem 2.4rem',
  gap: '1.6rem',
});
