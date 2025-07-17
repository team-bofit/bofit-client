import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const tabContainer = recipe({
  base: {
    width: '100%',
    position: 'relative',
  },
  variants: {
    backgroundColor: {
      white: {
        backgroundColor: themeVars.color.white,
      },
      white_bg: {
        backgroundColor: themeVars.color.whiteBackground,
      },
    },
  },
  defaultVariants: {
    backgroundColor: 'white',
  },
});

export const tabList = style({
  ...themeVars.fontStyles.title_sb_18,
  color: themeVars.color.gray400,
  padding: '0 1.6rem',
  display: 'flex',
  gap: '1rem',
  width: '100%',
  height: '4rem',
  justifyContent: 'space-around',
});

export const tabItem = recipe({
  base: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '0.25rem',
    cursor: 'pointer',
  },
  variants: {
    selected: {
      true: {
        ...themeVars.fontStyles.head_eb_18,
        color: themeVars.color.gray900,
      },
    },
  },
});

export const tabLine = style({
  position: 'absolute',
  top: '3.7rem',
  width: '5rem',
  margin: '0',
  border: `2px solid ${themeVars.color.gray900}`,
  borderRadius: '2px',
  transition: 'transform 0.3s ease',
});
