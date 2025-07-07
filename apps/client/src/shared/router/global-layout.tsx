import { Suspense } from 'react';
import { Outlet } from 'react-router';

export default function GlobalLayout() {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
}
