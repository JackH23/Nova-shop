"use client";

import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import GoogleButton from "@/components/auth/GoogleButton";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9ff] px-4 py-10">
      <div className="w-full max-w-[395px] rounded-xl border border-[#d9dbea] bg-white px-7 py-8 shadow-sm">

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Sign In
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back to SaaSPlatform
          </p>
        </div>

        {/* Login form */}
        <LoginForm />

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="whitespace-nowrap text-xs text-slate-500">
            Or continue with
          </span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Google */}
        <GoogleButton text="Google" />

        {/* Register */}
        <div className="mt-7 text-center">
          <p className="text-xs text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-indigo-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}