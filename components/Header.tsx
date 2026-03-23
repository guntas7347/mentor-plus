"use client";

import Link from "next/link";
import { useTheme } from "@/lib/useTheme";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="docked full-width top-0 sticky z-50 bg-surface/80 dark:bg-[#0a0f18]/80 glass-nav border-b border-transparent dark:border-white/5 transition-colors duration-300">
      <div className="flex justify-between items-center w-full px-8 max-w-7xl mx-auto h-20">
        <Link
          href="/"
          className="text-2xl font-extrabold text-primary dark:text-inverse-primary tracking-tight font-headline"
        >
          MentorPlus
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-inverse-primary transition-colors font-label text-sm tracking-widest first:text-primary first:dark:text-inverse-primary first:border-b-2 first:border-primary first:dark:border-inverse-primary first:pb-1"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-surface-container-high dark:hover:bg-white/10 transition-colors text-on-surface-variant dark:text-outline-variant"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="hidden md:inline-flex text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-inverse-primary transition-colors font-label text-sm tracking-widest px-4 py-2">
            Login
          </button>
          <button className="hidden md:inline-flex bg-primary-container dark:bg-primary text-white px-6 py-2.5 rounded-md font-label text-sm tracking-widest active:scale-[0.98] duration-200 transition-all">
            Register
          </button>

          {/* Hamburger button — mobile only */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-full hover:bg-surface-container-high dark:hover:bg-white/10 transition-colors text-on-surface-variant dark:text-outline-variant"
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
              className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-inverse-primary transition-colors font-label text-sm tracking-widest py-3 border-b border-surface-container-high dark:border-white/5 last:border-0"
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-4">
            <button className="flex-1 text-center text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-inverse-primary transition-colors font-label text-sm tracking-widest border border-surface-container-high dark:border-white/10 px-4 py-2.5 rounded-md">
              Login
            </button>
            <button className="flex-1 bg-primary-container dark:bg-primary text-white px-4 py-2.5 rounded-md font-label text-sm tracking-widest active:scale-[0.98] duration-200 transition-all">
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
