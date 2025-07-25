import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const container = style({
  borderRadius: '8px',
  width: '100%',
  backgroundColor: themeVars.color.whiteBackground,
  padding: '1.2rem 1.6rem 1.6rem 0.4rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const topContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  alignSelf: 'stretch',
});

export const icon = style({
  display: 'flex',
  width: '2.4rem',
  height: '2.4rem',
  justifyContent: 'center',
  alignItems: 'center',
});

export const reason = style({
  ...themeVars.fontStyles.title_sb_16,
  color: themeVars.color.gray800,
});

export const bottomContainer = style({
  display: 'flex',
  paddingLeft: '2.2rem',
  flexDirection: 'column',
  gap: '0.4rem',
  alignItems: 'flex-start',
});

export const description = style({
  display: 'flex',
  flexDirection: 'row',
  paddingLeft: '0.6rem',
  gap: '0.6rem',
  color: themeVars.color.gray800,
  ...themeVars.fontStyles.body2_r_14,
});
