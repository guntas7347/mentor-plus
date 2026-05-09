"use client";

import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const GoogleLoginButton = ({
  loading = false,
  ...props
}: {
  loading?: boolean;
} & React.ComponentProps<"button">) => {
  return (
    <button
      {...props}
      disabled={loading}
      className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:shadow transition-all active:scale-95 hover:cursor-pointer"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>

      {loading ? (
        <>
          <Loader2 className="animate-spin" />
        </>
      ) : (
        "Continue with Google"
      )}
    </button>
  );
};

const GoogleLoginModal = ({
  isOpen = false,
  onClose,
}: {
  isOpen?: boolean;
  onClose: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleClick = async () => {
    try {
      setLoading(true);
      await signIn("google");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: "100%", opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "100%", opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl w-full max-w-md p-8 sm:p-10 relative z-10 overflow-hidden border border-slate-100"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all active:scale-90"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            <div className="text-center pt-4">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
              </div>

              <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-slate-500 mb-10 text-base font-medium">
                Sign in to save your favorite homes and manage your listings.
              </p>

              <div className="space-y-4">
                <GoogleLoginButton
                  onClick={handleGoogleClick}
                  loading={loading}
                />
              </div>

              <p className="mt-8 text-xs text-slate-400 font-medium px-4">
                By continuing, you agree to our{" "}
                <a href="#" className="text-slate-600 underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-slate-600 underline">
                  Privacy Policy
                </a>
              </p>
            </div>

            {/* Decorative element for mobile bottom sheet */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-100 rounded-full sm:hidden" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GoogleLoginModal;
