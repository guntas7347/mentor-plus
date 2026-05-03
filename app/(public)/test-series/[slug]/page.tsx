import { notFound } from "next/navigation";
import { getTestSeriesBySlug } from "@/lib/actions/test-series";
import {
  FileText,
  Layers,
  History,
  Radio,
  BrainCircuit,
  Timer,
  BarChart3,
  Download,
  Plus,
  Star,
  Calendar,
  MonitorSmartphone,
  Languages,
  ShieldCheck,
  Clock,
  CheckCircle,
} from "lucide-react";
import BuyTestSeries from "./buyTestSeries";
import { formatRupees } from "@/lib/helpers";

// --- Dynamic Icon Mapping ---
const ICON_MAP: Record<string, React.ElementType> = {
  FileText,
  Layers,
  History,
  Radio,
  BrainCircuit,
  Timer,
  BarChart3,
  Calendar,
  MonitorSmartphone,
  Languages,
  ShieldCheck,
  Clock,
  CheckCircle,
  Star,
};

// --- Theme Colors for Dynamic Data ---
const STAT_COLORS = [
  "text-blue-500",
  "text-purple-500",
  "text-amber-500",
  "text-emerald-500",
];

const ANALYTICS_COLORS = [
  "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
];

const REVIEW_COLORS = [
  "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
  "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
];

// Crash-proof initials generator
function getInitials(name?: string) {
  if (!name || typeof name !== "string" || !name.trim()) return "A";
  return name
    .trim()
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

type TestSeriesData = NonNullable<
  Awaited<ReturnType<typeof getTestSeriesBySlug>>
>;

export default async function TestSeriesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data: TestSeriesData | null = await getTestSeriesBySlug(slug);

  if (!data) {
    notFound();
  }

  // --- Safe Calculations ---
  const fullPrice = Number(data.fullPrice) || 0;
  const discountedPrice = Number(data.discountedPrice) || 0;
  const discountPercentage =
    fullPrice > discountedPrice && fullPrice > 0
      ? Math.round(((fullPrice - discountedPrice) / fullPrice) * 100)
      : 0;

  // Safe Date Validation
  const validTillDate = data.validTill ? new Date(data.validTill) : null;
  const isOfferValid =
    validTillDate &&
    !isNaN(validTillDate.getTime()) &&
    validTillDate > new Date();

  // --- Safe JSON Array Parsing (Protects against DB corruption) ---
  const stats = Array.isArray(data.stats) ? data.stats : [];
  const analytics = Array.isArray(data.analytics) ? data.analytics : [];
  const phases = Array.isArray(data.phases) ? data.phases : [];
  const reviews = Array.isArray(data.reviews) ? data.reviews : [];
  const features = Array.isArray(data.features) ? data.features : [];

  return (
    <main className="pt-24 pb-32 max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-16">
          {/* Hero Section */}
          <section>
            <span className="inline-block px-3 py-1 mb-6 text-[10px] font-bold uppercase tracking-widest text-primary dark:text-[#b5c4ff] bg-primary/10 dark:bg-[#1a56db]/20 rounded-full">
              {data.category || "Uncategorized"}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface dark:text-white tracking-tight leading-tight mb-6">
              {data.title || "Untitled Test Series"}
            </h1>
            <p className="text-lg text-on-surface-variant dark:text-gray-300 max-w-2xl leading-relaxed mb-10">
              {data.description || "No description provided."}
            </p>

            {/* Bento Stats Grid */}
            {stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat: any, idx: any) => {
                  const Icon = ICON_MAP[stat?.icon as string] || FileText;
                  const colorTheme = STAT_COLORS[idx % STAT_COLORS.length];

                  return (
                    <div
                      key={idx}
                      className={`bg-surface-container-low dark:bg-[#121c28] p-6 rounded-2xl text-center border border-outline-variant/20 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow ${stat?.highlight ? "border-b-4 border-b-emerald-500 dark:border-b-emerald-400 relative overflow-hidden" : ""}`}
                    >
                      {stat?.highlight && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />
                      )}
                      <Icon
                        className={`mx-auto mb-3 ${colorTheme}`}
                        size={28}
                      />
                      <div className="text-2xl font-extrabold text-on-surface dark:text-white mb-1">
                        {stat?.value || "-"}
                      </div>
                      <div className="text-[11px] font-bold text-on-surface-variant dark:text-gray-400 uppercase tracking-widest">
                        {stat?.label || "Stat"}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Performance Analytics Section */}
          {analytics.length > 0 && (
            <section className="bg-surface-container-lowest dark:bg-[#121c28] rounded-3xl p-8 md:p-10 shadow-xl border border-outline-variant/20 dark:border-white/5 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-on-surface dark:text-white mb-8">
                  Beyond Just Scorecards
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {analytics.map((item: any, idx: any) => {
                    const Icon = ICON_MAP[item?.icon as string] || BrainCircuit;
                    const colorTheme =
                      ANALYTICS_COLORS[idx % ANALYTICS_COLORS.length];

                    return (
                      <div key={idx} className="space-y-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorTheme}`}
                        >
                          <Icon size={24} />
                        </div>
                        <h3 className="font-bold text-lg text-on-surface dark:text-white">
                          {item?.title || "Analytics Feature"}
                        </h3>
                        <p className="text-sm text-on-surface-variant dark:text-gray-400 leading-relaxed">
                          {item?.desc || ""}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Decorative Background Blob */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            </section>
          )}

          {/* Detailed Test Schedule */}
          {phases.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-8 border-b border-outline-variant/20 dark:border-white/10 pb-4">
                <h2 className="text-2xl font-bold text-on-surface dark:text-white">
                  Test Schedule & Pattern
                </h2>
                <button className="text-primary dark:text-[#b5c4ff] font-bold text-sm flex items-center gap-2 hover:underline">
                  <Download size={16} />
                  Download PDF
                </button>
              </div>

              <div className="space-y-2">
                {phases.map((phase: any, idx: any) => (
                  <div
                    key={idx}
                    className="group cursor-pointer border-b border-outline-variant/10 dark:border-white/5 last:border-0 pb-4"
                  >
                    <div className="flex items-center justify-between py-4 group-hover:px-4 transition-all duration-300">
                      <div className="flex items-center gap-6">
                        <span className="text-primary/30 dark:text-white/20 font-extrabold text-3xl font-mono">
                          {(idx + 1).toString().padStart(2, "0")}
                        </span>
                        <div>
                          <h4 className="font-bold text-lg text-on-surface dark:text-gray-200 group-hover:text-primary dark:group-hover:text-[#b5c4ff] transition-colors mb-1">
                            {phase?.title || "Phase"}
                          </h4>
                          <p className="text-sm text-on-surface-variant dark:text-gray-400">
                            {phase?.desc || ""}
                          </p>
                        </div>
                      </div>
                      <Plus
                        size={20}
                        className="text-outline dark:text-gray-500 transition-transform group-hover:rotate-90 group-hover:text-primary shrink-0 ml-4"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Student Reviews */}
          {reviews.length > 0 && (
            <section className="space-y-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant/20 dark:border-white/10 pb-6">
                <div>
                  <h2 className="text-3xl font-extrabold text-on-surface dark:text-white tracking-tight mb-2">
                    The Student Voice
                  </h2>
                  <p className="text-on-surface-variant dark:text-gray-400">
                    Verified feedback from our candidates.
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-surface-container-low dark:bg-[#121c28] border border-outline-variant/20 dark:border-white/5 px-5 py-3 rounded-full shadow-sm">
                  <div className="flex gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={16} className="fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-on-surface dark:text-white">
                    4.9/5 Average
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review: any, idx: any) => {
                  const colorTheme = REVIEW_COLORS[idx % REVIEW_COLORS.length];
                  return (
                    <div
                      key={idx}
                      className="bg-surface-container-lowest dark:bg-[#121c28] p-8 rounded-2xl space-y-5 border border-outline-variant/20 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${colorTheme}`}
                        >
                          {getInitials(review?.name)}
                        </div>
                        <div>
                          <h5 className="font-bold text-on-surface dark:text-white">
                            {review?.name || "Anonymous User"}
                          </h5>
                          {review?.role && (
                            <p className="text-[10px] text-primary dark:text-[#85f8c4] font-bold uppercase tracking-widest mt-0.5">
                              {review.role}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-on-surface-variant dark:text-gray-300 italic leading-relaxed flex-grow">
                        "{review?.comment || "Great experience!"}"
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:col-span-4">
          <aside className="sticky top-28 space-y-6">
            {/* Pricing Card */}
            <div className="bg-surface-container-lowest dark:bg-[#121c28] rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/20 dark:border-white/10">
              <div className="relative h-48 bg-surface-container dark:bg-gray-800">
                {data.thumbnailUrl ? (
                  <img
                    alt={data.title || "Thumbnail"}
                    className="w-full h-full object-cover opacity-90"
                    src={data.thumbnailUrl}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileText size={48} className="text-gray-500 opacity-50" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#121c28]/90 via-[#121c28]/40 to-transparent dark:from-[#0b111a]/90" />

                {isOfferValid && (
                  <div className="absolute bottom-4 left-6">
                    <span className="bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest shadow-md flex items-center gap-1.5">
                      <Clock size={14} /> Flash Sale Ending
                    </span>
                  </div>
                )}
              </div>

              <div className="p-8">
                <div className="flex items-baseline gap-3 mb-6 flex-wrap">
                  <span className="text-4xl font-extrabold text-on-surface dark:text-white">
                    {formatRupees(discountedPrice)}
                  </span>

                  {fullPrice > discountedPrice && (
                    <>
                      <span className="text-lg text-on-surface-variant dark:text-gray-500 line-through font-medium">
                        {formatRupees(fullPrice)}
                      </span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold text-xs bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-1 rounded-md tracking-wide">
                        {discountPercentage}% OFF
                      </span>
                    </>
                  )}
                </div>

                {features.length > 0 && (
                  <div className="space-y-4 mb-8 pt-2">
                    {features.map((feature: any, idx: any) => {
                      const Icon =
                        ICON_MAP[feature?.icon as string] || CheckCircle;
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-3 text-sm text-on-surface-variant dark:text-gray-300 font-medium"
                        >
                          <Icon
                            size={18}
                            className="text-primary dark:text-[#b5c4ff]"
                          />
                          <span>{feature?.text || "Included Feature"}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <BuyTestSeries testSeriesId={data.id} slug={data.slug} />

                  {/* Safely Render Sample Link as an Anchor Tag */}
                  {data.sampleLink && (
                    <a
                      href={data.sampleLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center py-3.5 rounded-xl font-bold bg-surface-container-high dark:bg-white/5 text-on-surface dark:text-gray-200 border border-outline-variant/20 dark:border-white/5 hover:bg-surface-container-highest dark:hover:bg-white/10 transition-colors text-sm"
                    >
                      View Sample Test
                    </a>
                  )}
                </div>

                <div className="mt-6 flex items-start gap-2 bg-surface-container-low dark:bg-white/5 p-3 rounded-lg border border-outline-variant/10 dark:border-white/5">
                  <ShieldCheck
                    size={16}
                    className="text-emerald-500 shrink-0 mt-0.5"
                  />
                  <p className="text-xs text-on-surface-variant dark:text-gray-400 leading-relaxed">
                    30-day money back guarantee if content quality is found
                    poor.
                  </p>
                </div>
              </div>
            </div>

            {/* Countdown Timer Card (Only shows if validTill is set and in the future) */}
            {isOfferValid && (
              <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-6 border border-primary/10 dark:border-primary/20 shadow-sm">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Clock
                    size={18}
                    className="text-primary dark:text-[#b5c4ff]"
                  />
                  <span className="font-bold text-on-surface dark:text-white">
                    Enrollment closes in:
                  </span>
                </div>
                <div className="flex justify-between gap-3 text-center">
                  <div className="flex-1 bg-surface-container-lowest dark:bg-[#121c28] rounded-xl py-3 border border-outline-variant/20 dark:border-white/10 shadow-sm">
                    <span className="block text-2xl font-extrabold text-primary dark:text-[#b5c4ff]">
                      02
                    </span>
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant dark:text-gray-400 tracking-wider">
                      Days
                    </span>
                  </div>
                  <div className="flex-1 bg-surface-container-lowest dark:bg-[#121c28] rounded-xl py-3 border border-outline-variant/20 dark:border-white/10 shadow-sm">
                    <span className="block text-2xl font-extrabold text-primary dark:text-[#b5c4ff]">
                      14
                    </span>
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant dark:text-gray-400 tracking-wider">
                      Hours
                    </span>
                  </div>
                  <div className="flex-1 bg-surface-container-lowest dark:bg-[#121c28] rounded-xl py-3 border border-outline-variant/20 dark:border-white/10 shadow-sm">
                    <span className="block text-2xl font-extrabold text-primary dark:text-[#b5c4ff]">
                      35
                    </span>
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant dark:text-gray-400 tracking-wider">
                      Mins
                    </span>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
