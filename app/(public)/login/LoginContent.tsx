"use client";

import GoogleLoginButton from "@/components/GoogleLoginButton";
import { notify } from "@/lib/toast";
import { Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const callback = searchParams.get("callback");

  // Track the manual button click loading state
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const redirectUrl = callback ? `/${callback}` : "/dashboard/profile";

  // 1. Handle side-effects (redirects and notifications) safely inside useEffect
  useEffect(() => {
    // If already logged in, push to dashboard
    if (status === "authenticated") {
      router.push(redirectUrl);
    }

    // Capture OAuth errors returning from Google via URL params to trigger notify
    const error = searchParams.get("error");
    if (error) {
      notify.error("Authentication failed. Please try again.");
    }
  }, [status, router, redirectUrl, searchParams]);

  const handleGoogleLogin = async () => {
    try {
      setIsLoggingIn(true);
      // Initiate Google OAuth flow
      await signIn("google", { callbackUrl: redirectUrl });
      notify.success("Welcome Back");
    } catch (error) {
      // This catches local initialization errors before redirection
      notify.error("Could not reach the authentication server.");
      setIsLoggingIn(false);
    }
  };

  // 2. Prevent UI flickering by showing a full-screen loader while NextAuth checks the session
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary dark:bg-gray-900">
        <Loader2 className="animate-spin text-white dark:text-gray-400 w-8 h-8" />
      </div>
    );
  }

  // 3. Do not render the login form if we are redirecting an authenticated user
  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-primary dark:text-white mb-6">
          Login
        </h1>

        <GoogleLoginButton onClick={handleGoogleLogin} loading={isLoggingIn} />

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
          Secure authentication powered by Google
        </p>
      </div>
    </div>
  );
}
