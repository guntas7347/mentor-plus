"use client";

import Link from "next/link";
import { useTheme } from "@/lib/useTheme";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="docked full-width top-0 sticky z-50 bg-surface/80 dark:bg-[#0a0f18]/80 glass-nav border-b border-transparent dark:border-white/5 transition-colors duration-300">
      <div className="flex justify-between items-center w-full px-8 max-w-7xl mx-auto h-20">
        <Link
          href="/"
          className="text-2xl font-extrabold text-primary dark:text-inverse-primary tracking-tight font-headline"
        >
          MentorPlus
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-primary dark:text-inverse-primary font-bold border-b-2 border-primary dark:border-inverse-primary pb-1 font-label text-sm tracking-widest"
          >
            Home
          </Link>
          <Link
            href="/courses"
            className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-inverse-primary transition-colors font-label text-sm tracking-widest"
          >
            Courses
          </Link>
          <Link
            href="/syllabus"
            className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-inverse-primary transition-colors font-label text-sm tracking-widest"
          >
            Syllabus
          </Link>
          <Link
            href="/test-series"
            className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-inverse-primary transition-colors font-label text-sm tracking-widest"
          >
            Test Series
          </Link>
          <Link
            href="/gallery"
            className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-inverse-primary transition-colors font-label text-sm tracking-widest"
          >
            Gallery
          </Link>
          <Link
            href="/about"
            className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-inverse-primary transition-colors font-label text-sm tracking-widest"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-inverse-primary transition-colors font-label text-sm tracking-widest"
          >
            Contact
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-surface-container-high dark:hover:bg-white/10 transition-colors text-on-surface-variant dark:text-outline-variant"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-inverse-primary transition-colors font-label text-sm tracking-widest px-4 py-2">
            Login
          </button>
          <button className="bg-primary-container dark:bg-primary text-white px-6 py-2.5 rounded-md font-label text-sm tracking-widest active:scale-[0.98] duration-200 transition-all">
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}
