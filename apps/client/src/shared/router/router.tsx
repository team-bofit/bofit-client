import { createBrowserRouter } from 'react-router';

import GlobalLayout from './global-layout';
import { routePath } from './path';
import { protectedRoutes, publicRoutes } from './routes/global-routes';
import { ProtectedRoute } from './routes/protected-route';

export const router = createBrowserRouter([
  {
    path: routePath.HOME,
    element: <GlobalLayout />,
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
