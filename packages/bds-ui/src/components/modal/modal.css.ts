import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const modalContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '30rem',
  height: '17.7rem',
  borderRadius: '2rem',
  background: themeVars.color.whiteBackground,
});

export const modalTitle = style({
  ...themeVars.fontStyles.head2_b_18,
  color: themeVars.color.gray900,
});

export const modalContent = style({
  ...themeVars.fontStyles.body1_m_14,
  color: themeVars.color.gray800,
  textAlign: 'center',
});

export const modlaAction = style({});
