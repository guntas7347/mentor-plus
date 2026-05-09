"use client";

import { AuthModalProvider } from "@/components/authModalContext";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthModalProvider>{children}</AuthModalProvider>
      <Toaster />
    </SessionProvider>
  );
}
