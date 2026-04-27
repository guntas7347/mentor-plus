import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { BadgeCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-background dark:bg-inverse-surface text-on-background dark:text-inverse-on-surface transition-colors duration-300 overflow-hidden">
      <Sidebar role={user.role} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto no-scrollbar p-6">
          <div className="max-w-7xl mx-auto space-y-6">{children}</div>
        </main>

        <footer className="bg-surface-container-low dark:bg-[#0a0f18] border-t border-outline-variant/10 dark:border-white/5 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-8 py-8 border-t border-outline-variant/10 dark:border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-on-surface-variant dark:text-outline-variant">
              <p>
                © {new Date().getFullYear()} MentorPlus Coaching. All rights
                reserved.
              </p>
              <div className="flex items-center gap-2">
                <BadgeCheck
                  size={16}
                  className="text-secondary dark:text-secondary-fixed-dim"
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
