"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { BadgeCheck } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background dark:bg-gray-950 text-text dark:text-gray-100 transition-colors duration-300 overflow-hidden font-body">
      <Sidebar
        role={user.role}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={() => setIsMobileOpen(!isMobileOpen)} />

        <main className="flex-1 overflow-y-auto no-scrollbar p-1 md:p-6 ">
          <div className="mx-auto space-y-6">{children}</div>
        </main>

        <footer className="bg-surface dark:bg-[#0a0f18] border-t border-gray-200 dark:border-white/5 transition-colors duration-300">
          <div className=" mx-auto px-8 py-8 border-t border-gray-200 dark:border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted dark:text-gray-400">
              <p>
                © {new Date().getFullYear()} MentorPlus Coaching. All rights
                reserved.
              </p>
              <div className="flex items-center gap-2">
                <BadgeCheck
                  size={16}
                  className="text-secondary dark:text-secondary"
                />
                <span>ISO 9001:2015 Certified Institution</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
