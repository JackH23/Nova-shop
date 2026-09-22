"use client";

import { usePathname } from "next/navigation";

import Navbar from "./Navbar";
import Footer from "./Footer";

import { AuthModalProvider } from "@/components/shared/auth/AuthModalProvider";

const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/verify-email",
  "/verify-reset-code",
  "/reset-password",
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage = authRoutes.some((route) =>
    pathname.startsWith(route),
  );

  return (
    <AuthModalProvider>
      <div className="flex min-h-screen flex-col">
        {/* Hide Navbar on auth pages */}
        {!isAuthPage && <Navbar />}

        <main className="flex-1">
          {children}
        </main>

        {/* Hide Footer on auth pages */}
        {!isAuthPage && <Footer />}
      </div>
    </AuthModalProvider>
  );
}