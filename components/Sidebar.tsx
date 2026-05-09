"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  User,
  LineChart,
  ChevronLeft,
  FileText,
  Settings,
  DollarSign,
  Trophy,
  Files,
  PersonStanding,
  GalleryHorizontal,
} from "lucide-react";

export default function Sidebar({ role = "student" }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const adminNavItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Test Series", href: "/test-series", icon: FileText },
    { name: "Syllabus", href: "/syllabus", icon: Files },
    { name: "Tutors", href: "/tutors", icon: PersonStanding },
    // { name: "PDFs", href: "/pdfs", icon: Files },
    { name: "Gallery", href: "/gallery", icon: GalleryHorizontal },
    { name: "Users", href: "/users", icon: Users },
    { name: "Purchases", href: "/purchases", icon: DollarSign },
    { name: "My Purchases", href: "/my-purchases", icon: Trophy },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const studentNavItems = [
    { name: "My Purchases", href: "/my-purchases", icon: Trophy },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const navItems = role === "ADMIN" ? adminNavItems : studentNavItems;

  return (
    <aside
      className={`relative bg-background dark:bg-[#1f2937] border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 z-20
        ${isCollapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-7 bg-surface dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-text dark:text-gray-300 rounded-full p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
        aria-label="Toggle Sidebar"
      >
        <ChevronLeft
          className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>

      {/* Branding */}
      <div
        className={`p-6 flex items-center h-20 ${isCollapsed ? "justify-center px-0" : "justify-start"}`}
      >
        <h1 className="font-headline font-bold text-primary dark:text-primary whitespace-nowrap overflow-hidden transition-all duration-300">
          {isCollapsed ? (
            <span className="text-xl">M+</span>
          ) : (
            <span className="text-2xl">Mentor Plus</span>
          )}
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-2 font-body mt-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={`/dashboard${item.href}`}
              title={isCollapsed ? item.name : undefined}
              className={`flex items-center gap-3 py-3 rounded-xl text-text-muted dark:text-gray-400 hover:bg-surface dark:hover:bg-[#27313e] hover:text-primary dark:hover:text-primary transition-all duration-200 overflow-hidden
                ${isCollapsed ? "justify-center px-0" : "px-4"}
              `}
            >
              <Icon className="w-5 h-5 shrink-0" strokeWidth={2} />

              <span
                className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
