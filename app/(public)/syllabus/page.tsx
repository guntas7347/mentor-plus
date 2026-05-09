import { getAllPublishedSyllabus } from "@/lib/actions/syllabus";
import {
  Download,
  Calculator,
  FileText,
  BookOpen,
  Map,
  ShieldCheck,
  Landmark,
  Briefcase,
  AlertCircle,
} from "lucide-react";

// --- Dynamic Icon Mapping ---
const ICON_MAP: Record<string, React.ElementType> = {
  Calculator,
  FileText,
  BookOpen,
  Map,
  ShieldCheck,
  Landmark,
  Briefcase,
};

export default async function SyllabusPage() {
  // 1. Safe data fetching with fallback to prevent null `.map()` crashes
  let syllabusData: any[] = [];
  try {
    const data = await getAllPublishedSyllabus();
    syllabusData = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to load syllabus data:", error);
    syllabusData = []; // Fallback to empty state on error
  }

  return (
    <>
      {/* Hero / Header Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20 pt-16">
        <div className="max-w-3xl">
          <span className="text-primary dark:text-[#b5c4ff] font-body text-sm font-bold tracking-widest uppercase block mb-4">
            Exam Preparation Guide
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-extrabold text-text dark:text-white tracking-tight leading-tight mb-6">
            Master the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container dark:from-[#b5c4ff] dark:to-[#1a56db]">
              Curriculum
            </span>{" "}
            with Authority.
          </h1>
          <p className="text-lg text-text-muted dark:text-gray-300 leading-relaxed mb-8">
            Detailed breakdown of exam patterns and subject-wise syllabus for
            Punjab Government, Banking, and Central Government exams. Stay ahead
            with our structured learning path.
          </p>

          {/* Dynamic Anchor Links to Categories */}
          {syllabusData.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {syllabusData.map((cat: any) => {
                // 2. Safe string splitting: Fallback to "General" if category is null
                const categoryName = cat?.category || "General";
                const shortName = categoryName.split(" ")[0];

                return (
                  <a
                    key={cat.id}
                    href={`#${shortName}`}
                    className="px-6 py-3 bg-surface dark:bg-white/5 text-text dark:text-gray-200 rounded-xl font-semibold hover:bg-primary hover:text-white dark:hover:bg-[#1a56db] dark:hover:text-white transition-colors border border-transparent dark:border-white/5 shadow-sm"
                  >
                    {shortName}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Dynamic Syllabus Sections */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24 mb-24">
        {syllabusData.length === 0 ? (
          // Empty State
          <div className="text-center py-20 bg-surface dark:bg-[#121c28] rounded-3xl border border-gray-200/20 dark:border-white/5">
            <AlertCircle
              className="mx-auto text-text-muted dark:text-gray-500 mb-4"
              size={48}
            />
            <h3 className="text-2xl font-bold text-text dark:text-white mb-2">
              Check Back Soon
            </h3>
            <p className="text-text-muted dark:text-gray-400">
              Our experts are currently updating the syllabus resources.
            </p>
          </div>
        ) : (
          syllabusData.map((category: any) => {
            // 3. Safe array parsing for the JSON field
            const items = Array.isArray(category?.items) ? category.items : [];
            const categoryName = category?.category || "General";
            const shortName = categoryName.split(" ")[0];
            return (
              <section
                key={category.id}
                id={shortName}
                className="scroll-mt-32"
              >
                {/* Section Header */}
                <div className="mb-10 border-b border-gray-200 dark:border-white/10 pb-4">
                  <h2 className="text-3xl font-headline font-bold text-text dark:text-white">
                    {category?.category || "Uncategorized"}
                  </h2>
                </div>

                {/* Syllabus Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.length === 0 ? (
                    <p className="text-text-muted dark:text-gray-500 italic">
                      No syllabus documents added to this category yet.
                    </p>
                  ) : (
                    items.map((item: any, idx: number) => {
                      // 4. Safe property access for individual items
                      const Icon = ICON_MAP[item?.icon as string] || FileText;
                      const hasPdf = Boolean(
                        item?.pdfLink &&
                        typeof item.pdfLink === "string" &&
                        item.pdfLink.trim() !== "",
                      );

                      return (
                        <div
                          key={idx}
                          className="bg-background dark:bg-[#121c28] p-8 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                        >
                          {/* Card Header */}
                          <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-primary/10 dark:bg-[#1a56db]/20 text-primary dark:text-[#b5c4ff] rounded-xl group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                              <Icon size={24} />
                            </div>
                            <h3 className="font-bold text-xl text-text dark:text-white pt-1 leading-tight">
                              {item?.name || "Untitled Syllabus"}
                            </h3>
                          </div>

                          {/* Card Description */}
                          <p className="text-text-muted dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                            {item?.description || "No description provided."}
                          </p>

                          {/* Download Button */}
                          {hasPdf ? (
                            <a
                              href={item.pdfLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 w-full py-3.5 bg-surface dark:bg-white/5 text-text dark:text-gray-200 font-bold rounded-xl hover:bg-primary hover:text-white dark:hover:bg-[#1a56db] dark:hover:text-white transition-colors border border-gray-200/20 dark:border-transparent"
                            >
                              <Download
                                size={18}
                                className="group-hover:animate-bounce"
                              />
                              Download PDF
                            </a>
                          ) : (
                            <button
                              disabled
                              className="flex items-center justify-center gap-2 w-full py-3.5 bg-surface/30 dark:bg-white/5 text-text-muted/50 dark:text-gray-600 font-bold rounded-xl cursor-not-allowed border border-gray-200 dark:border-transparent"
                            >
                              <Download size={18} />
                              PDF Unavailable
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </section>
            );
          })
        )}
      </div>

      {/* Mentorship CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <div className="bg-secondary dark:bg-[#003fb1] p-10 md:p-14 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-white mb-4">
              Confused about the syllabus?
            </h2>
            <p className="text-white/80 text-lg">
              Speak to our expert mentors for a personalized exam strategy and
              preparation roadmap.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
            <button className="bg-white text-[#003fb1] px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg w-full sm:w-auto text-center">
              Book Free Demo
            </button>
            <button className="bg-transparent text-white px-8 py-4 rounded-xl font-bold border-2 border-white/30 hover:bg-white/10 transition-colors w-full sm:w-auto text-center">
              Call Us
            </button>
          </div>

          {/* Abstract Texture Decor */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
          <div className="absolute left-0 bottom-0 w-48 h-48 bg-black/10 rounded-full -ml-20 -mb-20 blur-2xl"></div>
        </div>
      </section>
    </>
  );
}
