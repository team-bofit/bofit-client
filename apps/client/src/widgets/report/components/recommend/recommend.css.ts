import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  borderRadius: '8px',
  width: '100%',
  backgroundColor: themeVars.color.whiteBackground,
  padding: '1.2rem 0.8rem 1.6rem 0.4rem',
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
  flexShrink: 0,
});

export const reason = style({
  ...themeVars.fontStyles.title_sb_16,
  color: themeVars.color.gray800,
});

export const bottomContainer = style({
  display: 'flex',
  paddingLeft: '2.6rem',
  flexDirection: 'column',
  gap: '0.4rem',
  alignItems: 'flex-start',
});

export const description = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '0.5em',
  color: themeVars.color.gray800,
  ...themeVars.fontStyles.body2_r_14,
});
