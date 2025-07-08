import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '@shared/components/error-boundary-fallback.tsx';

interface GlobalErrorBoundaryProps {
  children: ReactNode;
}

export function GlobalErrorBoundary({ children }: GlobalErrorBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {/* @TODO 로딩 컴포넌트 연결 */}
      <Suspense fallback={<>로딩중 ... </>}>{children}</Suspense>
    </ErrorBoundary>
  );
}
