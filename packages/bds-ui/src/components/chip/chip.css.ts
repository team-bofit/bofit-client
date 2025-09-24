import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles/theme.css';

export const chipVariants = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'default',
  },
  variants: {
    variant: {
      round: {},
      square: {},
    },
    size: {
      small: {},
      medium: {},
      large: {},
    },
    active: {
      true: {},
      false: {},
    },
    fontColor: {
      gray800: { color: themeVars.color.gray800 },
      error: { color: themeVars.color.error },
      bofitOrange: { color: themeVars.color.bofitOrange },
      primary600: { color: themeVars.color.primary600 },
    },
    backgroundColor: {
      whiteBackground: { backgroundColor: themeVars.color.whiteBackground },
      primary100: { backgroundColor: themeVars.color.primary100 },
      primary200: { backgroundColor: themeVars.color.primary200 },
    },
  },
  compoundVariants: [
    {
      variants: { variant: 'round', size: 'small' },
      style: {
        padding: '0.4rem 1.2rem',
        borderRadius: '50px',
        gap: '0.6rem',
        ...themeVars.fontStyles.body1_m_12,
      },
    },
    {
      variants: { variant: 'round', size: 'large' },
      style: {
        padding: '1rem 1.2rem',
        borderRadius: '90px',
        gap: '0.6rem',
        ...themeVars.fontStyles.title_sb_14,
      },
    },
    {
      variants: { variant: 'square', size: 'small' },
      style: {
        padding: '0.4rem 1rem',
        borderRadius: '6px',
        gap: '0.2rem',
        ...themeVars.fontStyles.body1_m_12,
      },
    },
    {
      variants: { variant: 'square', size: 'medium' },
      style: {
        padding: '0.4rem 1rem',
        borderRadius: '6px',
        gap: '0.2rem',
        ...themeVars.fontStyles.body1_m_14,
      },
    },
    {
      variants: { active: true },
      style: {
        backgroundColor: themeVars.color.gray800,
        color: themeVars.color.white,
      },
    },
  ],
  defaultVariants: {
    variant: 'round',
    size: 'small',
    active: false,
    fontColor: 'gray800',
    backgroundColor: 'whiteBackground',
  },
});

const baseFlexCenter = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const icon = baseFlexCenter;
export const label = baseFlexCenter;
