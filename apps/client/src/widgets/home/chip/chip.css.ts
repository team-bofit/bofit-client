import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '1.2rem 1.6rem',
  alignItems: 'center',
  width: '8.2rem',
  gap: '0.8rem',
  borderRadius: '16px',
  background:
    'linear-gradient(180deg, rgba(255, 255, 243, 0.70) 0%, rgba(255, 255, 243, 0.90) 55.29%);',
  boxShadow:
    '-0.5px -0.5px 4px 0px rgba(48, 174, 107, 0.50) inset, 4px 4px 4px 0px rgba(48, 174, 107, 0.50)',
  backdropFilter: 'blur(2px)',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
});

export const title = style({
  ...themeVars.fontStyles.body1_m_14,
  color: themeVars.color.gray900,
  textAlign: 'center',
});

export const statusVariants = recipe({
  base: {
    ...themeVars.fontStyles.head_eb_14,
  },
  variants: {
    status: {
      enough: {
        paddingTop: '0.4rem',
        color: themeVars.color.primary500,
      },
      sufficient: {
        paddingTop: '0.4rem',
        color: themeVars.color.bofitOrange,
      },
      strong: {
        paddingTop: '0.4rem',
        color: themeVars.color.error,
      },
    },
  },
});
