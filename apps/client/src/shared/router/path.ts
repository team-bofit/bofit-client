export const routePath = {
  SPLASH: '/splash',
  COMMUNITY: '/community',
  COMMUNITY_WRITE: '/community/write',
  COMMUNITY_DETAIL: 'community/detail',
  LOGIN: '/login',
  ONBOARDING: '/onboarding',
  MY: '/my',
  REPORT: '/report',
  LOGIN_FALLBACK: '/login-fallback',
  HOME: '/',
} as const;

export type Routes = (typeof routePath)[keyof typeof routePath];
