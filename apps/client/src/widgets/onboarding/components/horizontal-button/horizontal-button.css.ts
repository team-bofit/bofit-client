import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@bds/ui/styles';

export const table = style({
  width: '100%',
  gap: '1.4rem',
  display: 'flex',
  flexDirection: 'column',
  padding: '0 1.6rem',
});

export const button = recipe({
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2rem 1.6rem 2rem 1.6rem',
    textAlign: 'left',
    height: '6.4rem',
    width: '100%',
    border: `1px solid ${themeVars.color.gray300}`,
    backgroundColor: 'transparent',
    borderRadius: '12px',
    color: themeVars.color.gray500,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  variants: {
    selected: {
      true: {
        border: `1px solid ${themeVars.color.primary500}`,
        backgroundColor: themeVars.color.primary100,
        color: themeVars.color.primary600,
        transition: 'background-color 0.3s ease',
      },
      false: {},
    },
  },
});

export const selected = style({
  border: `1px solid ${themeVars.color.primary500}`,
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
  padding: '0.1rem 0.6rem 0.1rem 0.5rem',
  color: themeVars.color.primary600,
  ...themeVars.fontStyles.head_eb_20,
});
