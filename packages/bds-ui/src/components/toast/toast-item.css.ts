import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

const toastEnterFromTop = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-100%)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const toastExitToTop = keyframes({
  '0%': { opacity: 1, transform: 'translateY(0)' },
  '100%': { opacity: 0, transform: 'translateY(-100%)' },
});

const toastEnterFromBottom = keyframes({
  '0%': { opacity: 0, transform: 'translateY(100%)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const toastExitToBottom = keyframes({
  '0%': { opacity: 1, transform: 'translateY(0)' },
  '100%': { opacity: 0, transform: 'translateY(100%)' },
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
        top: '5rem',
      },
      'bottom-center': {
        bottom: '2.4rem',
      },
    },
    animation: {
      enter: {},
      exit: {},
    },
  },
  compoundVariants: [
    {
      variants: { position: 'top-center', animation: 'enter' },
      style: {
        animation: `${toastEnterFromTop} 400ms ease-out forwards`,
      },
    },
    {
      variants: { position: 'top-center', animation: 'exit' },
      style: {
        animation: `${toastExitToTop} 400ms ease-in forwards`,
      },
    },
    {
      variants: { position: 'bottom-center', animation: 'enter' },
      style: {
        animation: `${toastEnterFromBottom} 400ms ease-out forwards`,
      },
    },
    {
      variants: { position: 'bottom-center', animation: 'exit' },
      style: {
        animation: `${toastExitToBottom} 400ms ease-in forwards`,
      },
    },
  ],
  defaultVariants: {
    position: 'bottom-center',
    animation: 'enter',
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
