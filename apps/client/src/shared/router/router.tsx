import { createBrowserRouter } from 'react-router';

import GlobalLayout from './global-layout';
import { routePath } from './path';
import { globalRoutes } from './routes/global-routes';

export const router = createBrowserRouter([
  {
    path: routePath.LAYOUT,
    element: <GlobalLayout />,
    children: [...globalRoutes],
  },
]);
