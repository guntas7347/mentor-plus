"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  User,
  ChevronLeft,
  FileText,
  DollarSign,
  Trophy,
  Files,
  PersonStanding,
  GalleryHorizontal,
  X,
  Settings,
  Pencil,
} from "lucide-react";

export default function Sidebar({
  role = "STUDENT",
  isMobileOpen,
  setIsMobileOpen,
  user,
}: {
  role: string;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  user?: any;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar automatically on route navigation
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname, setIsMobileOpen]);

  const adminNavItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Test Series", href: "/test-series", icon: FileText },
    { name: "Questions", href: "/questions", icon: Pencil },
    { name: "Syllabus", href: "/syllabus", icon: Files },
    { name: "Exams", href: "/exams", icon: FileText },
    { name: "Tutors", href: "/tutors", icon: PersonStanding },
    { name: "Gallery", href: "/gallery", icon: GalleryHorizontal },
    { name: "Users", href: "/users", icon: Users },
    { name: "Purchases", href: "/purchases", icon: DollarSign },
    { name: "Configs", href: "/configs", icon: Settings },
    { name: "My Purchases", href: "/my-purchases", icon: Trophy },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const studentNavItems = [
    { name: "My Purchases", href: "/my-purchases", icon: Trophy },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const staffNavItems = [
    { name: "Exams", href: "/exams", icon: FileText },
    { name: "Questions", href: "/questions", icon: Pencil },
    { name: "Syllabus", href: "/syllabus", icon: Files },
    { name: "Users", href: "/users", icon: Users },
    { name: "Gallery", href: "/gallery", icon: GalleryHorizontal },
    { name: "My Purchases", href: "/my-purchases", icon: Trophy },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const navItems =
    role === "ADMIN"
      ? adminNavItems
      : role === "STAFF"
        ? staffNavItems
        : studentNavItems;

  return (
    <>
      {/* Dimmed Backdrop for Mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          absolute lg:relative inset-y-0 left-0 z-50 flex flex-col h-full bg-surface border-r border-gray-200 dark:border-white/5 transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none
          ${isMobileOpen ? "translate-x-0 w-[280px]" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "lg:w-20" : "lg:w-64"}
        `}
      >
        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3.5 top-8 bg-background border border-gray-200 dark:border-white/10 rounded-full p-1.5 shadow-md z-50 text-text-muted hover:text-primary transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft
            className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
          />
        </button>

        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden absolute right-4 top-5 p-2 text-text-muted hover:text-text transition-colors rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Branding Logo */}
        <div
          className={`p-6 h-20 flex items-center shrink-0 ${isCollapsed ? "lg:justify-center px-0" : "justify-start"}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary shadow-lg shadow-primary/20 rounded-xl flex items-center justify-center text-white font-headline font-bold text-lg shrink-0">
              M
            </div>
            <h1
              className={`font-extrabold font-headline text-xl tracking-tight text-text whitespace-nowrap transition-all duration-300 ${isCollapsed ? "lg:w-0 lg:opacity-0 overflow-hidden" : "w-auto opacity-100"}`}
            >
              Mentor<span className="text-primary">Plus</span>
            </h1>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto mt-2 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const fullPath = `/dashboard${item.href}`;
            const isActive = pathname === fullPath;

            return (
              <Link
                key={item.name}
                href={fullPath}
                title={isCollapsed ? item.name : ""}
                className={`
                  flex items-center gap-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                  ${isCollapsed ? "lg:justify-center px-0" : "px-4"}
                  ${
                    isActive
                      ? "bg-primary/10 text-primary font-bold shadow-sm"
                      : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-text font-semibold"
                  }
                `}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                )}

                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isActive ? "text-primary" : "group-hover:scale-110"}`}
                />

                <span
                  className={`whitespace-nowrap transition-all duration-300 text-sm tracking-wide
                  ${isCollapsed ? "lg:w-0 lg:opacity-0" : "w-auto opacity-100"}
                `}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* User Footer Profile */}
        <div className="p-4 border-t border-gray-200 dark:border-white/5 shrink-0">
          <div
            className={`flex items-center gap-3 ${isCollapsed ? "lg:justify-center" : "px-2"}`}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden flex-1">
                <p className="text-sm font-bold text-text truncate">
                  {user?.name || "User Name"}
                </p>
                <p className="text-xs text-text-muted truncate tracking-wider uppercase">
                  {role}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
