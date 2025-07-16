import { createBrowserRouter } from 'react-router';

import ErrorPage from '@shared/pages/error/error';

import GlobalLayout from './global-layout';
import layoutFreeLayout from './layout-free-layout';
import { protectedRoutes, publicRoutes } from './routes/global-routes';
import { layoutFreeRoutes } from './routes/layout-free-routes';
import { ProtectedRoute } from './routes/protected-route';

export const router = createBrowserRouter([
  {
    Component: GlobalLayout,
    ErrorBoundary: ErrorPage,
    children: [
      ...publicRoutes,
      {
        Component: ProtectedRoute,
        children: protectedRoutes,
      },
    ],
  },
  {
    Component: layoutFreeLayout,
    ErrorBoundary: ErrorPage,
    children: layoutFreeRoutes,
  },
]);
