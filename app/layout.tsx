"use client";

import "./globals.css";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Providers from "./compo/Provider";
import Header from "./compo/Headers";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/logout");

  const isFullScreenPage = isAuthPage || pathname.startsWith("/upload");

  return (
    <html lang="en">
      <body className="min-h-screen w-screen overflow-x-hidden">
        <Providers>
          {!isAuthPage && <Header />}
          {isFullScreenPage ? (
            <main className="min-h-screen w-screen bg-white">
              {children}
            </main>
          ) : (
            <main className="p-6">{children}</main>
          )}
        </Providers>
      </body>
    </html>
  );
}
