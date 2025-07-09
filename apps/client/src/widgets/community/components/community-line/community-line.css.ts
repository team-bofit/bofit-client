import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const postBody = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '1.2rem 0 1.6rem',
  width: '34.3rem',
  height: '100%',
  borderTop: `1px solid ${themeVars.color.gray100}`,
});

export const inputContent = style({
  width: '100%',
  minHeight: '34.3rem',
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
