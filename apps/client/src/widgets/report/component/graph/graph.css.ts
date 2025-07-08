import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  width: '100%',
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
  width: '100%',
});

export const textContainer = recipe({
  base: {
    display: 'flex',
    position: 'relative',
  },
  variants: {
    value: {
      below: { width: '33.3%' },
      average: { width: '50%' },
      above: { width: '66.6%' },
    },
  },
});

export const guaranteeAmountText = style({
  ...themeVars.fontStyles.body2_r_12,
  color: themeVars.color.gray800,
});

export const currentAmount = style({
  position: 'absolute',
  right: '0',
  transform: 'translateX(50%)',
  ...themeVars.fontStyles.body1_m_12,
  color: themeVars.color.gray900,
});

export const graphBar = style({
  height: '0.8rem',
  width: '100%',
  flexShrink: 0,
  borderRadius: '7px',
  backgroundColor: themeVars.color.gray100,
});

export const graphProgressBar = recipe({
  base: {
    backgroundImage: themeVars.color.gradientPrimary,
    height: '0.8rem',
    borderRadius: '7px',
  },
  variants: {
    value: {
      below: { width: '33.3%', backgroundImage: themeVars.color.gradientError },
      average: { width: '50%' },
      above: { width: '66.6%' },
    },
  },
});

export const averageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const dot = style({
  width: '0.4rem',
  height: '0.4rem',
  borderRadius: '99px',
  backgroundColor: themeVars.color.gray600,
});

export const averageAmount = style({
  textAlign: 'center',
  ...themeVars.fontStyles.body2_r_12,
  color: themeVars.color.gray600,
});
