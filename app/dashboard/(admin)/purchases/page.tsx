"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Receipt,
  Search,
  CreditCard,
  Calendar,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  IndianRupee,
  User as UserIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getAllPurchases } from "@/lib/actions/purchases";
import { Purchase } from "@/prisma/generated/client";
import { formatRupees } from "@/lib/helpers";

// --- Types based on your Prisma Schema & API Response ---
type PurchaseStatus =
  | "PENDING"
  | "COMPLETED"
  | "SUCCESS"
  | "FAILED"
  | "CANCELLED";

// Extended type to include relational includes from Prisma
interface PopulatedPurchase extends Omit<Purchase, "status"> {
  status: PurchaseStatus;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    phone?: string | null;
  };
  testSeries?: {
    id: string;
    title: string;
  } | null;
  course?: {
    id: string;
    title: string;
  } | null;
  remark?: string | null;
}

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// --- UI Helpers ---
const STATUS_STYLES: Record<string, { bg: string; text: string; icon: any }> = {
  SUCCESS: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  COMPLETED: {
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
  CANCELLED: {
    bg: "bg-surface-variant dark:bg-gray-800",
    text: "text-on-surface-variant dark:text-gray-400",
    icon: XCircle,
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<PopulatedPurchase[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPurchases = async () => {
      setLoading(true);
      try {
        const response = await getAllPurchases(currentPage, 25);
        // Map the expected response data
        setPurchases(response.data as PopulatedPurchase[]);
        setMeta(response.meta);
      } catch (error) {
        console.error("Failed to load purchases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [currentPage]);

  // Client-side search filter for the current page
  const filteredPurchases = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return purchases.filter((p) => {
      const productName = (
        p.testSeries?.title ||
        p.course?.title ||
        ""
      ).toLowerCase();

      return (
        productName.includes(query) ||
        p.paymentId?.toLowerCase().includes(query) ||
        p.user?.email?.toLowerCase().includes(query) ||
        (p.user?.name && p.user.name.toLowerCase().includes(query))
      );
    });
  }, [purchases, searchQuery]);

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-headline font-bold text-on-surface dark:text-inverse-primary mb-1">
            Purchases & Transactions
          </h1>
          <p className="font-body text-sm text-on-surface-variant dark:text-outline">
            Monitor student enrollments, payments, and invoices.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-high dark:bg-[#1f2937] text-on-surface dark:text-white font-label font-semibold text-sm border border-outline-variant/20 hover:bg-surface-container-highest transition-all shadow-sm">
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-surface-container-lowest dark:bg-[#1f2937] rounded-2xl shadow-sm border border-outline-variant/20 dark:border-white/5 overflow-hidden flex flex-col min-h-[500px]">
        {/* Toolbar (Search) */}
        <div className="p-4 border-b border-outline-variant/15 dark:border-white/5 bg-surface-container-low/50 dark:bg-[#182030]/50 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-outline dark:text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by student, product, or payment ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface dark:bg-[#1f2937] border border-outline-variant/30 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm text-on-surface dark:text-white placeholder:dark:text-gray-500 transition-all"
            />
          </div>
        </div>

        {/* Loading State or Table */}
        <div className="overflow-x-auto flex-grow">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-on-surface-variant dark:text-gray-400">
              <Receipt className="animate-pulse mb-4 text-primary" size={32} />
              <p className="font-medium text-sm">Loading transactions...</p>
            </div>
          ) : (
            <table className="w-full text-sm font-body text-left whitespace-nowrap">
              <thead>
                <tr className="border-b border-outline-variant/15 dark:border-white/5 bg-surface-container-low dark:bg-[#182030]">
                  <th className="px-6 py-4 font-label font-semibold text-on-surface-variant dark:text-gray-400 text-xs uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-4 font-label font-semibold text-on-surface-variant dark:text-gray-400 text-xs uppercase tracking-wider">
                    Product Info
                  </th>
                  <th className="px-6 py-4 font-label font-semibold text-on-surface-variant dark:text-gray-400 text-xs uppercase tracking-wider">
                    Payment Details
                  </th>
                  <th className="px-6 py-4 font-label font-semibold text-on-surface-variant dark:text-gray-400 text-xs uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 font-label font-semibold text-on-surface-variant dark:text-gray-400 text-xs uppercase tracking-wider text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 dark:divide-white/5">
                {filteredPurchases.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-on-surface-variant dark:text-gray-500"
                    >
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  filteredPurchases.map((purchase) => {
                    const StatusConfig =
                      STATUS_STYLES[purchase.status] || STATUS_STYLES.PENDING;
                    const StatusIcon = StatusConfig.icon;

                    // Derive product details from relation data
                    const productName =
                      purchase.testSeries?.title ||
                      purchase.course?.title ||
                      "Unknown Product";
                    const productCategory = purchase.testSeries
                      ? "TEST SERIES"
                      : purchase.course
                        ? "COURSE"
                        : "OTHER";

                    return (
                      <tr
                        key={purchase.id}
                        className="hover:bg-surface-container-low dark:hover:bg-[#182030] transition-colors duration-150 group"
                      >
                        {/* Student Info */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0">
                              {purchase.user?.image ? (
                                <img
                                  src={purchase.user.image}
                                  alt={purchase.user.name || "User"}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <UserIcon size={18} className="text-primary" />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-on-surface dark:text-white">
                                {purchase.user?.name || "Unknown User"}
                              </span>
                              <span className="text-xs text-on-surface-variant dark:text-gray-400">
                                {purchase.user?.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Product Info */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-on-surface dark:text-white whitespace-normal line-clamp-2 min-w-[200px]">
                              {productName}
                            </span>
                            <span className="text-[10px] font-bold text-primary dark:text-[#85f8c4] uppercase tracking-widest mt-0.5">
                              {productCategory}
                            </span>
                          </div>
                        </td>

                        {/* Payment Details */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant dark:text-gray-400">
                              <CreditCard size={14} />
                              {purchase.paymentMethod}
                            </div>
                            {purchase.paymentId ? (
                              <span className="font-mono text-[11px] text-outline dark:text-gray-500">
                                {purchase.paymentId}
                              </span>
                            ) : (
                              <span className="font-mono text-[11px] text-outline dark:text-gray-500 italic">
                                {purchase.remark || "No ID"}
                              </span>
                            )}
                            <div className="text-[11px] text-on-surface-variant dark:text-gray-500 flex items-center gap-1 mt-1">
                              <Calendar size={12} />{" "}
                              {formatDate(purchase.createdAt.toString())}
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${StatusConfig.bg} ${StatusConfig.text}`}
                          >
                            <StatusIcon size={12} />
                            {purchase.status}
                          </span>
                        </td>

                        {/* Amount */}
                        <td className="px-6 py-4 text-right">
                          <span className="font-extrabold text-on-surface dark:text-white text-base">
                            {formatRupees(purchase.amount)}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Footer */}
        {meta && meta.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-outline-variant/15 dark:border-white/5 bg-surface-container-low dark:bg-[#182030] flex items-center justify-between">
            <p className="text-xs text-on-surface-variant dark:text-gray-500 font-body">
              Showing{" "}
              <span className="font-bold text-on-surface dark:text-white">
                {(meta.page - 1) * meta.limit + 1}
              </span>{" "}
              to{" "}
              <span className="font-bold text-on-surface dark:text-white">
                {Math.min(meta.page * meta.limit, meta.total)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-on-surface dark:text-white">
                {meta.total}
              </span>{" "}
              records
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1 || loading}
                className="p-2 rounded-lg bg-surface dark:bg-gray-800 text-on-surface dark:text-white border border-outline-variant/30 hover:bg-surface-container disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-semibold text-on-surface dark:text-white px-2">
                Page {meta.page} of {meta.totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(meta.totalPages, p + 1))
                }
                disabled={currentPage === meta.totalPages || loading}
                className="p-2 rounded-lg bg-surface dark:bg-gray-800 text-on-surface dark:text-white border border-outline-variant/30 hover:bg-surface-container disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
