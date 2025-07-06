import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

const slideDown = keyframes({
  '0%': { transform: 'translateY(-100%)', opacity: 0 },
  '100%': { transform: 'translateY(0)', opacity: 1 },
});

const slideUp = keyframes({
  '0%': { transform: 'translateY(100%)', opacity: 0 },
  '100%': { transform: 'translateY(0)', opacity: 1 },
});

export const toastContainerRecipe = recipe({
  base: {
    position: 'absolute',
    display: 'flex',
    width: '34.3rem',
    height: '5.6rem',
    padding: '1.6rem 2.4rem',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1rem',
    borderRadius: '1.2rem',
    background: themeVars.color.gray600,
  },
  variants: {
    position: {
      'top-center': {
        //TODO : 추후에 토스트 기능이 확장되면 구체적인 rem 수치 변경 필요(헤더 크기 고려)
        top: '5rem',
        animationName: slideDown,
        animationDuration: '400ms',
        animationTimingFunction: 'ease-out',
      },
      'bottom-center': {
        bottom: '2.4rem',
        animationName: slideUp,
        animationDuration: '400ms',
        animationTimingFunction: 'ease-out',
      },
    },
  },
  defaultVariants: {
    position: 'bottom-center',
  },
});

export const toastMessage = style({
  ...themeVars.fontStyles.title_sb_16,
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  alignSelf: 'stretch',
  color: themeVars.color.white,
});
