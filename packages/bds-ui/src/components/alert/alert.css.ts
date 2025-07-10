import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const alertContainer = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    width: '100%',
    whiteSpace: 'pre-wrap',
  },
  variants: {
    type: {
      info: {
        padding: '1.6rem',
        backgroundColor: themeVars.color.gray100,
      },
      additional: {
        borderRadius: '8px',
        padding: '1rem 0.8rem',
        backgroundColor: themeVars.color.whiteBackground,
      },
    },
  },
});

export const alerIconContainer = recipe({
  base: {
    display: 'flex',
    alignContent: 'center',
  },
  variants: {
    type: {
      info: {
        gap: '0.8rem',
      },
      additional: {
        gap: '0.6rem',
      },
    },
  },
});

export const alertHeader = style({
  color: themeVars.color.primary500,
  ...themeVars.fontStyles.head2_b_14,
  display: 'flex',
  alignItems: 'center',
});

export const alertContentsContainer = style({
  display: 'flex',
  gap: '0.1rem',
});

export const alertContentsHighlight = style({
  ...themeVars.fontStyles.head_eb_14,
  color: themeVars.color.gray900,
});

export const alertContents = recipe({
  variants: {
    type: {
      info: {
        ...themeVars.fontStyles.body2_r_12,
        color: themeVars.color.primary900,
      },
      additional: {
        ...themeVars.fontStyles.body1_m_14,
        color: themeVars.color.gray800,
      },
    },
  },
});
