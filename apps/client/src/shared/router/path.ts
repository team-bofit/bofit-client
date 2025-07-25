export const routePath = {
  SPLASH: '/splash',
  COMMUNITY: '/community',
  COMMUNITY_WRITE: '/community/write',
  COMMUNITY_EDIT: '/community/edit/:postId',
  COMMUNITY_DETAIL: '/community/detail/:postId',
  LOGIN: '/login',
  ONBOARDING: '/onboarding',
  MY: '/my',
  REPORT: '/report',
  LOGIN_FALLBACK: '/login-fallback',
  HOME: '/',
} as const;

export type Routes = (typeof routePath)[keyof typeof routePath];
