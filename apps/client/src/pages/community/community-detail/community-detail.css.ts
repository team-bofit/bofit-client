import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '2.4rem 1.6rem 0 1.6rem',
  gap: '1.6rem',
});

export const topContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  paddingBottom: '2rem',
  borderBottom: `2px solid ${themeVars.color.gray100}`,
});

export const postContentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const commentMapContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

export const commentInfo = style({
  display: 'flex',
  gap: '0.4rem',
  alignItems: 'center',
});

export const commentNum = style({
  ...themeVars.fontStyles.head2_b_16,
  color: themeVars.color.gray800,
});

export const commentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  // height: 'calc(100svh - 50rem)',
  //content가 없을 때 EmptyPlaceholder 컴포넌트의 위치 조절을 위함 그러나 댓글이 가려지는 이슈로 잠시 주석처리
  marginBottom: '9.6rem',
});

export const emptyPlaceholder = style({
  display: 'flex',
  flex: 1,
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});
