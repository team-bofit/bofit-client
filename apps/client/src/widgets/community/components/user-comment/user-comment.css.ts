import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@bds/ui/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const userInfoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '1.2rem 1.6rem',
  borderRadius: '12px',
  width: '100%',
  gap: '0.4rem',
  backgroundColor: themeVars.color.whiteBackground,
});

export const replyButtonContainer = style({
  paddingLeft: '1.6rem',
});

export const replyContainer = style({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
});

export const reply = style({
  ...themeVars.fontStyles.body1_m_12,
  color: themeVars.color.gray800,
});

export const iconRotate = recipe({
  base: {
    transition: 'transform 0.1s ease-in-out',
  },
  variants: {
    rotated: {
      true: {
        transform: 'rotate(-180deg)',
      },
      false: {
        transform: 'rotate(0deg)',
      },
    },
  },
  defaultVariants: {
    rotated: false,
  },
});
