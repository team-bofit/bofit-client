import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const userMetaContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const userMeta = style({
  display: 'flex',
  gap: '1.2rem',
});

export const nickName = style({
  ...themeVars.fontStyles.title_sb_16,
  color: themeVars.color.gray900,
});

export const createdAt = style({
  ...themeVars.fontStyles.body1_m_12,
  color: themeVars.color.gray900,
});

export const button = style({
  display: 'flex',
  gap: '0.8rem',
});
