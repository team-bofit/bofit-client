export const routePath = {
  LAYOUT: '/',
  ROOT: '/',
} as const;

export type Routes = (typeof routePath)[keyof typeof routePath];
