import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const basicContainer = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '5.2rem',
  alignSelf: 'stretch',
});

export const fieldContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '1.2rem',
});

export const fieldNameLabel = style({
  color: themeVars.color.gray900,
  ...themeVars.fontStyles.head2_b_16,
});

export const birthdateContainer = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const birthInputContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8em',
});

export const birthdateInput = style({
  width: '9rem',
});

export const birthdateLabel = style({
  color: themeVars.color.gray800,
  ...themeVars.fontStyles.body1_m_14,
});

export const buttonContainer = style({
  display: 'flex',
  gap: '0.7rem',
});
