import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
});

export const subTitle = style({
  marginBottom: '0.8rem',
  color: themeVars.color.primary500,
  ...themeVars.fontStyles.title_sb_14,
});

export const title = style({
  color: themeVars.color.gray900,
  ...themeVars.fontStyles.head_eb_24,
  whiteSpace: 'pre-wrap',
});
export const imageContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20.5rem',
  height: '20.5rem',
});

export const image = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});
