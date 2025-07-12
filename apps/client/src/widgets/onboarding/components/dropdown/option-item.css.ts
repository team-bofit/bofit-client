import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const dropdownItem = style({
  ...themeVars.fontStyles.body2_r_16,
  color: themeVars.color.gray800,
  padding: '1.2rem',
  cursor: 'pointer',
  selectors: {
    '&:hover:where(:not([data-selected="true"]))': {
      backgroundColor: themeVars.color.whiteBackground,
    },
    '&:not(:disabled):active': {
      backgroundColor: themeVars.color.gray100,
    },
  },
});

export const dropdownItemSelected = style([
  dropdownItem,
  {
    backgroundColor: themeVars.color.primary100,
  },
]);
