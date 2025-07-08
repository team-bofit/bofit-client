import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const buttonVariants = recipe({
  base: {
    width: '100%',
    height: '6.4rem',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: themeVars.color.gray600,
    cursor: 'pointer',
    transition: 'background 0.2s',
    gap: '0.1rem',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: themeVars.color.primary100,
        border: `1px solid ${themeVars.color.primary500}`,
      },
      false: {
        backgroundColor: 'transparent',
        border: `1px solid ${themeVars.color.gray300}`,
      },
    },
  },
  defaultVariants: {
    selected: false,
  },
});

export const text = style({
  ...themeVars.fontStyles.title_sb_16,
});

export const subText = style({
  ...themeVars.fontStyles.body1_m_12,
});
