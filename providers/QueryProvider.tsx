"use client";

import { QueryClientProvider, QueryClient } from "react-query";
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default QueryProvider;
