"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import { useAuthModal } from "@/composables/useAuthModal";
import AuthModalManager from "./AuthModalManager";

type AuthContextType = ReturnType<typeof useAuthModal>;

const AuthContext = createContext<AuthContextType | null>(
  null,
);

export function AuthModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const auth = useAuthModal();

  return (
    <AuthContext.Provider value={auth}>
      {children}

      <AuthModalManager auth={auth} />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthModalProvider",
    );
  }

  return context;
}