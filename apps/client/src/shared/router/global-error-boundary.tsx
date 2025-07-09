import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorPage } from '@shared/components/error-page.tsx';

interface GlobalErrorBoundaryProps {
  children: ReactNode;
}

export function GlobalErrorBoundary({ children }: GlobalErrorBoundaryProps) {
  // @TODO Loading 페이지 구현
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <Suspense fallback={<>로딩중 ... </>}>{children}</Suspense>
    </ErrorBoundary>
  );
}
