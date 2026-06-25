import { getMeta } from "@/lib/actions/meta";
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
  Compass,
  Phone,
  ArrowRight,
} from "lucide-react";

export const revalidate = 3600; // 1 hour

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

// Helper to create safe URL hashes from category names
const getSlug = (text: string) => text.toLowerCase().replace(/\s+/g, "-");

export default async function SyllabusPage() {
  // 1. Fetch categories for top navigation
  const categoriesMeta = await getMeta("categories");
  const categories = (categoriesMeta?.value as string[]) || [];

  // 2. Fetch syllabus content
  let syllabusData: any[] = [];
  try {
    const data = await getAllPublishedSyllabus();
    syllabusData = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to load syllabus data:", error);
    syllabusData = [];
  }

  return (
    <main className="min-h-screen bg-background text-text transition-colors duration-300">
      {/* ==========================================
          HERO SECTION
      ========================================== */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-24 overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-body font-bold tracking-widest uppercase mb-6">
            <Compass size={14} />
            Exam Preparation Guide
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-headline font-extrabold tracking-tight leading-[1.1] mb-6">
            Master the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Curriculum
            </span>{" "}
            with Authority.
          </h1>
          <p className="text-lg md:text-xl font-body text-text-muted leading-relaxed mb-10">
            Detailed breakdown of exam patterns and subject-wise syllabus for
            Punjab Government, Banking, and Central Government exams. Stay ahead
            with our structured learning path.
          </p>

          {/* Dynamic Navigation Pills mapped strictly from `categories` */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {categories.map((cat: string, idx: number) => (
                <a
                  key={idx}
                  href={`#${getSlug(cat)}`}
                  className="px-6 py-3 bg-surface border border-gray-200 dark:border-white/5 text-text font-headline font-bold text-sm rounded-full hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                >
                  {cat}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Decorative Background Blob */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      </section>

      {/* ==========================================
          SYLLABUS SECTIONS
      ========================================== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24 mb-24">
        {syllabusData.length === 0 ? (
          // Empty State
          <div className="text-center py-24 bg-surface rounded-[2.5rem] border border-gray-200 dark:border-white/5 shadow-sm">
            <AlertCircle
              className="mx-auto text-text-muted mb-4 opacity-50"
              size={56}
            />
            <h3 className="text-2xl font-headline font-bold text-text mb-2">
              Check Back Soon
            </h3>
            <p className="text-text-muted font-body">
              Our experts are currently updating the syllabus resources for this
              term.
            </p>
          </div>
        ) : (
          syllabusData.map((categoryObj: any) => {
            const items = Array.isArray(categoryObj?.items)
              ? categoryObj.items
              : [];
            const categoryName = categoryObj?.category || "General";
            const sectionId = getSlug(categoryName);

            return (
              <section
                key={categoryObj.id}
                id={sectionId}
                className="scroll-mt-32"
              >
                {/* Section Header */}
                <div className="mb-10 border-b border-gray-200 dark:border-white/5 pb-6 flex items-end justify-between">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-text">
                      {categoryName}
                    </h2>
                    <p className="text-text-muted font-body mt-2">
                      {items.length}{" "}
                      {items.length === 1 ? "Document" : "Documents"} available
                    </p>
                  </div>
                </div>

                {/* Syllabus Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.length === 0 ? (
                    <div className="col-span-full py-12 px-6 text-center border-2 border-dashed border-gray-200 dark:border-white/5 rounded-3xl text-text-muted">
                      No documents have been added to this category yet.
                    </div>
                  ) : (
                    items.map((item: any, idx: number) => {
                      const Icon = ICON_MAP[item?.icon as string] || FileText;
                      const hasPdf = Boolean(
                        item?.pdfLink &&
                        typeof item.pdfLink === "string" &&
                        item.pdfLink.trim() !== "",
                      );

                      return (
                        <div
                          key={idx}
                          className="bg-surface p-8 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                        >
                          {/* Card Header */}
                          <div className="flex items-start gap-4 mb-4">
                            <div className="p-3.5 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                              <Icon size={24} />
                            </div>
                            <h3 className="font-headline font-bold text-xl text-text pt-1 leading-tight">
                              {item?.name || "Untitled Document"}
                            </h3>
                          </div>

                          {/* Card Description */}
                          <p className="text-text-muted font-body text-sm leading-relaxed mb-8 flex-grow">
                            {item?.description ||
                              "No description provided for this module."}
                          </p>

                          {/* Download Button */}
                          {hasPdf ? (
                            <a
                              href={item.pdfLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 w-full py-3.5 bg-background border border-gray-200 dark:border-white/5 text-text font-headline font-bold rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                            >
                              <Download
                                size={18}
                                className="group-hover:-translate-y-1 transition-transform"
                              />
                              Download PDF
                            </a>
                          ) : (
                            <button
                              disabled
                              className="flex items-center justify-center gap-2 w-full py-3.5 bg-background/50 border border-transparent text-text-muted/50 font-headline font-bold rounded-xl cursor-not-allowed"
                            >
                              <Download size={18} />
                              Unavailable
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

      {/* ==========================================
          CTA SECTION
      ========================================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="bg-gradient-to-br from-secondary to-secondary-dark p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-secondary/20">
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-extrabold text-white mb-4">
              Confused about the syllabus?
            </h2>
            <p className="text-white/80 font-body text-lg leading-relaxed">
              Speak to our expert mentors for a personalized exam strategy and
              preparation roadmap tailored to your goals.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
            <button className="bg-white text-secondary-dark px-8 py-4 rounded-xl font-headline font-bold hover:scale-105 transition-transform shadow-xl w-full sm:w-auto flex items-center justify-center gap-2">
              Book Free Demo <ArrowRight size={18} />
            </button>
            <button className="bg-black/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-headline font-bold border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
              <Phone size={18} /> Call Us
            </button>
          </div>

          {/* Abstract Texture Decor */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
          <div className="absolute left-0 bottom-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-3xl pointer-events-none"></div>
        </div>
      </section>
    </main>
  );
}
