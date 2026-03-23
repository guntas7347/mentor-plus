import {
  Search,
  FileText,
  Clock,
  CheckCircle2,
  ArrowRight,
  History,
  Video,
  Lightbulb,
  Award,
  Plus,
} from "lucide-react";

export default function TestSeries() {
  const categories = ["All Exams", "PSSSB", "PPSC", "Banking"];

  const testSeriesItems = [
    {
      badge: "Active Now",
      badgeClasses:
        "bg-secondary-container dark:bg-[#059669]/20 text-on-secondary-container dark:text-[#34d399] ring-1 ring-secondary/20 dark:ring-[#059669]/30",
      bgHeader:
        "bg-gradient-to-br from-primary to-primary-container dark:from-[#1e40af] dark:to-[#1e3a8a]",
      title: "Punjab Patwari 2024 Ultimate Mock Test Pack",
      meta1Icon: <FileText className="mr-2" size={20} />,
      meta1Text: "25 Full Tests",
      meta2Icon: <Clock className="mr-2" size={20} />,
      meta2Text: "12 Months",
      features: ["Latest PSSSB Exam Pattern", "Detailed Video Solutions"],
      oldPrice: "₹1,499",
      newPrice: "₹499",
    },
    {
      topBar: "h-4 bg-secondary dark:bg-[#059669]",
      bgHeader: "bg-surface-container-high dark:bg-[#334155]",
      title: "PPSC Inspector Cooperative Societies",
      titleColor: "text-on-surface dark:text-white",
      meta1Icon: <FileText className="mr-2" size={20} />,
      meta1Text: "15 Sectional Tests",
      meta2Icon: <History className="mr-2" size={20} />,
      meta2Text: "Previous Year Papers",
      features: [
        "Current Affairs Special Focus",
        "AI-Powered Performance Analysis",
      ],
      oldPrice: "₹2,999",
      newPrice: "₹999",
    },
    {
      badge: "Bestseller",
      badgeClasses: "bg-primary dark:bg-[#3b82f6] text-white right-4 left-auto",
      bgHeader:
        "bg-gradient-to-br from-secondary to-on-secondary-container dark:from-[#065f46] dark:to-[#047857]",
      title: "Quantitative Aptitude Master Series",
      meta1Icon: <FileText className="mr-2" size={20} />,
      meta1Text: "50+ Practice Sets",
      meta2Icon: <Video className="mr-2" size={20} />,
      meta2Text: "Trick Videos Included",
      features: ["Vedic Math Short Tricks", "Level-wise Question Banking"],
      oldPrice: "₹999",
      newPrice: "₹299",
    },
    {
      bgHeader: "bg-surface-container-high dark:bg-[#334155]",
      title: "Reasoning Ability Booster Pack",
      titleColor: "text-on-surface dark:text-white",
      meta1Icon: <FileText className="mr-2" size={20} />,
      meta1Text: "30 Logic Sets",
      meta2Icon: <Lightbulb className="mr-2" size={20} />,
      meta2Text: "Concept Notes",
      features: ["Puzzle & Seating Specialist", "Updated 2024 Question Types"],
      oldPrice: "₹1,199",
      newPrice: "₹599",
    },
    {
      colSpan: "md:col-span-2 lg:col-span-1",
      badge: "Limited Offer",
      badgeClasses: "bg-error dark:bg-[#ef4444] text-white",
      bgHeader:
        "bg-gradient-to-r from-on-primary-fixed to-primary-container dark:from-[#0f172a] dark:to-[#1e40af]",
      title: "Master Punjab Govt. Exams Combo",
      meta1Icon: <FileText className="mr-2" size={20} />,
      meta1Text: "150+ Total Tests",
      meta2Icon: <Award className="mr-2" size={20} />,
      meta2Text: "Mentor Access",
      features: [
        "All PSSSB, PPSC & Punjab Police",
        "Lifetime Updates for 2024-25",
      ],
      oldPrice: "₹5,999",
      newPrice: "₹2,499",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Header Section */}
      <header className="mb-16">
        <div className="flex flex-col space-y-4">
          <span className="text-secondary dark:text-[#4ade80] font-label font-semibold tracking-widest text-xs uppercase">
            Premium Exam Resources
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-on-surface dark:text-white leading-tight tracking-tight">
            Store{" "}
            <span className="text-primary dark:text-[#60a5fa]">&amp;</span>{" "}
            Assessment
          </h1>
          <p className="text-on-surface-variant dark:text-gray-400 max-w-2xl text-lg font-body leading-relaxed">
            Exhaustive practice materials curated by top mentors to ensure you
            are exam-ready for Punjab Government and National Level
            competitions.
          </p>
        </div>
      </header>

      {/* Tab Switching UI */}
      <div className="flex items-center space-x-2 mb-12 p-1.5 bg-surface-container-low dark:bg-[#1e293b] rounded-xl w-fit">
        <button className="px-8 py-3 bg-surface-container-lowest dark:bg-[#334155] text-primary dark:text-[#60a5fa] font-bold rounded-lg shadow-sm transition-all duration-300">
          Test Series
        </button>
        <button className="px-8 py-3 text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-[#60a5fa] font-semibold rounded-lg transition-all duration-300">
          Study Material
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <span className="font-label text-sm text-outline dark:text-gray-500 font-semibold uppercase">
            Filter by:
          </span>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className={`px-4 py-1.5 text-sm font-bold rounded-full whitespace-nowrap cursor-pointer transition-colors ${
                  idx === 0
                    ? "bg-primary/10 dark:bg-[#3b82f6]/10 text-primary dark:text-[#60a5fa] border border-primary/20 dark:border-[#3b82f6]/20"
                    : "bg-surface-container-high dark:bg-[#1e293b] text-on-surface-variant dark:text-gray-400 hover:bg-surface-container-highest dark:hover:bg-[#334155]"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-outline dark:text-gray-500"
            size={20}
          />
          <input
            className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest dark:bg-[#1e293b] border-none rounded-xl focus:ring-2 focus:ring-primary/20 dark:focus:ring-[#3b82f6]/20 text-on-surface dark:text-white placeholder:dark:text-gray-500"
            placeholder="Search resources..."
            type="text"
          />
        </div>
      </div>

      {/* Store Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testSeriesItems.map((item, idx) => (
          <div
            key={idx}
            className={`group bg-surface-container-lowest dark:bg-[#1e293b] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] flex flex-col relative ${item.colSpan || ""}`}
          >
            {item.badge && (
              <div
                className={`absolute top-4 ${item.badgeClasses.includes("right-4") ? "right-4" : "left-4"} z-10`}
              >
                <span
                  className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter ${item.badgeClasses}`}
                >
                  {item.badge}
                </span>
              </div>
            )}
            {item.topBar && <div className={item.topBar}></div>}
            <div
              className={`h-48 ${item.bgHeader} p-8 flex flex-col justify-end overflow-hidden`}
            >
              <h3
                className={`${item.titleColor || "text-white"} text-2xl font-bold font-headline leading-tight`}
              >
                {item.title}
              </h3>
            </div>
            <div className="p-6 flex-grow">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-on-surface-variant dark:text-gray-400">
                  {item.meta1Icon}
                  <span className="text-sm font-semibold">
                    {item.meta1Text}
                  </span>
                </div>
                <div className="flex items-center text-on-surface-variant dark:text-gray-400">
                  {item.meta2Icon}
                  <span className="text-sm font-semibold">
                    {item.meta2Text}
                  </span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {item.features.map((feat, fidx) => (
                  <li
                    key={fidx}
                    className="flex items-center text-sm text-on-surface-variant dark:text-gray-400 italic"
                  >
                    <CheckCircle2
                      className="text-secondary dark:text-[#4ade80] mr-2 flex-shrink-0"
                      size={16}
                    />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 pt-0 flex items-center justify-between border-t border-outline-variant/10 dark:border-white/5">
              <div className="flex flex-col">
                <span className="text-xs text-outline dark:text-gray-500 line-through">
                  {item.oldPrice}
                </span>
                <span className="text-2xl font-extrabold text-on-surface dark:text-white">
                  {item.newPrice}
                </span>
              </div>
              <button className="bg-primary dark:bg-[#2563eb] text-white px-6 py-3 rounded-lg font-bold flex items-center hover:bg-primary-container dark:hover:bg-[#1d4ed8] transition-all">
                Buy Now
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </div>
        ))}

        {/* Empty State / Coming Soon Placeholder */}
        <div className="bg-surface-container-low/50 dark:bg-[#0f172a]/40 rounded-xl border-2 border-dashed border-outline-variant/30 dark:border-white/10 flex flex-col items-center justify-center p-12 text-center group">
          <div className="w-16 h-16 bg-surface-container-highest dark:bg-[#1e293b] rounded-full flex items-center justify-center mb-4 transition-transform group-hover:rotate-12">
            <Plus className="text-outline dark:text-gray-500" size={32} />
          </div>
          <h4 className="font-bold text-on-surface dark:text-white">
            New Series Coming Soon
          </h4>
          <p className="text-sm text-on-surface-variant dark:text-gray-400 mt-2">
            Sign up for notifications to be the first to know about new
            arrivals.
          </p>
        </div>
      </div>
    </main>
  );
}
