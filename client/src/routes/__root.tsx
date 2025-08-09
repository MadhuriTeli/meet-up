import { useState } from "react";
// import Navbar from "./features/shared/components/Navbar";
import Navbar from "../features/shared/components/Navbar";
import ThemeProvider from "../features/shared/components/ThemeProvider";
import { Toaster } from "../features/shared/components/ui/Toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { trpcQueryUtils } from "@/router";

type RouterAppContext = {
    trpcQueryUtils: typeof trpcQueryUtils;
}


export const Route = createRootRouteWithContext<RouterAppContext>()({
    component:Root,
})

export function Root() {

    return (
        <>
                    <ThemeProvider defaultTheme="dark">
                        <Toaster />
                        <div className="flex justify-center gap-8 pb-8">
                            <Navbar />
                            <div className="min-h-screen w-full max-w-2xl">
                                <header className="mb-4 border-b border-neutral-200 p-4 dark:border-neutral-800">
                                    <h1 className="text-center text-xl font-bold">
                                       MeetUp
                                    </h1>
                                </header>
                                    <Outlet />
                            </div>
                        </div>
                    </ThemeProvider>
        </>
    );
}


