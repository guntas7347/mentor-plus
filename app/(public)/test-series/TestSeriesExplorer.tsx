"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  FileText,
  Clock,
  CheckCircle2,
  ArrowRight,
  Plus,
} from "lucide-react";

// Assuming your Prisma type looks roughly like this
type TestSeries = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string | null;
  thumbnailUrl: string | null;
  fullPrice: number;
  discountedPrice: number;
  currency: string;
  validityMonths: number;
  features: any; // JSON
  stats: any; // JSON
};

export default function TestSeriesExplorer({
  initialTests,
}: {
  initialTests: TestSeries[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Exams");

  // Extract unique categories from DB, plus "All Exams"
  const categories = [
    "All Exams",
    ...Array.from(new Set(initialTests.map((t) => t.category))),
  ];

  // Real-time filtering
  const filteredTests = useMemo(() => {
    return initialTests.filter((test) => {
      const matchesSearch =
        test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (test.description &&
          test.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory =
        activeCategory === "All Exams" || test.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialTests, searchQuery, activeCategory]);

  function formatPrice(price: number, currency: string) {
    if (price === 0) return "Free";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
      maximumFractionDigits: 0,
    }).format(price);
  }

  // Helper to generate a fallback gradient if no thumbnail is provided
  const getFallbackGradient = (index: number) => {
    const gradients = [
      "from-[#1e40af] to-[#1e3a8a] dark:from-[#0f172a] dark:to-[#1e40af]",
      "from-[#065f46] to-[#047857] dark:from-[#022c22] dark:to-[#065f46]",
      "from-[#7e22ce] to-[#581c87] dark:from-[#2e1065] dark:to-[#581c87]",
      "from-[#b45309] to-[#78350f] dark:from-[#451a03] dark:to-[#b45309]",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <>
      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto overflow-hidden">
          <span className="font-label text-sm text-outline dark:text-gray-500 font-semibold uppercase shrink-0">
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
                    : "bg-surface-container-high dark:bg-white/5 text-on-surface-variant dark:text-gray-400 hover:bg-primary/10 dark:hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full md:w-80 shrink-0">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-outline dark:text-gray-500"
            size={18}
          />
          <input
            className="w-full pl-11 pr-4 py-3 bg-surface-container-lowest dark:bg-[#121c28] border border-outline-variant/50 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-[#1a56db]/60 transition-all text-sm text-on-surface dark:text-[#eaf1ff] placeholder:dark:text-[#434654]"
            placeholder="Search test series..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Store Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTests.map((test, idx) => {
          // Parse JSON safely
          const features = (test.features as any[]) || [];
          const stats = (test.stats as any[]) || [];
          const hasDiscount = test.fullPrice > test.discountedPrice;

          return (
            <div
              key={test.id}
              className="group bg-surface-container-lowest dark:bg-[#121c28] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 flex flex-col relative border border-outline-variant/30 dark:border-white/5"
            >
              {/* Dynamic Badge (Sale/Discount) */}
              {hasDiscount && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider bg-rose-500 text-white shadow-md backdrop-blur-md">
                    Special Offer
                  </span>
                </div>
              )}

              {/* Card Header / Image */}
              <div
                className={`relative h-48 flex flex-col justify-end overflow-hidden bg-gradient-to-br ${getFallbackGradient(idx)}`}
              >
                {test.thumbnailUrl && (
                  <>
                    <img
                      src={test.thumbnailUrl}
                      alt={test.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  </>
                )}
                <div className="relative p-6 z-10">
                  <h3 className="text-white text-xl font-bold font-headline leading-tight line-clamp-2">
                    {test.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center space-x-4 mb-6 border-b border-outline-variant/20 dark:border-white/10 pb-4">
                  <div className="flex items-center text-on-surface-variant dark:text-gray-300">
                    <FileText
                      className="mr-2 text-primary dark:text-[#b5c4ff]"
                      size={18}
                    />
                    <span className="text-sm font-semibold">
                      {stats.length > 0
                        ? stats[0].value
                        : `${test.validityMonths} Months`}
                    </span>
                  </div>
                  <div className="flex items-center text-on-surface-variant dark:text-gray-300">
                    <Clock
                      className="mr-2 text-primary dark:text-[#b5c4ff]"
                      size={18}
                    />
                    <span className="text-sm font-semibold">
                      {test.validityMonths} Months
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                  {features.slice(0, 3).map((feat, fidx) => (
                    <li
                      key={fidx}
                      className="flex items-start text-sm text-on-surface-variant dark:text-gray-400"
                    >
                      <CheckCircle2
                        className="text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5"
                        size={16}
                      />
                      <span className="line-clamp-2">{feat.text || feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing & CTA */}
              <div className="p-6 pt-0 mt-auto">
                <div className="flex items-end justify-between mb-4">
                  <div className="flex flex-col">
                    {hasDiscount && (
                      <span className="text-xs text-outline dark:text-gray-500 line-through mb-0.5">
                        {formatPrice(test.fullPrice, test.currency)}
                      </span>
                    )}
                    <span className="text-2xl font-extrabold text-on-surface dark:text-white">
                      {formatPrice(test.discountedPrice, test.currency)}
                    </span>
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

        {/* Empty State / Coming Soon Placeholder */}
        <div className="bg-surface-container-low/30 dark:bg-white/5 rounded-2xl border-2 border-dashed border-outline-variant/30 dark:border-white/10 flex flex-col items-center justify-center p-12 text-center group">
          <div className="w-16 h-16 bg-surface-container dark:bg-white/10 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:rotate-12">
            <Plus className="text-outline dark:text-gray-400" size={32} />
          </div>
          <h4 className="font-bold text-on-surface dark:text-white text-lg">
            New Series Coming Soon
          </h4>
          <p className="text-sm text-on-surface-variant dark:text-gray-400 mt-2 max-w-[200px] mx-auto">
            Our experts are preparing new premium assessments. Stay tuned!
          </p>
        </div>
      </div>
    </>
  );
}
