"use client";

import Link from "next/link";
import { useTheme } from "@/lib/useTheme";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthModal } from "./authModalContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/syllabus", label: "Syllabus" },
  { href: "/test-series", label: "Test Series" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // 1. Add mounted state

  // 2. Destructure 'status' to handle the loading state safely
  const { openLoginModal, session } = useAuthModal();
  const pathname = usePathname();

  // 3. Set mounted to true once the component mounts on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleLogin = () => {
    if (!session) return openLoginModal();
    router.push("/dashboard/profile");
  };

  return (
    <nav className="docked full-width top-0 sticky z-50 bg-surface/80 dark:bg-[#0a0f18]/80 glass-nav border-b border-transparent dark:border-white/5 transition-colors duration-300">
      <div className="flex justify-between items-center w-full px-8 max-w-7xl mx-auto h-20">
        <Link
          href="/"
          className="text-2xl flex items-center gap-2 font-extrabold text-primary dark:text-inverse-primary tracking-tight font-headline"
        >
          <img
            src="/mentorplus-logo.jpg"
            alt="MentorPlus Logo"
            className="w-10 h-10"
          />{" "}
          MentorPlus
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-text-muted dark:text-gray-400 hover:text-primary dark:hover:text-inverse-primary transition-colors font-body text-sm tracking-widest ${
                isActive(href)
                  ? "text-primary dark:text-inverse-primary border-b-2 border-primary dark:border-inverse-primary"
                  : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-surface -high dark:hover:bg-white/10 transition-colors text-text-muted dark:text-gray-400"
            aria-label="Toggle dark mode"
          >
            {/* 4. Only render the theme icon once mounted, otherwise render a placeholder to prevent layout shift */}
            {mounted ? (
              theme === "dark" ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )
            ) : (
              <div className="w-[20px] h-[20px]" />
            )}
          </button>

          <button
            onClick={handleLogin}
            className="hidden md:inline-flex bg-primary dark:bg-primary text-white px-6 py-2.5 rounded-md font-body text-sm tracking-widest active:scale-[0.98] duration-200 transition-all min-w-[100px] justify-center"
          >
            {session ? "Profile" : "Login"}
          </button>

          {/* Hamburger button — mobile only */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-full hover:bg-surface -high dark:hover:bg-white/10 transition-colors text-text-muted dark:text-gray-400"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } bg-surface/95 dark:bg-[#0a0f18]/95 border-t border-transparent dark:border-white/5`}
      >
        <div className="flex flex-col px-6 py-4 space-y-1 max-w-7xl mx-auto">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="text-text-muted dark:text-gray-400 hover:text-primary dark:hover:text-inverse-primary transition-colors font-body text-sm tracking-widest py-3 border-b border-surface -high dark:border-white/5 last:border-0"
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={handleLogin}
              className="flex-1 text-center bg-primary dark:bg-primary text-white px-6 py-2.5 rounded-md font-body text-sm tracking-widest active:scale-[0.98] duration-200 transition-all min-w-[100px] justify-center"
            >
              {session ? "Profile" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
