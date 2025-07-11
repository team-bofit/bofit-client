import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const dropdownWrapper = style({
  position: 'relative',
  width: '100%',
});

export const dropdownContainer = style({
  display: 'flex',
  width: '100%',
  height: '5.6rem',
  padding: '1.6rem 1.6rem 1.6rem 2rem',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '12px',
  border: `1px solid ${themeVars.color.gray100}`,
  backgroundColor: themeVars.color.white,
  cursor: 'pointer',
  userSelect: 'none',
});

export const dropdownContainerOpen = style([
  dropdownContainer,
  {
    border: `1px solid ${themeVars.color.primary300}`,
  },
]);

export const icon = style({
  transition: 'transform 0.3s ease',
});

export const dropdownPlaceholder = style({
  ...themeVars.fontStyles.body2_r_16,
  color: themeVars.color.gray700,
});

export const dropdownList = style({
  position: 'absolute',
  top: '100%',
  marginTop: '0.8rem',
  width: '100%',
  padding: '1.2rem 0',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray200}`,
  borderRadius: '12px',
  zIndex: themeVars.zIndex.base,
  userSelect: 'none',
});

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
