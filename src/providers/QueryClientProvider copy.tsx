/* eslint-disable @typescript-eslint/no-explicit-any */
// In Next.js, this file would be called: app/providers.jsx => https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000, // refetch after 1 min

        retry: (failureCount, error: any) => {
          // console.log("failureCount :", failureCount);
          // console.log("error in react-query provider :", error);

          // برای درخواست های غیر از گت ریترای نمیکند
          const method = error?.config?.method;
          if (method && method.toLowerCase() !== "get") {
            return false;
          }

          // اگر خطا 401 باشد، یبار ریترای کن
          // اگر ریترای 0  باشه وقتی چند تا ریکویست همزمان داریم باعث میشه که فقط اولین درخواست ریکال بشه و مابقی درخواست ها رها خواهند شد.
          if (error?.response?.status === 401 && failureCount === 1) {
            return false;
          }
          // برای خطاهای دیگر، تا 2 بار ریترای کن
          return failureCount < 2;
        },
        retryOnMount: true,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000), // تاخیر بین ریترای‌ها - نهایت فاصله بین ریترای ها 5 ثانیه باشد
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}