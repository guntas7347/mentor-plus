"use client";

import { useState, useMemo } from "react";
import { Search, Clock, ArrowRight, BookX } from "lucide-react";
import Link from "next/link";
import { Course } from "@/prisma/generated/client";

export default function CourseExplorer({
  initialCourses,
}: {
  initialCourses: any;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Courses");

  function getCategories(): string[] {
    const set = new Set<string>();

    for (const item of initialCourses) {
      if (item.category) {
        set.add(item.category);
      }
    }

    return ["All Courses", ...Array.from(set)];
  }

  // Real-time filtering logic
  const filteredCourses = useMemo(() => {
    return initialCourses.filter((course: any) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.description &&
          course.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        activeCategory === "All Courses" || course.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialCourses, searchQuery, activeCategory]);

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
        return "hidden";
    }
  }

  function formatPrice(price: number, currency: string) {
    if (price === 0) return "Free";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
      maximumFractionDigits: 0,
    }).format(price);
  }

  return (
    <>
      {/* Filter & Search UI */}
      <section className="mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Horizontally scrollable filters on mobile */}
        <div className="flex overflow-x-auto pb-2 -mb-2 lg:pb-0 lg:mb-0 gap-3 no-scrollbar scroll-smooth">
          {getCategories().map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary dark:bg-[#1a56db] text-white shadow-md shadow-primary/20"
                  : "bg-surface-container-high dark:bg-white/5 text-on-surface-variant dark:text-[#a3b1c6] hover:bg-primary/10 dark:hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[300px] shrink-0">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-outline dark:text-[#737686]"
            size={18}
          />
          <input
            className="w-full pl-11 pr-4 py-3 bg-surface-container-lowest dark:bg-[#121c28] border border-outline-variant/50 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-primary/60 transition-all text-sm text-on-surface dark:text-[#eaf1ff] placeholder:dark:text-[#434654]"
            placeholder="Search for courses..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course: any) => (
            <div
              key={course.id}
              className="bg-surface-container-lowest dark:bg-[#121c28] rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 flex flex-col border border-outline-variant/30 dark:border-white/5 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="h-48 bg-surface-container dark:bg-[#1e2a3b] relative overflow-hidden">
                {course.thumbnailUrl ? (
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={course.thumbnailUrl}
                    alt={course.title}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-outline/50">
                    <BookX size={48} />
                  </div>
                )}

                {course.hotTag && (
                  <div
                    className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${getBadgeClasses(
                      course.hotTag,
                    )}`}
                  >
                    {course.hotTag}
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <span className="text-[10px] font-bold text-primary dark:text-[#85f8c4] tracking-widest uppercase mb-2 block">
                  {course.category}
                </span>
                <h3 className="text-lg font-bold text-on-surface dark:text-[#eaf1ff] mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-on-surface-variant dark:text-[#a3b1c6] text-sm mb-6 flex-grow line-clamp-3">
                  {course.description}
                </p>

                <div className="flex items-end justify-between mb-6 pt-4 border-t border-outline-variant/20 dark:border-white/10">
                  {/* Left Side: Duration & Expiration Alert */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-on-surface-variant dark:text-[#a3b1c6] text-sm font-medium">
                      <Clock
                        size={16}
                        className="mr-1.5 text-outline opacity-70"
                      />
                      {course.durationMonths} Months
                    </div>

                    {/* Optional: Show an indicator if the discount is expiring soon */}
                    {course.validTill &&
                      new Date(course.validTill) > new Date() && (
                        <span className="text-[10px] font-bold text-rose-500 dark:text-rose-400 uppercase tracking-wider">
                          Offer ends soon
                        </span>
                      )}
                  </div>

                  {/* Right Side: Pricing */}
                  <div className="flex flex-col items-end text-right">
                    {course.fullPrice > course.discountedPrice && (
                      <span className="text-xs text-on-surface-variant dark:text-gray-500 line-through mb-0.5">
                        {formatPrice(course.fullPrice, course.currency)}
                      </span>
                    )}

                    <div className="flex items-center gap-2">
                      {course.fullPrice > course.discountedPrice && (
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-md">
                          {Math.round(
                            ((course.fullPrice - course.discountedPrice) /
                              course.fullPrice) *
                              100,
                          )}
                          % OFF
                        </span>
                      )}
                      <span className="text-xl font-extrabold text-on-surface dark:text-[#eaf1ff]">
                        {formatPrice(course.discountedPrice, course.currency)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/courses/${course.slug}`}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary/10 dark:bg-[#1a56db]/20 text-primary dark:text-[#b5c4ff] hover:bg-primary hover:text-white dark:hover:bg-[#1a56db] dark:hover:text-white font-bold rounded-xl transition-all active:scale-[0.98]"
                >
                  Enroll Now
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 dark:border-white/10 rounded-3xl">
          <div className="bg-surface-container dark:bg-white/5 p-4 rounded-full mb-4">
            <Search size={32} className="text-outline dark:text-[#737686]" />
          </div>
          <h3 className="text-xl font-bold text-on-surface dark:text-[#eaf1ff] mb-2">
            No courses found
          </h3>
          <p className="text-on-surface-variant dark:text-[#a3b1c6]">
            We couldn't find any courses matching your current filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All Courses");
            }}
            className="mt-6 px-6 py-2 bg-primary dark:bg-white/10 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
}
