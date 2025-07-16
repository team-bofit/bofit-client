import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@bds/ui/styles';

export const table = style({
  width: '100%',
});

export const button = recipe({
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '-0.1rem',
    padding: '2rem 1.2rem 2rem 1.6rem',
    textAlign: 'left',

    height: '6.4rem',
    width: '100%',

    borderBlock: `1px solid ${themeVars.color.gray100}`,

    color: themeVars.color.gray600,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  variants: {
    selected: {
      true: {
        position: 'relative',
        marginTop: '-0.1rem',

        borderBlock: `1px solid ${themeVars.color.primary500}`,

        backgroundColor: themeVars.color.primary100,
        color: themeVars.color.primary600,
        transition: 'background-color 0.3s ease',
      },
      false: {},
    },
  },
});

export const selected = style({
  position: 'relative',
  marginTop: '-0.1rem',

  borderBlock: `1px solid ${themeVars.color.primary500}`,

  backgroundColor: themeVars.color.primary100,
  color: themeVars.color.primary600,
  transition: 'background-color 0.3s ease',
});

export const label = style({
  alignItems: 'center',
  ...themeVars.fontStyles.title_sb_16,
});

export const order = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.1rem 0.6rem',

  color: themeVars.color.primary600,
  ...themeVars.fontStyles.head_eb_20,
});
