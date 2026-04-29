import { notFound } from "next/navigation";
import {
  Star,
  Play,
  Clock,
  MonitorPlay,
  FileText,
  Download,
  ShieldCheck,
  Plus,
  BookOpen,
  Calculator,
  Globe2,
  Terminal,
  CheckCircle,
  Smartphone,
} from "lucide-react";
import { getCourseBySlug } from "@/lib/actions/courses";
import { formatRupees } from "@/lib/helpers";
import Link from "next/link";

// --- Reusable Media Component ---
// Automatically detects and renders video or image based on URL extension
export function CourseMedia({
  url,
  alt,
  className = "",
}: {
  url?: string | null;
  alt: string;
  className?: string;
}) {
  if (!url) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center bg-surface-container dark:bg-gray-800 text-on-surface-variant/30 ${className}`}
      >
        <MonitorPlay size={48} />
      </div>
    );
  }

  const isVideo = /\.(mp4|webm|ogg)$/i.test(url);

  if (isVideo) {
    return (
      <video
        src={url}
        autoPlay
        loop
        muted
        playsInline
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}

// --- Helpers ---
// Formats integer values to INR string without decimals

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen,
  Calculator,
  Globe2,
  Terminal,
  MonitorPlay,
  FileText,
  CheckCircle,
  Smartphone,
  ShieldCheck,
};

const OUTCOME_COLORS = [
  {
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    text: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
];

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  // --- Dynamic Calculations ---
  const discountPercentage =
    course.fullPrice > 0
      ? Math.round(
          ((course.fullPrice - course.discountedPrice) / course.fullPrice) *
            100,
        )
      : 0;

  const isOfferValid =
    course.validTill && new Date(course.validTill) > new Date();
  const validTillFormatted = course.validTill
    ? new Date(course.validTill).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const outcomes = (course.learningOutcomes as any[]) || [];
  const curriculum = (course.curriculum as any[]) || [];
  const features = (course.features as any[]) || [];

  const url = `https://wa.me/919876543210?text=${encodeURIComponent(`Hi, I am interested in ${course.title}`)}`;

  return (
    <main className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-16">
          {/* Hero Info */}
          <section className="space-y-6">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary dark:bg-[#1a56db]/20 dark:text-[#b5c4ff] text-[10px] font-bold uppercase tracking-widest rounded-full">
                {course.category || "Other"}
              </span>
              {course.hotTag !== "None" && (
                <span className="inline-flex items-center px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {course.hotTag}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface dark:text-white leading-tight tracking-tight">
                {course.title}
              </h1>
              {/* Subtitle moved directly below the title */}
              {course.subtitle && (
                <p className="text-xl md:text-2xl text-primary/80 dark:text-[#b5c4ff]/80 font-medium tracking-wide">
                  {course.subtitle}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center bg-surface-container-low dark:bg-gray-800/50 px-4 py-2 rounded-xl border border-outline-variant/20 dark:border-gray-700">
                {/* <Star
                  className="text-amber-500 mr-2 fill-amber-500"
                  size={18}
                />
                <span className="font-bold text-on-surface dark:text-white">
                  4.9
                </span>
                <span className="text-on-surface-variant dark:text-gray-400 ml-1.5 text-sm">
                  (2.4k Reviews)
                </span> */}
                Course Medium: {course.medium}
              </div>

              {course.instructors && course.instructors.length > 0 && (
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    {course.instructors.slice(0, 3).map((inst, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border-2 border-white dark:border-[#121c28] relative z-10 text-xs font-bold text-primary"
                      >
                        {inst.charAt(0)}
                      </div>
                    ))}
                  </div>
                  <span className="text-on-surface-variant dark:text-gray-400 font-medium text-sm">
                    By{" "}
                    <span className="text-primary dark:text-[#b5c4ff] font-bold">
                      {course.instructors[0]}
                    </span>
                    {course.instructors.length > 1 &&
                      ` +${course.instructors.length - 1} more`}
                  </span>
                </div>
              )}
            </div>

            <p className="text-lg text-on-surface-variant dark:text-gray-300 leading-relaxed max-w-3xl">
              {course.description}
            </p>
          </section>

          {/* Dynamic Learning Outcomes */}
          {outcomes.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-3xl font-bold text-on-surface dark:text-white">
                What you'll master
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {outcomes.map((outcome, idx) => {
                  const Icon = ICON_MAP[outcome.icon] || BookOpen;
                  const colorTheme =
                    OUTCOME_COLORS[idx % OUTCOME_COLORS.length];

                  return (
                    <div
                      key={idx}
                      className="p-6 bg-surface-container-lowest dark:bg-[#121c28] rounded-2xl shadow-sm border border-outline-variant/20 dark:border-white/5 flex items-start space-x-4 hover:shadow-md transition-shadow"
                    >
                      <div
                        className={`p-3 rounded-xl ${colorTheme.bg} ${colorTheme.text}`}
                      >
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-on-surface dark:text-white">
                          {outcome.title}
                        </h3>
                        <p className="text-on-surface-variant dark:text-gray-400 text-sm leading-relaxed">
                          {outcome.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Dynamic Curriculum */}
          {curriculum.length > 0 && (
            <section className="space-y-8">
              <div className="flex justify-between items-end border-b border-outline-variant/20 dark:border-white/10 pb-4">
                <h2 className="text-3xl font-bold text-on-surface dark:text-white">
                  Curriculum
                </h2>
                <span className="text-on-surface-variant dark:text-gray-400 font-medium text-sm flex items-center gap-2">
                  <Clock size={16} />
                  {course.durationMonths} Months • {curriculum.length} Modules
                </span>
              </div>
              <div className="space-y-2">
                {curriculum.map((module, idx) => (
                  <div
                    key={idx}
                    className="group cursor-pointer border-b border-outline-variant/10 dark:border-white/5 last:border-0 pb-4"
                  >
                    <div className="flex items-center justify-between py-4 group-hover:px-4 transition-all duration-300">
                      <div className="flex items-center space-x-5">
                        <span className="text-primary/30 dark:text-white/20 font-extrabold text-2xl font-mono">
                          {(idx + 1).toString().padStart(2, "0")}
                        </span>
                        <h3 className="text-lg font-bold text-on-surface dark:text-gray-200 group-hover:text-primary dark:group-hover:text-[#b5c4ff] transition-colors">
                          {module.title}
                        </h3>
                      </div>
                      <Plus
                        size={20}
                        className="text-outline dark:text-gray-500 transition-transform group-hover:rotate-90 group-hover:text-primary"
                      />
                    </div>
                    {module.lessons && module.lessons.length > 0 && (
                      <div className="pl-16 space-y-2 mt-2 hidden group-hover:block transition-all">
                        {module.lessons.map((lesson: any, lIdx: number) => (
                          <div
                            key={lIdx}
                            className="flex items-center gap-3 text-sm text-on-surface-variant dark:text-gray-400"
                          >
                            <Play size={12} className="text-primary/50" />
                            {lesson.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sticky Sidebar */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 space-y-6">
            {/* Main Action Card */}
            <div className="bg-surface-container-lowest dark:bg-[#121c28] rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/20 dark:border-white/10">
              {/* Media Container */}
              <div className="relative h-56 group overflow-hidden bg-surface-container dark:bg-gray-800">
                <CourseMedia
                  url={course.thumbnailUrl}
                  alt={course.title}
                  className="transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center pointer-events-none">
                  <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white ring-2 ring-white/40 group-hover:scale-110 transition-transform shadow-xl pointer-events-auto">
                    <Play size={28} className="ml-1 fill-white" />
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-4xl font-extrabold text-on-surface dark:text-white">
                      {formatRupees(course.discountedPrice)}
                    </span>
                    {course.fullPrice > course.discountedPrice && (
                      <>
                        <span className="text-on-surface-variant dark:text-gray-500 line-through font-medium text-lg">
                          {formatRupees(course.fullPrice)}
                        </span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold text-xs bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-1 rounded-md tracking-wide">
                          {discountPercentage}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  {isOfferValid && (
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs mt-2">
                      <Clock size={14} />
                      <span>Offer Valid Till: {validTillFormatted}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-2">
                  <Link
                    href={url}
                    target="_blank"
                    className="w-full inline-block bg-primary text-center dark:bg-[#1a56db] text-white py-4 rounded-xl font-extrabold text-base transition-all hover:opacity-90 active:scale-[0.98] shadow-lg shadow-primary/20"
                  >
                    Enroll Now
                  </Link>
                  {course.brochureUrl && (
                    <Link
                      href={course.brochureUrl}
                      target="_blank"
                      className="w-full bg-surface-container-high dark:bg-white/5 text-on-surface dark:text-gray-200 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors hover:bg-surface-container-highest dark:hover:bg-white/10 text-sm border border-outline-variant/20 dark:border-white/5"
                    >
                      <Download size={18} />
                      Download Broucher
                    </Link>
                  )}
                </div>

                {features.length > 0 && (
                  <div className="space-y-4 pt-6 border-t border-outline-variant/20 dark:border-white/10">
                    <h4 className="font-bold text-on-surface dark:text-white text-xs uppercase tracking-widest">
                      This Course includes:
                    </h4>
                    <ul className="space-y-3">
                      {features.map((feature, idx) => {
                        const Icon = ICON_MAP[feature.icon] || CheckCircle;
                        return (
                          <li
                            key={idx}
                            className="flex items-center gap-3 text-sm text-on-surface-variant dark:text-gray-300 font-medium"
                          >
                            <Icon
                              size={18}
                              className="text-primary dark:text-[#b5c4ff]"
                            />
                            {feature.text}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* <div className="p-5 bg-surface-container-low dark:bg-[#1e2a3b] rounded-2xl border border-outline-variant/20 dark:border-white/5 flex items-center gap-4">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl text-emerald-600 dark:text-emerald-400">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="font-bold text-sm text-on-surface dark:text-white">
                  30-Day Guarantee
                </p>
                <p className="text-xs text-on-surface-variant dark:text-gray-400 mt-0.5">
                  Not satisfied? Get a full refund, no questions asked.
                </p>
              </div>
            </div> */}
          </div>
        </aside>
      </div>
    </main>
  );
}
