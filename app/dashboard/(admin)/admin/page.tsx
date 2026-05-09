"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Users,
  BookOpen,
  FileText,
  ArrowRight,
  Loader2,
  IndianRupee,
  TrendingUp,
  Layout,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { getDashboardRawData } from "@/lib/actions/stats";
import { getSessionUser } from "@/lib/auth";
import { formatRupees } from "@/lib/helpers";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

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
  const [rawData, setRawData] = useState<any>(null);
  const [firstName, setFirstName] = useState<string>("Admin");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [data, sessionUser] = await Promise.all([
          getDashboardRawData(),
          getSessionUser(),
        ]);

        setRawData(data);

        if (sessionUser?.name) {
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

  const processedData = useMemo(() => {
    if (!rawData) return null;

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const filterNew = (items: any[]) =>
      items.filter((item) => new Date(item.createdAt) >= startOfMonth).length;

    // 1. Core Stats
    const stats = {
      students: {
        total: rawData.users.filter((u: any) => u.role === "STUDENT").length,
        new: filterNew(rawData.users.filter((u: any) => u.role === "STUDENT")),
      },
      courses: {
        total: rawData.courses.filter((c: any) => c.isPublished).length,
        new: filterNew(rawData.courses.filter((c: any) => c.isPublished)),
      },
      testSeries: {
        total: rawData.testSeries.filter((t: any) => t.isPublished).length,
        new: filterNew(rawData.testSeries.filter((t: any) => t.isPublished)),
      },
      revenue: {
        total: rawData.purchases
          .filter((p: any) => p.status === "SUCCESS")
          .reduce((acc: number, p: any) => acc + (p.amount || 0), 0),
        new: rawData.purchases
          .filter(
            (p: any) => p.status === "SUCCESS" && new Date(p.createdAt) >= startOfMonth,
          )
          .reduce((acc: number, p: any) => acc + (p.amount || 0), 0),
      },
    };

    // 2. Chart Data (Last 30 days)
    const last30Days: any[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      last30Days.push({
        date: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
        fullDate: dateStr,
        users: 0,
        purchases: 0,
        revenue: 0,
      });
    }

    rawData.users.forEach((u: any) => {
      const dateStr = new Date(u.createdAt).toISOString().split("T")[0];
      const day = last30Days.find((d) => d.fullDate === dateStr);
      if (day) day.users++;
    });

    rawData.purchases.forEach((p: any) => {
      if (p.status !== "SUCCESS") return;
      const dateStr = new Date(p.createdAt).toISOString().split("T")[0];
      const day = last30Days.find((d) => d.fullDate === dateStr);
      if (day) {
        day.purchases++;
        day.revenue += p.amount || 0;
      }
    });

    return { stats, chartData: last30Days, recentPurchases: rawData.purchases.slice(0, 5) };
  }, [rawData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-text-muted dark:text-gray-400">
        <Loader2 className="animate-spin text-primary" size={32} />
        <p className="font-medium text-sm">Aggregating platform data...</p>
      </div>
    );
  }

  if (!processedData) return null;

  const { stats, chartData, recentPurchases } = processedData;

  const statCards = [
    {
      title: "Students",
      value: stats.students.total,
      trend: `+${stats.students.new} this month`,
      icon: Users,
      color: "blue",
    },
    {
      title: "Revenue",
      value: formatRupees(stats.revenue.total),
      trend: `${formatRupees(stats.revenue.new)} this month`,
      icon: IndianRupee,
      color: "emerald",
    },
    {
      title: "Courses",
      value: stats.courses.total,
      trend: `+${stats.courses.new} this month`,
      icon: BookOpen,
      color: "purple",
    },
    {
      title: "Test Series",
      value: stats.testSeries.total,
      trend: `+${stats.testSeries.new} this month`,
      icon: FileText,
      color: "amber",
    },
  ];

  const colorMap: any = {
    blue: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30",
    emerald: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30",
    purple: "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30",
    amber: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30",
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-extrabold text-text dark:text-white tracking-tight mb-2">
            Hi {firstName}! 👋
          </h1>
          <p className="font-body text-lg text-text-muted dark:text-gray-400">
            Platform performance processed in real-time.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-surface dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-200/20">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted dark:text-gray-300">
              Live Overview
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-background dark:bg-[#121c28] p-6 rounded-3xl border border-gray-200/20 dark:border-white/5 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${colorMap[stat.color]} group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
              </div>
              <div>
                <p className="font-body text-xs text-text-muted dark:text-gray-400 font-bold uppercase tracking-widest mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-headline font-extrabold text-text dark:text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[10px] font-bold text-text-muted dark:text-gray-500 mt-2 flex items-center gap-1">
                  <TrendingUp size={12} className="text-emerald-500" />
                  {stat.trend}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* Main Growth Chart */}
        <div className="lg:col-span-8 bg-background dark:bg-[#121c28] rounded-3xl p-8 border border-gray-200/20 dark:border-white/5 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-headline font-bold text-text dark:text-white">
                Platform Growth
              </h2>
              <p className="text-xs text-text-muted dark:text-gray-500 mt-1">
                Activity trends for the last 30 days
              </p>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-1.5 text-xs font-bold text-text-muted dark:text-gray-400">
                  <div className="w-3 h-3 rounded-full bg-primary/40 border border-primary/60" />
                  Students
               </div>
               <div className="flex items-center gap-1.5 text-xs font-bold text-text-muted dark:text-gray-400">
                  <div className="w-3 h-3 rounded-full bg-emerald-400/40 border border-emerald-400/60" />
                  Enrollments
               </div>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPurchases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 10, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 10, fontWeight: 600 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#121c28",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                  itemStyle={{ fontWeight: "bold" }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                  name="New Students"
                />
                <Area
                  type="monotone"
                  dataKey="purchases"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorPurchases)"
                  name="Enrollments"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Enrollments */}
        <div className="lg:col-span-4 bg-background dark:bg-[#121c28] rounded-3xl p-8 border border-gray-200/20 dark:border-white/5 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-headline font-bold text-text dark:text-white">
              Latest Activity
            </h2>
            <Link
              href="/dashboard/purchases"
              className="p-2 hover:bg-surface rounded-lg transition-colors"
            >
              <ArrowRight size={20} className="text-text-muted" />
            </Link>
          </div>

          <div className="space-y-6">
            {recentPurchases.length === 0 ? (
              <p className="text-text-muted dark:text-gray-500 py-4 italic text-center text-sm">
                No recent activity.
              </p>
            ) : (
              recentPurchases.map((purchase: any) => (
                <div key={purchase.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 dark:bg-primary/20 flex items-center justify-center font-bold text-primary dark:text-primary-light shrink-0">
                    {purchase.user.image ? (
                      <img src={purchase.user.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      (purchase.user.name?.charAt(0) || purchase.user.email.charAt(0)).toUpperCase()
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text dark:text-white truncate">
                      {purchase.user.name || purchase.user.email}
                    </p>
                    <p className="text-xs text-text-muted dark:text-gray-400 truncate mt-0.5">
                      {purchase.testSeries?.title || purchase.course?.title || "Product"}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                       <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-tighter ${purchase.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                          {purchase.status}
                       </span>
                       <span className="text-[10px] text-text-muted dark:text-gray-500 font-medium">
                          {timeAgo(purchase.createdAt)}
                       </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <Link
            href="/dashboard/users"
            className="mt-8 w-full py-3 rounded-xl border border-dashed border-gray-200 hover:border-primary/50 text-xs font-bold text-text-muted hover:text-primary transition-all flex items-center justify-center gap-2"
          >
             <Users size={14} />
             Manage Student Base
          </Link>
        </div>
      </div>
      
      {/* Platform Inventory Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-background dark:bg-[#121c28] p-6 rounded-3xl border border-gray-200/20 flex items-center gap-6 group hover:border-primary/20 transition-all cursor-pointer">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl group-hover:rotate-12 transition-transform">
               <Layers size={24} />
            </div>
            <div>
               <p className="text-2xl font-extrabold text-text dark:text-white">{rawData.courses.length}</p>
               <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted dark:text-gray-500">Total Courses</p>
            </div>
         </div>
         
         <div className="bg-background dark:bg-[#121c28] p-6 rounded-3xl border border-gray-200/20 flex items-center gap-6 group hover:border-emerald-200 transition-all cursor-pointer">
            <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl group-hover:rotate-12 transition-transform">
               <Layout size={24} />
            </div>
            <div>
               <p className="text-2xl font-extrabold text-text dark:text-white">{rawData.testSeries.length}</p>
               <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted dark:text-gray-500">Total Test Series</p>
            </div>
         </div>
         
         <div className="bg-background dark:bg-[#121c28] p-6 rounded-3xl border border-gray-200/20 flex items-center gap-6 group hover:border-purple-200 transition-all cursor-pointer">
            <div className="p-4 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl group-hover:rotate-12 transition-transform">
               <FileText size={24} />
            </div>
            <div>
               <p className="text-2xl font-extrabold text-text dark:text-white">{rawData.syllabus.length}</p>
               <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted dark:text-gray-500">Syllabus Categories</p>
            </div>
         </div>
      </div>
    </main>
  );
}
