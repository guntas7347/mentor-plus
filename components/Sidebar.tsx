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
  Menu,
  X,
} from "lucide-react";

export default function Sidebar({
  role = "STUDENT",
  isMobileOpen,
  setIsMobileOpen,
}: {
  role: string;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const adminNavItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Test Series", href: "/test-series", icon: FileText },
    { name: "Syllabus", href: "/syllabus", icon: Files },
    { name: "Tutors", href: "/tutors", icon: PersonStanding },
    { name: "Gallery", href: "/gallery", icon: GalleryHorizontal },
    { name: "Users", href: "/users", icon: Users },
    { name: "Purchases", href: "/purchases", icon: DollarSign },
    { name: "My Purchases", href: "/my-purchases", icon: Trophy },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const studentNavItems = [
    // { name: "Dashboard", href: "/student", icon: LayoutDashboard },
    { name: "My Purchases", href: "/my-purchases", icon: Trophy },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const navItems = role === "ADMIN" ? adminNavItems : studentNavItems;

  return (
    <>
      {/* Mobile Toggle Header (Visible only on Mobile) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#1f2937] border-b border-gray-200 dark:border-gray-800 flex items-center px-4 z-30 justify-between">
        <h1 className="font-bold text-primary text-xl">Mentor Plus</h1>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Backdrop for Mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-[#1f2937] border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0 w-[280px]" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "lg:w-20" : "lg:w-64"}
        `}
      >
        {/* Desktop Collapse Toggle (Hidden on Mobile) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3.5 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1.5 shadow-md z-50 hover:text-primary transition-colors"
        >
          <ChevronLeft
            className={`w-4 h-4 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
          />
        </button>

        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden absolute right-4 top-6 p-2 text-gray-500"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Branding */}
        <div
          className={`p-6 h-20 flex items-center ${isCollapsed ? "lg:justify-center" : "justify-start"}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shrink-0">
              M
            </div>
            <h1
              className={`font-bold text-xl tracking-tight transition-opacity duration-300 ${isCollapsed ? "lg:hidden" : "block"}`}
            >
              Mentor <span className="text-primary">Plus</span>
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto mt-4 custom-scrollbar">
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
                  flex items-center gap-3 py-3 rounded-xl transition-all duration-200 group
                  ${isCollapsed ? "lg:justify-center px-0" : "px-4"}
                  ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                  }
                `}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 ${isActive ? "text-primary" : "group-hover:scale-110 transition-transform"}`}
                />

                <span
                  className={`whitespace-nowrap transition-all duration-300 
                  ${isCollapsed ? "lg:hidden opacity-0" : "opacity-100"}
                `}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Optional Footer/User Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div
            className={`flex items-center gap-3 ${isCollapsed ? "lg:justify-center" : ""}`}
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">User Name</p>
                <p className="text-xs text-gray-500 truncate capitalize">
                  {role.toLowerCase()}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
