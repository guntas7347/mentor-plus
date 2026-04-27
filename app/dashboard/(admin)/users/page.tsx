"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Search,
  Download,
  Shield,
  Calendar,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  User as UserIcon,
  Eye,
} from "lucide-react";
import { getAllUsers } from "@/lib/actions/users";
import Link from "next/link";

// --- Types based on your Prisma Schema ---
type Role = "STUDENT" | "ADMIN" | "MENTOR"; // Adjust based on your actual roles

interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: Role;
  createdAt: string | Date;
}

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// --- UI Helpers ---
function formatDate(dateStr: string | Date) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
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

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);

  // State for Server-Side Search and Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce the search input to prevent spamming the database
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset to page 1 when a new search occurs
    }, 400); // 400ms delay
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch data whenever page or debounced search changes
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsers(currentPage, 25, debouncedSearch);
        setUsers(response.data as User[]);
        setMeta(response.meta);
      } catch (error) {
        console.error("Failed to load users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, debouncedSearch]);

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-headline font-bold text-on-surface dark:text-inverse-primary mb-1">
            User Management
          </h1>
          <p className="font-body text-sm text-on-surface-variant dark:text-outline">
            View and manage all registered students and administrators.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-high dark:bg-[#1f2937] text-on-surface dark:text-white font-label font-semibold text-sm border border-outline-variant/20 hover:bg-surface-container-highest transition-all shadow-sm">
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-surface-container-lowest dark:bg-[#1f2937] rounded-2xl shadow-sm border border-outline-variant/20 dark:border-white/5 overflow-hidden flex flex-col min-h-[600px]">
        {/* Toolbar (Search & Stats) */}
        <div className="p-4 border-b border-outline-variant/15 dark:border-white/5 bg-surface-container-low/50 dark:bg-[#182030]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-outline dark:text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface dark:bg-[#1f2937] border border-outline-variant/30 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm text-on-surface dark:text-white placeholder:dark:text-gray-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-on-surface-variant dark:text-gray-400 font-semibold bg-surface dark:bg-gray-800 px-4 py-2 rounded-lg border border-outline-variant/20 dark:border-gray-700">
            <Users size={16} className="text-primary dark:text-[#b5c4ff]" />
            <span>Total Users: {meta?.total || 0}</span>
          </div>
        </div>

        {/* Loading State or Table */}
        <div className="overflow-x-auto flex-grow">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 text-on-surface-variant dark:text-gray-400">
              <Users className="animate-pulse mb-4 text-primary" size={36} />
              <p className="font-medium text-sm">Loading users database...</p>
            </div>
          ) : (
            <table className="w-full text-sm font-body text-left whitespace-nowrap">
              <thead>
                <tr className="border-b border-outline-variant/15 dark:border-white/5 bg-surface-container-low dark:bg-[#182030]">
                  <th className="px-6 py-4 font-label font-semibold text-on-surface-variant dark:text-gray-400 text-xs uppercase tracking-wider">
                    User Details
                  </th>
                  <th className="px-6 py-4 font-label font-semibold text-on-surface-variant dark:text-gray-400 text-xs uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 font-label font-semibold text-on-surface-variant dark:text-gray-400 text-xs uppercase tracking-wider">
                    Joined Date
                  </th>
                  <th className="px-6 py-4 font-label font-semibold text-on-surface-variant dark:text-gray-400 text-xs uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 dark:divide-white/5">
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-on-surface-variant dark:text-gray-500"
                    >
                      No users found matching "{debouncedSearch}".
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-surface-container-low dark:hover:bg-[#182030] transition-colors duration-150 group"
                    >
                      {/* User Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 dark:bg-[#1a56db]/20 flex items-center justify-center shrink-0 border border-primary/20 dark:border-[#1a56db]/30 text-primary dark:text-[#b5c4ff] font-bold text-sm">
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
                          <div className="flex flex-col">
                            <span className="font-bold text-on-surface dark:text-white text-sm">
                              {user.name || "Unknown User"}
                            </span>
                            <span className="text-xs text-on-surface-variant dark:text-gray-400">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${
                            user.role === "ADMIN"
                              ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50"
                              : "bg-surface-variant dark:bg-gray-800 text-on-surface-variant dark:text-gray-300"
                          }`}
                        >
                          {user.role === "ADMIN" && <Shield size={12} />}
                          {user.role}
                        </span>
                      </td>

                      {/* Joined Date */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-on-surface-variant dark:text-gray-300 font-medium">
                          <Calendar size={14} className="opacity-70" />
                          <span>{formatDate(user.createdAt)}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/dashboard/users/${user.id}`}
                          className="p-2 text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-[#b5c4ff] hover:bg-primary/10 dark:hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <Eye size={18} />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Server-Side Pagination Footer */}
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
              users
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1 || loading}
                className="p-2 rounded-lg bg-surface dark:bg-gray-800 text-on-surface dark:text-white border border-outline-variant/30 hover:bg-surface-container disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <ChevronLeft size={16} />
              </button>

              <span className="text-sm font-semibold text-on-surface dark:text-white px-3 bg-surface dark:bg-gray-800 py-1.5 rounded-lg border border-outline-variant/30 shadow-sm">
                {meta.page}{" "}
                <span className="text-gray-400 font-normal mx-1">/</span>{" "}
                {meta.totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(meta.totalPages, p + 1))
                }
                disabled={currentPage === meta.totalPages || loading}
                className="p-2 rounded-lg bg-surface dark:bg-gray-800 text-on-surface dark:text-white border border-outline-variant/30 hover:bg-surface-container disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
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
