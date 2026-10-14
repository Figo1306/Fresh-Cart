"use client";
import { AppStore, CreateStore, preloadedState } from "@/app/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { Children, ReactNode, useRef, useState } from "react";
import { Provider } from "react-redux";

export default function Providers({
  children,
  preloadedState,
}: {
  children: ReactNode;
  preloadedState: preloadedState;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000 * 5,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const storeRef = useRef<null | AppStore>(null);
  if (storeRef.current == null) {
    storeRef.current = CreateStore(preloadedState);
  }

  return (
    <>
      <Provider store={storeRef.current}>
        <QueryClientProvider client={queryClient}>
          {children}

          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </QueryClientProvider>
      </Provider>
    </>
  );
}
