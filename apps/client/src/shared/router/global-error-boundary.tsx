import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Loading from '@shared/components/loading/loading';
import ErrorPage from '@shared/pages/error/error.tsx';

interface GlobalErrorBoundaryProps {
  children: ReactNode;
}

export function GlobalErrorBoundary({ children }: GlobalErrorBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
