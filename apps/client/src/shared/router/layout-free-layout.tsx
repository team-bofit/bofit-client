import { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import { noRootShadow } from '@bds/ui/styles';

export default function layoutFreeLayout() {
  return (
    <div className={noRootShadow}>
      <Suspense>
        <Outlet />
        <ScrollRestoration />
      </Suspense>
    </div>
  );
}
