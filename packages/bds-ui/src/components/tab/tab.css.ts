import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const tabContainer = style({
  width: '100%',
  position: 'relative',
});

export const tabList = style({
  ...themeVars.fontStyles.title_sb_18,
  color: themeVars.color.gray400,
  padding: '0rem 1.6rem',
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
  border: `1px solid ${themeVars.color.gray900}`,
  borderRadius: '2px',
  transition: 'transform 0.3s ease',
});
