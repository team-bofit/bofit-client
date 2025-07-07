import { HomePage } from '../lazy';
import { routePath } from '../path';

export const globalRoutes = [
  {
    path: routePath.HOME,
    element: <HomePage />,
  },
  {
    path: routePath.LOGIN,
    element: <>login</>,
  },
  {
    path: routePath.LOGIN_FALLBACK,
    element: <>LOGIN_FALLBACK</>,
  },
  {
    path: routePath.ONBOARDING,
    element: <>ONBOARDING</>,
  },
  {
    path: routePath.LOGIN,
    element: <>LOGIN</>,
  },
];
