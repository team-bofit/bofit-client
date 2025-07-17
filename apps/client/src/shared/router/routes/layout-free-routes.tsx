import { HomePage, MyPage } from '@shared/router/lazy.ts';

import { routePath } from '../path';

export const layoutFreeRoutes = [
  {
    path: routePath.MY,
    Component: MyPage,
  },
  {
    path: routePath.HOME,
    Component: HomePage,
  },
];
