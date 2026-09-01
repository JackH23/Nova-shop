"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { useGoogleAuth } from "@/composables/useGoogleAuth";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: {
              credential: string;
            }) => void;
          }) => void;

          renderButton: (
            element: HTMLElement,
            options: {
              type?: string;
              theme?: string;
              size?: string;
              text?: string;
              shape?: string;
              width?: number;
            }
          ) => void;
        };
      };
    };
  }
}

type GoogleButtonProps = {
  text?: string;
};

export default function GoogleButton({
  text = "Continue with Google",
}: GoogleButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  const {
    loading,
    error,
    handleGoogleLogin,
  } = useGoogleAuth();

  const initializeGoogle = () => {
    const clientId =
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (
      !clientId ||
      !window.google ||
      !buttonRef.current
    ) {
      return;
    }

    window.google.accounts.id.initialize({
      client_id: clientId,

      callback: (response) => {
        handleGoogleLogin(
          response.credential,
          false
        );
      },
    });

    buttonRef.current.innerHTML = "";

    window.google.accounts.id.renderButton(
      buttonRef.current,
      {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "rectangular",
        width: 339,
      }
    );
  };

  useEffect(() => {
    if (window.google) {
      initializeGoogle();
    }
  }, []);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initializeGoogle}
      />

      <div
        ref={buttonRef}
        className="flex w-full justify-center"
      />

      {loading && (
        <p className="mt-2 text-center text-sm text-slate-500">
          Signing in with Google...
        </p>
      )}

      {error && (
        <p className="mt-2 text-center text-sm text-red-600">
          {error}
        </p>
      )}
    </>
  );
}