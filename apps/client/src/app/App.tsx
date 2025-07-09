import { ModalContainer, ThemeProvider, ToastContainer } from '@bds/ui';
import { rootStyle } from '@bds/ui/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';

import { router } from '@shared/router/router';
import { queryClient } from '@shared/utils/query-client';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider className={rootStyle}>
        <ToastContainer />
        <ModalContainer />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
