import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@bds/ui/styles';

export const featureSection = recipe({
  base: {
    backgroundColor: themeVars.color.white,
    padding: '2.4rem 0',
    borderRadius: '24px 24px 0px 0px',

    display: 'flex',
    flexDirection: 'column',
    gap: '2.8rem',
  },
  variants: {
    height: {
      md: {
        minHeight: 'calc(100vh - 474px)',
      },
      lg: {
        height: 'calc(100vh - 422px)',
      },
    },
  },
});

export const communityContainer = style({
  padding: '0 1.6rem',
});

export const titleSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  marginBottom: '0.8rem',
  padding: '0 0.8rem',
});

export const tipTitleSection = style([
  titleSection,
  {
    padding: '0 1.6rem',
  },
]);

export const title = style({
  ...themeVars.fontStyles.head_eb_18,
  color: themeVars.color.gray800,
});

export const indicatorContainer = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '0.8rem',
});

export const slideItem = style({
  width: '200px !important',
});

export const tipList = style({
  padding: '0 1.6rem !important',
  height: '118px !important',
});
