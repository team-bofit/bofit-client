import { Outlet, ScrollRestoration } from 'react-router-dom';

import { noRootShadow } from '@bds/ui/styles';

export default function layoutFreeLayout() {
  return (
    <div className={noRootShadow}>
      <Outlet />
      <ScrollRestoration />
    </div>
  );
}
