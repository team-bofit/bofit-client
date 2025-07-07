import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  width: '30.3rem',
  paddingTop: '0.8rem',
  flexDirection: 'column',
  alignItems: 'flexStart',
  gap: '0.8rem',
});

export const detailItemText = style({
  ...themeVars.fontStyles.title_sb_16,
});

export const graphExplainContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.2rem',
});

export const guaranteeAmountText = style({
  ...themeVars.fontStyles.body2_r_12,
  color: themeVars.color.gray800,
});

export const graphBar = style({
  height: '0.8rem',
  width: '100%',
  flexShrink: 0,
  borderRadius: '7px',
  backgroundColor: themeVars.color.white,
});

export const graphProgressBar = style({
  backgroundImage: themeVars.color.gradientPrimary,
  height: '0.8rem',
  borderRadius: '7px',
  width: '33.3%',
});

export const averageAmountText = style({
  textAlign: 'center',
  ...themeVars.fontStyles.body2_r_12,
  color: themeVars.color.gray600,
});
