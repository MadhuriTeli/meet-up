import { useState } from "react";
import Navbar from "./features/shared/components/Navbar";
import ThemeProvider from "./features/shared/components/ThemeProvider";
import { Toaster } from "./features/shared/components/ui/Toaster";
import { trpc, trpcClient } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ExperienceList } from "./features/experiences/components/ExperienceList";
import { InfiniteScroll } from "./features/shared/components/InfiniteScroll";

export function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      {" "}
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark">
            <Toaster />
            <div className="flex justify-center gap-8 pb-8">
              <Navbar />
              <div className="min-h-screen w-full max-w-2xl">
                <header className="mb-4 border-b border-neutral-200 p-4 dark:border-neutral-800">
                  <h1 className="text-center text-xl font-bold">
                    Advanced Patterns React
                  </h1>
                  <p className="text-center text-sm text-neutral-500">
                    <b>
                      <span className="dark:text-primary-500">Cosden</span>{" "}
                      Solutions
                    </b>
                  </p>
                </header>
                <div className="space-y-4 p-4">
                  <Index />
                </div>
              </div>
            </div>
          </ThemeProvider>{" "}
        </QueryClientProvider>
      </trpc.Provider>
    </>
  );
}

function Index() {
  const experiencesQuery = trpc.experiences.feed.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  )
  return (
    <InfiniteScroll
      onLoadMore={experiencesQuery.fetchNextPage}>
      <ExperienceList
        experiences={experiencesQuery.data?.pages.flatMap((page) => page.experiences) ?? []}
        isLoading={experiencesQuery.isLoading || experiencesQuery.isFetchingNextPage}
      />
    </InfiniteScroll>);
}
