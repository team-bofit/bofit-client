import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@bds/ui/styles';

export const container = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.8rem 0',
    gap: '0.4rem',
  },
  variants: {
    isEditingReply: {
      true: {
        borderRadius: '1.2rem',
        border: `1px solid ${themeVars.color.primary500}`,
      },
      false: {},
    },
  },
});

export const userInfoContainer = style({
  display: 'flex',
  padding: '0 1.6rem',
  justifyContent: 'space-between',
});

export const leftContainer = style({
  display: 'flex',
  gap: '0.6rem',
});

export const userInfo = style({
  display: 'flex',
  gap: '1.2rem',
});

export const nickName = style({
  ...themeVars.fontStyles.title_sb_16,
  color: themeVars.color.gray800,
});

export const createdAt = style({
  ...themeVars.fontStyles.body1_m_12,
  color: themeVars.color.gray600,
});

export const iconButtonContainer = style({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '6.6rem',
});

export const commentContainer = style({
  padding: '0 3.4rem',
});

export const comment = style({
  ...themeVars.fontStyles.body1_m_16,
  color: themeVars.color.gray900,
});

export const imageContainer = style({
  padding: '0 2.8rem',
});

export const replyImage = style({
  width: '100%',
  borderRadius: '1.2rem',
});
