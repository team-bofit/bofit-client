import {
  matchPath,
  Outlet,
  ScrollRestoration,
  useLocation,
} from 'react-router-dom';

import { noRootShadow, rootStyle } from '@bds/ui/styles';

import { routePath } from './path';

export default function GlobalLayout() {
  const location = useLocation();
  const isLayoutFree = !!matchPath(
    { path: routePath.MY, end: true },
    location.pathname,
  );
  return (
    <div className={`${isLayoutFree ? noRootShadow : rootStyle}`}>
      <Outlet />
      <ScrollRestoration />
    </div>
  );
}
