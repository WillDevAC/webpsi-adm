"use client";

import React from "react";

import { Toaster } from "@/components/ui/toaster";

import { QueryClient, QueryClientProvider } from "react-query";

export default function Providers({ children }: any) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster/>
        {children}
      </QueryClientProvider>
    </>
  );
}
