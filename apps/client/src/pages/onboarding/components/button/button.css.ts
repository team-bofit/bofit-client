import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const buttonVariants = recipe({
  base: {
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background 0.2s',
    gap: '0.1rem',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: themeVars.color.primary100,
        color: themeVars.color.primary600,
        border: `1px solid ${themeVars.color.primary500}`,
      },
      false: {
        backgroundColor: 'transparent',
        color: themeVars.color.gray500,
        border: `1px solid ${themeVars.color.gray300}`,
      },
    },
    size: {
      sm: {
        width: '10.7rem',
        height: '6.4rem',
      },
      lg: {
        width: '16.8rem',
        height: '5.6rem',
        padding: '1.6rem 2rem',
      },
    },
  },
  defaultVariants: {
    selected: false,
  },
});

export const textVariants = recipe({
  variants: {
    size: {
      sm: {
        ...themeVars.fontStyles.title_sb_16,
      },
      lg: {
        ...themeVars.fontStyles.head2_b_18,
      },
    },
  },
});

export const subText = style({
  ...themeVars.fontStyles.body1_m_12,
});
