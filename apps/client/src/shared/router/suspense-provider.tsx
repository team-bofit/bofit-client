import { ReactNode, Suspense } from 'react';

interface GlobalErrorBoundaryProps {
  children: ReactNode;
}

export function SuspenseProvider({ children }: GlobalErrorBoundaryProps) {
  // @TODO Loading 페이지 구현
  return <Suspense fallback={<>로딩중 ... </>}>{children}</Suspense>;
}
