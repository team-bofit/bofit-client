import { createBrowserRouter } from 'react-router';

import { ErrorPage } from '@shared/components/error-boundary/error-page';

import GlobalLayout from './global-layout';
import { protectedRoutes, publicRoutes } from './routes/global-routes';
import { ProtectedRoute } from './routes/protected-route';

export const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    errorElement: <ErrorPage />,
    children: [
      // 공개 라우트
      ...publicRoutes,
      // 인증이 필요한 라우트
      {
        element: <ProtectedRoute />,
        children: protectedRoutes,
      },
    ],
  },
]);
