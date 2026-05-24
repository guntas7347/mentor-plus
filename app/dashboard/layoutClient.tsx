"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { BadgeCheck } from "lucide-react";

export default function DashboardLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background text-text transition-colors duration-300 overflow-hidden font-body">
      {/* Sidebar handles its own width and desktop/mobile states */}
      <Sidebar
        role={user?.role || "STUDENT"}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        user={user}
      />

      {/* Main Content Column - Naturally resizes via flex-1 */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-300 relative">
        <Header onMenuClick={() => setIsMobileOpen(true)} />

        <main className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">{children}</div>
        </main>
        <footer className="bg-surface border-t border-gray-200 dark:border-white/5 shrink-0 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
            <div className="flex justify-center items-center text-sm text-text-muted text-center">
              <p>
                © {new Date().getFullYear()} MentorPlus Coaching. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
