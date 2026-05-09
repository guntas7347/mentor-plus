"use client";

import { useState, useMemo } from "react";
import { Search, Clock, ArrowRight, BookX } from "lucide-react";
import Link from "next/link";
import { COURSE_CATEGORIES } from "@/lib/configs";
import { formatRupees } from "@/lib/helpers";
import { CoursePreview } from "@/lib/types";
import CourseCard from "./CourseCard";

// Hoisted outside to prevent recreation on every render

export default function CourseExplorer({
  initialCourses,
}: {
  initialCourses: CoursePreview[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Courses");

  // Dynamically build categories list including the "All Courses" default option
  const categories = useMemo(() => ["All Courses", ...COURSE_CATEGORIES], []);

  // Real-time filtering logic
  const filteredCourses = useMemo(() => {
    return initialCourses.filter((course) => {
      const searchLower = searchQuery.toLowerCase().trim();

      // Safely fallback to empty strings if properties are missing
      const title = course.title?.toLowerCase() || "";
      const summary = course.summary?.toLowerCase() || "";

      const matchesSearch =
        title.includes(searchLower) || summary.includes(searchLower);

      const matchesCategory =
        activeCategory === "All Courses" || course.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialCourses, searchQuery, activeCategory]);

  return (
    <>
      {/* Filter & Search UI */}
      <section className="mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Horizontally scrollable filters on mobile */}
        <div className="flex overflow-x-auto pb-2 -mb-2 lg:pb-0 lg:mb-0 gap-3 no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full hover:cursor-pointer font-semibold text-sm transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary dark:bg-[#1a56db] text-white shadow-md shadow-primary/20"
                  : "bg-surface dark:bg-white/5 text-text-muted dark:text-[#a3b1c6] hover:bg-primary/10 dark:hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[300px] shrink-0">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted dark:text-[#737686]"
            size={18}
          />
          <input
            className="w-full pl-11 pr-4 py-3 bg-background dark:bg-[#121c28] border border-gray-200/50 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-primary/60 transition-all text-sm text-text dark:text-[#eaf1ff] placeholder:dark:text-[#434654]"
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
          {filteredCourses.map((course) => {
            return <CourseCard key={course.id} course={course} />;
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-white/10 rounded-3xl">
          <div className="bg-surface dark:bg-white/5 p-4 rounded-full mb-4">
            <Search size={32} className="text-text-muted dark:text-[#737686]" />
          </div>
          <h3 className="text-xl font-bold text-text dark:text-[#eaf1ff] mb-2">
            No courses found
          </h3>
          <p className="text-text-muted dark:text-[#a3b1c6]">
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
