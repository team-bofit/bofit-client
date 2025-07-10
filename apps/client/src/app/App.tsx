import { ModalContainer, ThemeProvider, ToastContainer } from '@bds/ui';
import { rootStyle } from '@bds/ui/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';

import { GlobalErrorBoundary } from '@shared/router/global-error-boundary.tsx';
import { router } from '@shared/router/router';
import { queryClient } from '@shared/utils/query-client';

function App() {
  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider className={rootStyle}>
          <RouterProvider router={router} />
          <ToastContainer />
          <ModalContainer />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
}

export default App;
