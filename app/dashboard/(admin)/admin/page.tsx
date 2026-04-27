"use client";

import { useEffect, useState } from "react";
import { Users, BookOpen, FileText, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { getDashboardStats } from "@/lib/actions/stats";
// Adjust this import path based on where your session action is located
import { getSessionUser } from "@/lib/auth";

// Native helper to format relative time (e.g., "2h ago", "Just now")
function timeAgo(dateInput: string | Date) {
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hrs ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} days ago`;

  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [firstName, setFirstName] = useState<string>("Admin");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // Fetch both stats and user session concurrently for speed
        const [statsData, sessionUser] = await Promise.all([
          getDashboardStats(),
          getSessionUser(),
        ]);

        setData(statsData);

        if (sessionUser?.name) {
          // Extract just the first name for a friendlier greeting
          setFirstName(sessionUser.name.split(" ")[0]);
        }
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-on-surface-variant dark:text-gray-400">
        <Loader2 className="animate-spin text-primary" size={32} />
        <p className="font-medium text-sm">Loading your dashboard...</p>
      </div>
    );
  }

  if (!data) return null;

  const stats = [
    {
      title: "Total Students",
      value: data.students.total.toLocaleString(),
      trend: data.students.trend,
      icon: Users,
      iconColor: "text-blue-600 dark:text-blue-400",
      bgStyle: "bg-blue-100 dark:bg-blue-900/30",
      trendStyle:
        "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
    },
    {
      title: "Active Courses",
      value: data.courses.total.toLocaleString(),
      trend: data.courses.trend,
      icon: BookOpen,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      bgStyle: "bg-emerald-100 dark:bg-emerald-900/30",
      trendStyle:
        "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300",
    },
    {
      title: "Active Test Series",
      value: data.testSeries.total.toLocaleString(),
      trend: data.testSeries.trend,
      icon: FileText,
      iconColor: "text-purple-600 dark:text-purple-400",
      bgStyle: "bg-purple-100 dark:bg-purple-900/30",
      trendStyle:
        "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface dark:text-white tracking-tight mb-2">
          Hi {firstName}! 👋
        </h1>
        <p className="font-body text-lg text-on-surface-variant dark:text-gray-400">
          Here is an overview of what's happening across your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-surface-container-lowest dark:bg-[#121c28] p-6 rounded-3xl border border-outline-variant/20 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`p-3 rounded-xl ${stat.bgStyle} ${stat.iconColor} group-hover:scale-110 transition-transform`}
                >
                  <Icon size={24} />
                </div>
                <span
                  className={`text-[10px] px-2.5 py-1 rounded-md font-bold tracking-wider uppercase ${stat.trendStyle}`}
                >
                  {stat.trend}
                </span>
              </div>

              <div>
                <p className="font-label text-sm text-on-surface-variant dark:text-gray-400 font-semibold uppercase tracking-wide mb-1">
                  {stat.title}
                </p>
                <p className="text-4xl font-headline font-extrabold text-on-surface dark:text-white tracking-tight">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-surface-container-lowest dark:bg-[#121c28] rounded-3xl p-8 border border-outline-variant/20 dark:border-white/5 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-outline-variant/10 dark:border-white/5">
          <h2 className="text-xl font-headline font-bold text-on-surface dark:text-white">
            Recent Enrollments
          </h2>
          <Link
            href="/dashboard/purchases"
            className="text-sm font-semibold text-primary dark:text-[#b5c4ff] hover:underline flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="space-y-2 font-body">
          {data.recentEnrollments.length === 0 ? (
            <p className="text-on-surface-variant dark:text-gray-500 py-4 italic text-center">
              No recent enrollments to show.
            </p>
          ) : (
            data.recentEnrollments.map((purchase: any) => (
              <div
                key={purchase.id}
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container-low dark:hover:bg-[#1e2a3b] transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20 dark:hover:border-white/5 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 dark:bg-[#1a56db]/20 border border-primary/20 flex items-center justify-center text-primary dark:text-[#b5c4ff] font-bold shrink-0">
                    {purchase.user.image ? (
                      <img
                        src={purchase.user.image}
                        alt={purchase.user.name || "Student"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      (purchase.user.name?.charAt(0) || "U").toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-on-surface dark:text-white group-hover:text-primary transition-colors">
                      {purchase.user.name || purchase.user.email}
                    </p>
                    <p className="text-sm text-on-surface-variant dark:text-gray-400 mt-0.5">
                      Enrolled in{" "}
                      <span className="font-semibold text-on-surface dark:text-gray-300">
                        {purchase.productName}
                      </span>
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-on-surface-variant dark:text-gray-500 bg-surface dark:bg-[#121c28] px-3 py-1.5 rounded-full border border-outline-variant/20 dark:border-white/5 whitespace-nowrap">
                  {timeAgo(purchase.createdAt)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
