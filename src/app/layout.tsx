import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Sidebar from "./components/Sidebar";
import Loading from "./components/Loading";
import { AppLayout } from "./components/layout/Layout";
import { Toaster } from "sonner";
import { DataFilterProvider } from "./context/DataFilterContext";

export const metadata: Metadata = {
  title: "Transaction Explorer Challenge",
  description: "uala challenge",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-y-hidden">
        <main className="flex min-h-screen">
          <Sidebar />
          <DataFilterProvider>
            <Suspense fallback={<Loading />}>
              <div className="relative w-full h-full">
                <AppLayout>{children}</AppLayout>
              </div>
            </Suspense>
          </DataFilterProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
