import { Suspense } from 'react';
import { matchPath, Outlet, useLocation } from 'react-router-dom';

import { ThemeProvider } from '@bds/ui';
import { noRootShadow, rootStyle } from '@bds/ui/styles';

import { routePath } from './path';

export default function GlobalLayout() {
  const location = useLocation();
  const isLayoutFree = matchPath(routePath.MY, location.pathname);
  return (
    <ThemeProvider
      className={`${rootStyle} ${isLayoutFree ? noRootShadow : ''}`}
    >
      <Suspense>
        <Outlet />
      </Suspense>
    </ThemeProvider>
  );
}
