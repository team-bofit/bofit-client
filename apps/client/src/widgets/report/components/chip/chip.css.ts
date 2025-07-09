import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  backgroundColor: themeVars.color.whiteBackground,
  width: '4.1rem',
  height: '2.5rem',
  borderRadius: '6px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const chipText = recipe({
  base: {
    ...themeVars.fontStyles.body1_m_12,
  },
  variants: {
    status: {
      strong: { color: themeVars.color.error },
      enough: { color: themeVars.color.primary500 },
      sufficient: { color: themeVars.color.bofitOrange },
    },
  },
});
