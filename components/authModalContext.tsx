"use client";

import GoogleLoginModal from "@/components/GoogleLoginModal";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState } from "react";

// Define the shape of our context
interface AuthModalContextType {
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined,
);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openLoginModal = () => setIsOpen(true);
  const closeLoginModal = () => setIsOpen(false);

  return (
    <AuthModalContext.Provider value={{ openLoginModal, closeLoginModal }}>
      {children}
      <GoogleLoginModal isOpen={isOpen} onClose={closeLoginModal} />
    </AuthModalContext.Provider>
  );
}

// Custom hook to use the context easily
export function useAuthModal() {
  const { data: session } = useSession();
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return { ...context, session };
}
