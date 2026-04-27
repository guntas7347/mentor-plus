"use client";

import { getSessionUser } from "@/lib/auth";
import { notify } from "@/lib/toast";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback");

  const testFrwd = callback ? `/${callback}` : "/dashboard/profile";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const session = await getSessionUser();
      if (session) {
        if (session.role === "ADMIN") {
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard/my-purchases");
        }
      } else setLoading(false);
    })();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      await signIn("google", {
        callbackUrl: testFrwd,
      });
    } catch (error) {
      notify.error("Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary dark:bg-gray-900">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-primary dark:text-white mb-6">
          Login
        </h1>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
            </>
          ) : (
            "Continue with Google"
          )}
        </button>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
          Secure authentication powered by Google
        </p>
      </div>
    </div>
  );
}
