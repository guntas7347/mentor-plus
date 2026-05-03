"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Calendar,
  CreditCard,
  Clock,
  PlayCircle,
  AlertCircle,
  Trophy,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { getMyEnrolledTestSeries } from "@/lib/actions/test-series";
import { formatRupees } from "@/lib/helpers";

// --- Types based on your API response ---
type EnrolledTestSeriesResponse = Awaited<
  ReturnType<typeof getMyEnrolledTestSeries>
>;
type EnrolledTestSeries = Exclude<
  EnrolledTestSeriesResponse,
  { error: string }
>[number];

// --- Helpers ---
function formatDate(dateStr: string | Date | null | undefined) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function MyTestSeriesPage() {
  const [enrollments, setEnrollments] = useState<EnrolledTestSeries[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await getMyEnrolledTestSeries();
        if (response && !("error" in response)) {
          setEnrollments(response);
        } else {
          setEnrollments([]);
        }
      } catch (error) {
        console.error("Failed to fetch enrollments:", error);
        setEnrollments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-10 border-b border-outline-variant/20 dark:border-white/10 pb-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-primary/10 dark:bg-[#1a56db]/20 rounded-xl">
            <Trophy className="text-primary dark:text-[#b5c4ff]" size={28} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface dark:text-white tracking-tight">
              My Test Series
            </h1>
            <p className="text-on-surface-variant dark:text-gray-400 mt-1">
              Access your enrolled mock tests, track your progress, and continue
              practicing.
            </p>
          </div>
        </div>
      </header>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2
            className="animate-spin text-primary dark:text-[#1a56db] mb-4"
            size={40}
          />
          <p className="text-on-surface-variant dark:text-gray-400 font-medium">
            Loading your test series...
          </p>
        </div>
      ) : enrollments.length === 0 ? (
        // Empty State
        <div className="bg-surface-container-low dark:bg-[#121c28] rounded-3xl border-2 border-dashed border-outline-variant/30 dark:border-white/10 flex flex-col items-center justify-center p-16 text-center">
          <div className="w-20 h-20 bg-surface dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <FileText className="text-outline dark:text-gray-500" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-on-surface dark:text-white mb-2">
            No Test Series Found
          </h3>
          <p className="text-on-surface-variant dark:text-gray-400 max-w-md mx-auto mb-8">
            You haven't enrolled in any test series yet. Explore our store to
            find the perfect mock tests for your exams.
          </p>
          <Link
            href="/test-series"
            className="px-8 py-3.5 bg-primary dark:bg-[#1a56db] text-white rounded-xl font-bold shadow-md hover:scale-105 transition-transform"
          >
            Explore Test Series
          </Link>
        </div>
      ) : (
        // Grid Layout
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrollments.map((enrollment: any) => {
            // Treat null expiresAt as indefinite (never expires)
            const isExpired = enrollment.expiresAt
              ? new Date(enrollment.expiresAt) < new Date()
              : false;

            return (
              <div
                key={enrollment.id}
                className={`bg-surface-container-lowest dark:bg-[#121c28] rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col ${
                  isExpired
                    ? "border-outline-variant/20 dark:border-white/5 opacity-75 grayscale-[50%]"
                    : "border-outline-variant/30 dark:border-white/10 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30"
                }`}
              >
                {/* Thumbnail Header */}
                <div className="relative h-40 bg-surface-container dark:bg-gray-800 overflow-hidden">
                  {enrollment.testSeries.thumbnailUrl ? (
                    <img
                      src={enrollment.testSeries.thumbnailUrl}
                      alt={enrollment.testSeries.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-outline/30">
                      <FileText size={48} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20">
                      {enrollment.testSeries.category}
                    </span>
                  </div>

                  {isExpired && (
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider bg-rose-500 text-white shadow-md flex items-center gap-1">
                        <AlertCircle size={12} /> Expired
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-on-surface dark:text-white leading-tight mb-4 line-clamp-2">
                    {enrollment.testSeries.title}
                  </h3>

                  {/* Enrollment Details List */}
                  <div className="space-y-3 mb-6 flex-grow bg-surface-container-low/50 dark:bg-white/5 p-4 rounded-xl border border-outline-variant/10 dark:border-white/5">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-on-surface-variant dark:text-gray-400">
                        <Calendar size={16} />
                        <span>Purchased:</span>
                      </div>
                      <span className="font-semibold text-on-surface dark:text-gray-200">
                        {formatDate(enrollment.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-on-surface-variant dark:text-gray-400">
                        <CreditCard size={16} />
                        <span>Amount Paid:</span>
                      </div>
                      <span className="font-semibold text-on-surface dark:text-gray-200">
                        {formatRupees(enrollment.amount)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-on-surface-variant dark:text-gray-400">
                        <Clock
                          size={16}
                          className={isExpired ? "text-rose-500" : ""}
                        />
                        <span>Expires On:</span>
                      </div>
                      <span
                        className={`font-semibold ${isExpired ? "text-rose-500 dark:text-rose-400" : "text-on-surface dark:text-gray-200"}`}
                      >
                        {enrollment.expiresAt
                          ? formatDate(enrollment.expiresAt)
                          : "Lifetime Access"}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  {isExpired ? (
                    <Link
                      href={`/test-series/${enrollment.testSeries.slug}`}
                      className="w-full py-3.5 bg-surface-container-high dark:bg-gray-800 text-on-surface dark:text-gray-300 font-bold rounded-xl flex items-center justify-center transition-colors hover:bg-surface-container-highest"
                    >
                      Renew Subscription
                    </Link>
                  ) : (
                    <a
                      href={`/dashboard/play/${enrollment.testSeries.accessLink}`}
                      className="w-full py-3.5 bg-primary/10 dark:bg-[#1a56db]/20 text-primary dark:text-[#b5c4ff] hover:bg-primary hover:text-white dark:hover:bg-[#1a56db] dark:hover:text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all group relative overflow-hidden"
                    >
                      <PlayCircle
                        size={18}
                        className="group-hover:scale-110 transition-transform z-10"
                      />
                      <span className="z-10">Access Test Series</span>
                      <ArrowRight
                        size={16}
                        className="opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all absolute right-6 z-10"
                      />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
