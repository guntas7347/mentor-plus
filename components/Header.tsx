"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Sun, Moon, LogOut, Home } from "lucide-react";
import Link from "next/link";

// Helper to get initials if the user doesn't have a profile image
function getInitials(name?: string | null) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export default function Header() {
  const { data: session } = useSession();
  const [isDark, setIsDark] = useState(false);

  // Check initial theme state on mount
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="h-16 glass-nav border-b border-outline-variant/30 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between bg-surface/80 backdrop-blur-md dark:bg-[#121c28]/80">
      <div>
        <h2 className="text-xl font-headline font-bold text-on-surface dark:text-white">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {" "}
        <Link
          href="/"
          className="p-2 sm:px-3 sm:py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20 text-on-surface-variant dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center gap-2"
          title="Sign Out"
        >
          <Home size={18} />
          <span className="hidden sm:block text-sm font-bold">Go to Home</span>
        </Link>{" "}
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-surface-variant dark:hover:bg-white/10 text-on-surface-variant dark:text-gray-300 transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        {/* Divider */}
        <div className="w-px h-6 bg-outline-variant/30 dark:bg-white/10 mx-1 hidden sm:block"></div>
        {/* User Profile Info */}
        <div className="flex items-center gap-3 pl-1 sm:pl-0">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-primary/10 dark:bg-[#1a56db]/20 border border-primary/20 dark:border-white/10 flex items-center justify-center text-primary dark:text-[#b5c4ff] font-bold text-sm shrink-0">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              getInitials(session?.user?.name)
            )}
          </div>
          <span className="text-sm font-semibold text-on-surface dark:text-white hidden md:block">
            {session?.user?.name?.split(" ")[0] || "User"}
          </span>
        </div>
        {/* Logout Button */}
        <button
          onClick={() => {
            const confirmLogout = confirm("Are you sure you want to logout?");
            if (confirmLogout) {
              signOut({ callbackUrl: "/" });
            }
          }}
          className="p-2 sm:px-3 sm:py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20 text-on-surface-variant dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center gap-2"
          title="Sign Out"
        >
          <LogOut size={18} />
          <span className="hidden sm:block text-sm font-bold">Logout</span>
        </button>
      </div>
    </header>
  );
}
