import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';

import { ModalContainer, ToastContainer } from '@bds/ui';

import { GlobalErrorBoundary } from '@shared/router/global-error-boundary.tsx';
import { router } from '@shared/router/router';
import { queryClient } from '@shared/utils/query-client';

function App() {
  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
        <ModalContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
}

export default App;
