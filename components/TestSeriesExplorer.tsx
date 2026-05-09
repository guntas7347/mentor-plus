"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Clock, ArrowRight, Plus, BookX } from "lucide-react";

// Updated type to reflect the required fields and exclude raw JSON mapping
type TestSeries = {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string | null;
  description: string | null;
  thumbnailUrl: string | null;
  fullPrice: number;
  discountedPrice: number;
  validityMonths: number;
  hotTag?: string | null;
};

// Extracted formatting and styling helpers
const formatRupees = (amount: number) => {
  if (amount === 0) return "Free";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

function getBadgeClasses(tag?: string | null) {
  switch (tag) {
    case "Best Seller":
      return "bg-amber-500 text-amber-950";
    case "New":
      return "bg-emerald-500 text-emerald-950";
    case "Trending":
      return "bg-indigo-500 text-white";
    case "Limited":
      return "bg-rose-500 text-white";
    default:
      return "bg-primary text-white";
  }
}

export default function TestSeriesExplorer({
  initialTests,
}: {
  initialTests: TestSeries[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Exams");

  // Extract unique categories from DB, plus "All Exams"
  const categories = useMemo(
    () => [
      "All Exams",
      ...Array.from(new Set(initialTests.map((t) => t.category))),
    ],
    [initialTests],
  );

  // Real-time filtering logic
  const filteredTests = useMemo(() => {
    return initialTests.filter((test) => {
      const searchLower = searchQuery.toLowerCase().trim();
      const title = test.title?.toLowerCase() || "";
      const summary = test.summary?.toLowerCase() || "";
      const description = test.description?.toLowerCase() || "";

      const matchesSearch =
        title.includes(searchLower) ||
        summary.includes(searchLower) ||
        description.includes(searchLower);

      const matchesCategory =
        activeCategory === "All Exams" || test.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialTests, searchQuery, activeCategory]);

  return (
    <>
      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto overflow-hidden">
          <span className="font-body text-sm text-text-muted dark:text-gray-500 font-semibold uppercase shrink-0">
            Filter by:
          </span>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-sm font-bold rounded-full whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary dark:bg-[#1a56db] text-white shadow-md shadow-primary/20"
                    : "bg-surface dark:bg-white/5 text-text-muted dark:text-gray-400 hover:bg-primary/10 dark:hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full md:w-80 shrink-0">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted dark:text-gray-500"
            size={18}
          />
          <input
            className="w-full pl-11 pr-4 py-3 bg-background dark:bg-[#121c28] border border-gray-200/50 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-[#1a56db]/60 transition-all text-sm text-text dark:text-[#eaf1ff] placeholder:dark:text-[#434654]"
            placeholder="Search test series..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Store Grid */}
      {filteredTests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTests.map((test) => {
            // Safely calculate discount to avoid NaN/Infinity
            const hasDiscount =
              test.fullPrice > test.discountedPrice && test.fullPrice > 0;
            const discountPercent = hasDiscount
              ? Math.round(
                  ((test.fullPrice - test.discountedPrice) / test.fullPrice) *
                    100,
                )
              : 0;

            return (
              <div
                key={test.id}
                className="group bg-background dark:bg-[#121c28] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 flex flex-col relative border border-gray-200 dark:border-white/5"
              >
                {/* Thumbnail & Hot Tag Header */}
                <div className="h-48 bg-surface dark:bg-[#1e2a3b] relative overflow-hidden">
                  {test.thumbnailUrl ? (
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={test.thumbnailUrl}
                      alt={test.title}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted/50">
                      <BookX size={48} />
                    </div>
                  )}

                  {test.hotTag! !== "None" && (
                    <div
                      className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${getBadgeClasses(
                        test.hotTag,
                      )}`}
                    >
                      {test.hotTag}
                    </div>
                  )}
                </div>

                {/* Card Body: Category, Title, Summary */}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[10px] font-bold text-primary dark:text-[#85f8c4] tracking-widest uppercase mb-2 block">
                    {test.category || "General"}
                  </span>
                  <h3 className="text-lg font-bold text-text dark:text-[#eaf1ff] mb-2 line-clamp-2">
                    {test.title}
                  </h3>
                  <p className="text-text-muted dark:text-[#a3b1c6] text-sm flex-grow line-clamp-3">
                    {test.summary ||
                      test.description ||
                      "Prepare efficiently with our comprehensive test series designed for your success."}
                  </p>
                </div>

                {/* Card Footer: Duration, Pricing & CTA */}
                <div className="px-6 pb-6 mt-auto">
                  <div className="flex items-end justify-between mb-6 pt-4 border-t border-gray-200/20 dark:border-white/10">
                    {/* Left: Duration */}
                    <div className="flex items-center text-text-muted dark:text-[#a3b1c6] text-sm font-medium">
                      <Clock
                        size={16}
                        className="mr-1.5 text-text-muted opacity-70"
                      />
                      {test.validityMonths || 12} Months
                    </div>

                    {/* Right: Pricing & Discount Percentage */}
                    <div className="flex flex-col items-end text-right">
                      {hasDiscount && (
                        <span className="text-xs text-text-muted dark:text-gray-500 line-through mb-0.5">
                          {formatRupees(test.fullPrice)}
                        </span>
                      )}

                      <div className="flex items-center gap-2">
                        {hasDiscount && (
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-md">
                            {discountPercent}% OFF
                          </span>
                        )}
                        <span className="text-xl font-extrabold text-text dark:text-[#eaf1ff]">
                          {formatRupees(test.discountedPrice)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/test-series/${test.slug}`}
                    className="w-full bg-primary/10 dark:bg-[#1a56db]/20 text-primary dark:text-[#b5c4ff] hover:bg-primary hover:text-white dark:hover:bg-[#1a56db] dark:hover:text-white px-6 py-3.5 rounded-xl font-bold flex justify-center items-center transition-all active:scale-[0.98] group-hover:shadow-md"
                  >
                    View Details
                    <ArrowRight
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                      size={18}
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-surface/30 dark:bg-white/5 rounded-2xl border-2 border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center justify-center p-12 text-center group">
          <div className="w-16 h-16 bg-surface dark:bg-white/10 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:rotate-12">
            <Search className="text-text-muted dark:text-gray-400" size={32} />
          </div>
          <h4 className="font-bold text-text dark:text-white text-lg">
            No Test Series Found
          </h4>
          <p className="text-sm text-text-muted dark:text-gray-400 mt-2 max-w-[250px] mx-auto">
            We couldn't find any tests matching your search. Try adjusting your
            filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All Exams");
            }}
            className="mt-6 px-6 py-2 bg-primary/10 dark:bg-white/10 text-primary dark:text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
}
