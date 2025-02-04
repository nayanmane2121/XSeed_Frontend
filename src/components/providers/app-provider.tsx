
"use client";
// provider.tsx
import { makeServer } from "@/mirage/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "react-hot-toast";
import { useMockData } from "@/config";
import React, { useEffect } from "react";
import useConfiguration from "@/hooks/configuration/useConfiguration";

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  // Fetch configuration for query caching and refetching behavior
  const queryCacheTime = useConfiguration<number>("queryCacheTimeMs");
  const refreshQueriesOnWindowFocus = useConfiguration<boolean>("refreshQueriesOnWindowFocus");

  // Initialize QueryClient
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: refreshQueriesOnWindowFocus,
        staleTime: queryCacheTime,
      },
    },
  });

  // Setup MirageJS server in development
  console.log("MOCK SERVER BEFOERE")
  useEffect(() => {
    if (useMockData) {
      makeServer();
      console.log("MOCK SERVER CREATED")
    }
  }, []);
  // causing page refresh turn off makeserver ---- 

  return (
    <RecoilRoot>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
      <Toaster />
    </RecoilRoot>
  );
};

export default AppProviders;

// How It Works
// Environment Configuration:

// useConfiguration dynamically fetches environment-specific settings based on NEXT_PUBLIC_ENV.
// In development, queries are refetched when the window regains focus, and the cache lasts for 1 minute.
// QueryClient Initialization:

// QueryClient is initialized with refetchOnWindowFocus and cacheTime fetched via useConfiguration.
// MirageJS Mock Server:

// If NEXT_PUBLIC_USE_MOCK_DATA is true, the MirageJS server is set up for local development or testing.
// Server Ready Check:

// Ensures the MirageJS server is ready before rendering the app.
// React Query Integration:

// React Query is used for managing server state efficiently with caching, fetching, and background updates.

