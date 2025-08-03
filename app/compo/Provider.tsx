"use client";

import { IKContext } from "imagekitio-react";
import { SessionProvider } from "next-auth/react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

export default function Providers({ children }: { children: React.ReactNode }) {
  if (!urlEndpoint) {
    throw new Error("Missing NEXT_PUBLIC_URL_ENDPOINT");
  }

  return (
    <SessionProvider refetchInterval={5 * 60}>
      <IKContext urlEndpoint={urlEndpoint}>
        {children}
      </IKContext>
    </SessionProvider>
  );
}
