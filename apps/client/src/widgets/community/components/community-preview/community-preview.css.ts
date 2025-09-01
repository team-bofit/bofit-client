import { style } from '@vanilla-extract/css';

export const bottomFloating = style({
  position: 'fixed',
  bottom: '2.4rem',
  right: '50%',
  transform: 'translateX(199px)',

  '@media': {
    'screen and (max-width: 430px)': {
      right: '1.6rem',
      transform: 'none',
    },
  },
});
