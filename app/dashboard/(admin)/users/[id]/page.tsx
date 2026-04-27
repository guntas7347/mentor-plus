"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  User as UserIcon,
  Mail,
  Calendar,
  Shield,
  Save,
  Loader2,
  Receipt,
  BookOpen,
  IndianRupee,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { getUserById, updateUserRole } from "@/lib/actions/users";
import { notify } from "@/lib/toast";
import Link from "next/link";

// --- Types ---
type Role = "STUDENT" | "ADMIN";

interface TestSeries {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnailUrl: string | null;
}

interface Purchase {
  id: string;
  amount: number;
  paymentMethod: string;
  paymentId: string;
  status: string;
  createdAt: string;
  testSeries?: TestSeries | null;
  course?: {
    id: string;
    title: string;
    category?: string;
  } | null;
}

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: Role;
  createdAt: string;
  purchases: Purchase[];
}

// --- Helpers ---
const STATUS_STYLES: Record<string, { bg: string; text: string; icon: any }> = {
  COMPLETED: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  SUCCESS: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  PENDING: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-400",
    icon: Clock,
  },
  FAILED: {
    bg: "bg-rose-100 dark:bg-rose-900/30",
    text: "text-rose-700 dark:text-rose-400",
    icon: XCircle,
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(amountInPaise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amountInPaise / 100);
}

function getInitials(name: string | null) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

// --- Main Component ---
export default function UserProfilePage() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedRole, setSelectedRole] = useState<Role>("STUDENT");
  const [updatingRole, setUpdatingRole] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id as string);
        if (data) {
          setUser(data as UserProfile);
          setSelectedRole(data.role as Role);
        } else {
          notify.error("User not found.");
          router.push("/dashboard/users");
        }
      } catch (error) {
        notify.error("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, router]);

  const handleRoleUpdate = async () => {
    if (selectedRole === user?.role) return;

    setUpdatingRole(true);
    try {
      await updateUserRole(user!.id, selectedRole);
      setUser((prev) => (prev ? { ...prev, role: selectedRole } : null));
      notify.success(`User role updated to ${selectedRole}`);
    } catch (error) {
      notify.error("Failed to update role.");
      setSelectedRole(user!.role); // Revert on failure
    } finally {
      setUpdatingRole(false);
    }
  };

  // Derive enrolled test series from successful purchases
  const enrolledTestSeries = useMemo(() => {
    if (!user) return [];

    const validPurchases = user.purchases.filter(
      (p) => p.status === "COMPLETED" || p.status === "SUCCESS",
    );

    const testSeriesList = validPurchases
      .map((p) => p.testSeries)
      .filter((ts): ts is TestSeries => ts !== null && ts !== undefined);

    // Remove duplicates just in case they bought the same one twice
    const uniqueTestSeries = Array.from(
      new Map(testSeriesList.map((item) => [item.id, item])).values(),
    );

    return uniqueTestSeries;
  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-on-surface-variant dark:text-gray-400">
        <UserIcon className="animate-pulse mb-4 text-primary" size={48} />
        <p className="font-medium">Loading user profile...</p>
      </div>
    );
  }

  if (!user) return null;

  const totalSpent = user.purchases
    .filter((p) => p.status === "COMPLETED" || p.status === "SUCCESS")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl hover:bg-surface-container dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft
              size={20}
              className="text-on-surface dark:text-gray-300"
            />
          </button>
          <h1 className="text-3xl font-extrabold text-on-surface dark:text-white">
            User Profile
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Card & Role Management */}
        <div className="space-y-8">
          {/* Identity Card */}
          <div className="bg-surface-container-lowest dark:bg-[#121c28] rounded-3xl p-8 border border-outline-variant/20 dark:border-white/5 shadow-sm text-center flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-primary/10 dark:bg-[#1a56db]/20 border-4 border-white dark:border-[#1e2a3b] shadow-md flex items-center justify-center text-3xl font-extrabold text-primary dark:text-[#b5c4ff] mb-4">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitials(user.name)
              )}
            </div>

            <h2 className="text-2xl font-bold text-on-surface dark:text-white mb-1">
              {user.name || "Unknown User"}
            </h2>
            <div className="flex items-center gap-2 text-on-surface-variant dark:text-gray-400 text-sm mb-4">
              <Mail size={14} />
              {user.email}
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant dark:text-gray-500 bg-surface dark:bg-gray-800 px-3 py-1.5 rounded-full border border-outline-variant/20 dark:border-gray-700">
              <Calendar size={12} />
              Joined {formatDate(user.createdAt)}
            </div>
          </div>

          {/* Role Management Card */}
          <div className="bg-surface-container-lowest dark:bg-[#121c28] rounded-3xl p-6 border border-outline-variant/20 dark:border-white/5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="text-primary dark:text-[#b5c4ff]" size={20} />
              <h3 className="font-bold text-on-surface dark:text-white text-lg">
                Role & Access
              </h3>
            </div>

            <p className="text-sm text-on-surface-variant dark:text-gray-400 mb-4 leading-relaxed">
              Admins have full access to the dashboard, including modifying
              courses and user data.
            </p>

            <div className="flex flex-col gap-3">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as Role)}
                className="w-full px-4 py-3 bg-surface dark:bg-[#1f2937] border border-outline-variant/30 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm font-semibold text-on-surface dark:text-white transition-all"
              >
                <option value="STUDENT">Student</option>
                <option value="ADMIN">Administrator</option>
              </select>

              <button
                onClick={handleRoleUpdate}
                disabled={updatingRole || selectedRole === user.role}
                className="w-full py-3 bg-primary dark:bg-[#1a56db] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
              >
                {updatingRole ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                Update Role
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-surface-container-lowest dark:bg-[#121c28] rounded-3xl p-6 border border-outline-variant/20 dark:border-white/5 shadow-sm space-y-4">
            <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
              <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
                <IndianRupee size={18} /> Total Spent
              </div>
              <span className="font-extrabold text-emerald-800 dark:text-emerald-300 text-lg">
                {formatCurrency(totalSpent)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/10 dark:border-primary/20">
              <div className="flex items-center gap-3 text-primary dark:text-[#b5c4ff] font-semibold text-sm">
                <BookOpen size={18} /> Enrollments
              </div>
              <span className="font-extrabold text-primary dark:text-[#b5c4ff] text-lg">
                {enrolledTestSeries.length}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Content (Test Series & Purchases) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Enrolled Test Series */}
          <section className="bg-surface-container-lowest dark:bg-[#121c28] rounded-3xl border border-outline-variant/20 dark:border-white/5 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10 dark:border-white/5 bg-surface-container-low/50 dark:bg-white/[0.02] flex items-center gap-3">
              <BookOpen
                className="text-primary dark:text-[#b5c4ff]"
                size={20}
              />
              <h3 className="font-bold text-on-surface dark:text-white text-lg">
                Enrolled Test Series
              </h3>
            </div>

            <div className="p-6">
              {enrolledTestSeries.length === 0 ? (
                <p className="text-center text-on-surface-variant dark:text-gray-500 py-8 italic">
                  This user has not successfully enrolled in any test series
                  yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {enrolledTestSeries.map((ts) => (
                    <Link
                      key={ts.id}
                      href={`/dashboard/test-series/${ts.id}`}
                      className="group flex items-center gap-4 p-3 bg-surface dark:bg-[#1f2937] rounded-xl border border-outline-variant/20 dark:border-gray-700 hover:border-primary/40 transition-colors"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-container dark:bg-gray-800 shrink-0">
                        {ts.thumbnailUrl ? (
                          <img
                            src={ts.thumbnailUrl}
                            alt={ts.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            <BookOpen size={20} />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-on-surface dark:text-white text-sm line-clamp-2 group-hover:text-primary transition-colors">
                          {ts.title}
                        </span>
                        <span className="text-[10px] text-on-surface-variant dark:text-gray-400 font-bold uppercase tracking-widest mt-1">
                          {ts.category}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Purchase History Table */}
          <section className="bg-surface-container-lowest dark:bg-[#121c28] rounded-3xl border border-outline-variant/20 dark:border-white/5 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10 dark:border-white/5 bg-surface-container-low/50 dark:bg-white/[0.02] flex items-center gap-3">
              <Receipt className="text-primary dark:text-[#b5c4ff]" size={20} />
              <h3 className="font-bold text-on-surface dark:text-white text-lg">
                Purchase History
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body text-left whitespace-nowrap">
                <thead>
                  <tr className="border-b border-outline-variant/10 dark:border-white/5 bg-surface dark:bg-[#182030]/50">
                    <th className="px-6 py-3 font-label font-semibold text-on-surface-variant dark:text-gray-400 text-xs uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 font-label font-semibold text-on-surface-variant dark:text-gray-400 text-xs uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 font-label font-semibold text-on-surface-variant dark:text-gray-400 text-xs uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 font-label font-semibold text-on-surface-variant dark:text-gray-400 text-xs uppercase tracking-wider text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 dark:divide-white/5">
                  {user.purchases.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-12 text-center text-on-surface-variant dark:text-gray-500 italic"
                      >
                        No purchases found for this user.
                      </td>
                    </tr>
                  ) : (
                    user.purchases.map((purchase) => {
                      const StatusConfig =
                        STATUS_STYLES[purchase.status] || STATUS_STYLES.PENDING;
                      const StatusIcon = StatusConfig.icon;

                      const productName =
                        purchase.testSeries?.title ||
                        purchase.course?.title ||
                        "Unknown Product";
                      const productCategory = purchase.testSeries
                        ? purchase.testSeries.category
                        : purchase.course
                          ? "COURSE"
                          : "OTHER";

                      return (
                        <tr
                          key={purchase.id}
                          className="hover:bg-surface-container-low dark:hover:bg-[#182030] transition-colors"
                        >
                          <td className="px-6 py-4 text-on-surface-variant dark:text-gray-300">
                            {formatDate(purchase.createdAt)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span
                                className="font-bold text-on-surface dark:text-white truncate max-w-[200px]"
                                title={productName}
                              >
                                {productName}
                              </span>
                              <span className="text-[10px] text-primary dark:text-[#85f8c4] font-bold uppercase tracking-widest mt-0.5">
                                {productCategory}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${StatusConfig.bg} ${StatusConfig.text}`}
                            >
                              <StatusIcon size={12} />
                              {purchase.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-extrabold text-on-surface dark:text-white">
                            {formatCurrency(purchase.amount)}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
