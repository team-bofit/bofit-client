import { style, styleVariants } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const contentDivider = style({
  width: '100%',
  display: 'flex',
  paddingBottom: '0.8rem',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2rem',
  borderBottom: `1px solid ${themeVars.color.gray100}`,
});

export const titleContentGap = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1.2rem',
});

export const contentBottomContainer = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: '0.8rem',
});

export const commentContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});

export const contentText = styleVariants({
  medium: {
    ...themeVars.fontStyles.body1_m_12,
    color: themeVars.color.gray600,
  },
  large: { ...themeVars.fontStyles.body1_m_14, color: themeVars.color.gray600 },
});
