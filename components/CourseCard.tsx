import { formatRupees } from "@/lib/helpers";
import { CoursePreview } from "@/lib/types";
import { ArrowRight, BookX, Clock } from "lucide-react";
import Link from "next/link";

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

const CourseCard = ({ course }: { course: CoursePreview }) => {
  const hasDiscount =
    course.fullPrice > course.discountedPrice && course.fullPrice > 0;
  const discountPercent = hasDiscount
    ? Math.round(
        ((course.fullPrice - course.discountedPrice) / course.fullPrice) * 100,
      )
    : 0;
  return (
    <div
      key={course.id}
      className="bg-background dark:bg-[#121c28] rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 flex flex-col border border-gray-200 dark:border-white/5 hover:shadow-2xl hover:shadow-primary/10"
    >
      <div className="h-48 bg-surface dark:bg-[#1e2a3b] relative overflow-hidden">
        {course.thumbnailUrl ? (
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={course.thumbnailUrl}
            alt={course.title || "Course Thumbnail"}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted/50">
            <BookX size={48} />
          </div>
        )}

        {course.hotTag !== "None" && (
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
          {course.category || "Other"}
        </span>
        <h3 className="text-lg font-bold text-text dark:text-[#eaf1ff] mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-text-muted dark:text-[#a3b1c6] text-sm mb-6 flex-grow line-clamp-3">
          {course.summary}
        </p>

        <div className="flex items-end justify-between mb-6 pt-4 border-t border-gray-200/20 dark:border-white/10">
          {/* Left Side: Duration & Expiration Alert */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center text-text-muted dark:text-[#a3b1c6] text-sm font-medium">
              <Clock size={16} className="mr-1.5 text-text-muted opacity-70" />
              {course.durationMonths || 1} Months
            </div>

            {/* Optional: Show an indicator if the discount is expiring soon */}
            {course.validTill && new Date(course.validTill) > new Date() && (
              <span className="text-[10px] font-bold text-rose-500 dark:text-rose-400 uppercase tracking-wider">
                Offer ends soon
              </span>
            )}
          </div>

          {/* Right Side: Pricing */}
          <div className="flex flex-col items-end text-right">
            {hasDiscount && (
              <span className="text-xs text-text-muted dark:text-gray-500 line-through mb-0.5">
                {formatRupees(course.fullPrice)}
              </span>
            )}

            <div className="flex items-center gap-2">
              {hasDiscount && (
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-md">
                  {discountPercent}% OFF
                </span>
              )}
              <span className="text-xl font-extrabold text-text dark:text-[#eaf1ff]">
                {formatRupees(course.discountedPrice)}
              </span>
            </div>
          </div>
        </div>

        <Link
          href={`/courses/${course.slug}`}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary/10 dark:bg-[#1a56db]/20 text-primary dark:text-[#b5c4ff] hover:bg-primary hover:text-white dark:hover:bg-[#1a56db] dark:hover:text-white font-bold rounded-xl transition-all active:scale-[0.98]"
        >
          Explore
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
};
export default CourseCard;
