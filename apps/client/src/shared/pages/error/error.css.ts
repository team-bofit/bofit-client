import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const errorContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  paddingBottom: '3.5rem',
});

export const errorImage = style({
  width: '100%',
  maxWidth: '27rem',
  marginRight: '1rem',
});

export const errorTitle = style({
  ...themeVars.fontStyles.head2_b_24,
  color: themeVars.color.primary500,
  marginTop: '3.6rem',
});

export const errorDescription = style({
  ...themeVars.fontStyles.body1_m_16,
  color: themeVars.color.gray700,
  whiteSpace: 'pre-wrap',
  margin: '2.4rem 0 4rem 0',
  textAlign: 'center',
});

export const buttonWrapper = style({
  width: '16.7rem',
});
