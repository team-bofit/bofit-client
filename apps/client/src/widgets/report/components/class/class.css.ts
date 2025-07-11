import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  padding: '0.8rem 0',
});

export const unit = style({
  margin: '0 0.4rem 0.4rem 0',
  textAlign: 'right',
  color: themeVars.color.gray600,
  ...themeVars.fontStyles.body2_r_12,
});

export const classContainer = style({
  padding: '0.8rem 0.8rem 0.8rem 1.2rem',
  width: '100%',
  borderRadius: '8px',
  background: themeVars.color.whiteBackground,
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: '0.6fr repeat(5, 1fr)',
  textAlign: 'center',
});

export const classLabel = style({
  color: themeVars.color.gray600,
  ...themeVars.fontStyles.body1_m_12,
});

export const avgLabel = style({
  marginTop: '0.8rem',

  color: themeVars.color.gray700,
  ...themeVars.fontStyles.body1_m_12,
});

export const guaranteeLabel = style({
  marginTop: '0.4rem',

  color: themeVars.color.gray900,
  ...themeVars.fontStyles.body1_m_12,
});

export const avgNumber = style({
  marginTop: '0.6rem',

  color: themeVars.color.gray700,
  ...themeVars.fontStyles.body1_m_14,
});

export const guaranteeNumber = recipe({
  base: {
    marginTop: '0.2rem',
    ...themeVars.fontStyles.title_sb_14,
  },
  variants: {
    type: {
      above: {
        color: themeVars.color.primary500,
      },
      below: {
        color: themeVars.color.error,
      },
    },
  },
});
