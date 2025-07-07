export const routePath = {
  LAYOUT: '/',
  ROOT: '/',
  LOGIN: '/login',
} as const;

export type Routes = (typeof routePath)[keyof typeof routePath];
