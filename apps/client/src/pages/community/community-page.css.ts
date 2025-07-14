import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
});

export const emptyPlaceholder = style({
  display: 'flex',
  flex: 1,
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

export const mapCommunityListContainer = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '2.4rem 1.6rem 0',
  gap: '1.6rem',
});
