import { HomePage } from '../lazy';
import { routePath } from '../path';

export const globalRoutes = [
  {
    path: routePath.ROOT,
    element: <HomePage />,
  },
];
