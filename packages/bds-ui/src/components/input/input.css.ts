import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const container = style({
  padding: '1.4rem 2.4rem',
  height: '4.8rem',
  alignItems: 'center',
  background: themeVars.color.gray100,
  borderRadius: '8px',
  transition: 'border 0.01s ease-in-out',
  border: '1px solid transparent',
  selectors: {
    '&:focus-within': {
      border: `1px solid ${themeVars.color.primary500}`,
    },
  },
});

export const inputContent = style({
  width: '100%',
  ...themeVars.fontStyles.body2_r_14,
  color: themeVars.color.gray600,
  outline: 'none',
  background: 'transparent',
  border: 'none',
  selectors: {
    '&:focus::placeholder': {
      color: 'transparent',
    },
  },
});

export const inputFilled = style({
  ...themeVars.fontStyles.body1_m_16,
  color: themeVars.color.gray900,
});
