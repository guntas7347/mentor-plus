import {
  Download,
  Brain,
  ChevronDown,
  Calculator,
  FileText,
  BookOpen,
  Globe,
  Map,
  Plus,
  Gavel,
} from "lucide-react";

export default function Syllabus() {
  return (
    <>
      {/* Hero / Header Section */}
      <section className="max-w-7xl mx-auto px-8 mb-20 pt-16">
        <div className="max-w-3xl">
          <span className="text-primary dark:text-primary-fixed-dim font-label text-sm tracking-widest uppercase block mb-4">
            Exam Preparation Guide
          </span>
          <h1 className="text-5xl md:text-6xl font-headline font-extrabold text-on-background dark:text-surface-bright tracking-tight leading-tight mb-6">
            Master the{" "}
            <span className="text-primary dark:text-primary-fixed">
              Curriculum
            </span>{" "}
            with Authority.
          </h1>
          <p className="text-lg text-on-surface-variant dark:text-outline-variant leading-relaxed mb-8">
            Detailed breakdown of exam patterns and subject-wise syllabus for
            Punjab Government, Banking, and Central Government exams. Stay ahead
            with our structured learning path.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              className="px-6 py-3 bg-surface-container-high dark:bg-surface-container/10 text-on-primary-fixed-variant dark:text-primary-fixed rounded-md font-semibold hover:bg-primary-container dark:hover:bg-primary-container hover:text-white transition-all"
              href="#SSC-CGL"
            >
              SSC CGL
            </a>
            <a
              className="px-6 py-3 bg-surface-container-high dark:bg-surface-container/10 text-on-primary-fixed-variant dark:text-primary-fixed rounded-md font-semibold hover:bg-primary-container dark:hover:bg-primary-container hover:text-white transition-all"
              href="#IBPS-PO"
            >
              IBPS PO
            </a>
            <a
              className="px-6 py-3 bg-surface-container-high dark:bg-surface-container/10 text-on-primary-fixed-variant dark:text-primary-fixed rounded-md font-semibold hover:bg-primary-container dark:hover:bg-primary-container hover:text-white transition-all"
              href="#PPSC"
            >
              PPSC
            </a>
          </div>
        </div>
      </section>

      {/* Exam Sections */}
      <div className="space-y-24">
        {/* SSC CGL Section */}
        <section
          className="bg-surface-container-low dark:bg-inverse-surface/20 py-20"
          id="SSC-CGL"
        >
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-headline font-bold text-on-background dark:text-surface-container-lowest mb-2">
                  SSC CGL Syllabus
                </h2>
                <p className="text-on-surface-variant dark:text-outline-variant">
                  Comprehensive Tier-I &amp; Tier-II coverage for Staff
                  Selection Commission.
                </p>
              </div>
              <button className="flex items-center gap-2 bg-white dark:bg-surface-container-high text-primary dark:text-primary-fixed-variant px-6 py-3 rounded-md font-semibold shadow-sm hover:shadow-md transition-all">
                <Download size={20} />
                Download Full PDF
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Reasoning Accordion Item */}
              <div className="bg-surface-container-lowest dark:bg-on-background p-8 rounded-xl border border-transparent dark:border-outline-variant/10 transition-all duration-300">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-headline font-bold flex items-center gap-3 dark:text-surface-bright">
                    <span className="p-2 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-fixed-dim rounded-lg">
                      <Brain size={24} />
                    </span>
                    Reasoning &amp; General Intelligence
                  </h3>
                  <ChevronDown
                    className="text-outline dark:text-outline-variant"
                    size={24}
                  />
                </div>
                <ul className="space-y-4 text-on-surface-variant dark:text-outline-variant">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary dark:bg-secondary-fixed-dim mt-2 flex-shrink-0"></span>
                    Analogy (Semantic, Symbolic, Number)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary dark:bg-secondary-fixed-dim mt-2 flex-shrink-0"></span>
                    Classification &amp; Venn Diagrams
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary dark:bg-secondary-fixed-dim mt-2 flex-shrink-0"></span>
                    Blood Relations &amp; Direction Sense
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary dark:bg-secondary-fixed-dim mt-2 flex-shrink-0"></span>
                    Coding-Decoding &amp; Missing Numbers
                  </li>
                </ul>
              </div>
              {/* Quantitative Aptitude */}
              <div className="bg-surface-container-lowest dark:bg-on-background p-8 rounded-xl border border-transparent dark:border-outline-variant/10 transition-all duration-300">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-headline font-bold flex items-center gap-3 dark:text-surface-bright">
                    <span className="p-2 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-fixed-dim rounded-lg">
                      <Calculator size={24} />
                    </span>
                    Quantitative Aptitude
                  </h3>
                  <ChevronDown
                    className="text-outline dark:text-outline-variant"
                    size={24}
                  />
                </div>
                <ul className="space-y-4 text-on-surface-variant dark:text-outline-variant">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary dark:bg-secondary-fixed-dim mt-2 flex-shrink-0"></span>
                    Number System &amp; Algebra
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary dark:bg-secondary-fixed-dim mt-2 flex-shrink-0"></span>
                    Arithmetic (Ratio, Percentage, Profit &amp; Loss)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary dark:bg-secondary-fixed-dim mt-2 flex-shrink-0"></span>
                    Geometry, Mensuration &amp; Trigonometry
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary dark:bg-secondary-fixed-dim mt-2 flex-shrink-0"></span>
                    Data Interpretation (DI)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* IBPS PO Section */}
        <section className="py-20" id="IBPS-PO">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-l-4 border-secondary dark:border-secondary-fixed-dim pl-6">
              <div>
                <h2 className="text-3xl font-headline font-bold text-on-background dark:text-surface-bright mb-2">
                  IBPS PO Syllabus
                </h2>
                <p className="text-on-surface-variant dark:text-outline-variant">
                  Focused curriculum for Probationary Officer Preliminary and
                  Main Exams.
                </p>
              </div>
              <button className="flex items-center gap-2 bg-surface-container-high dark:bg-surface-container/10 text-on-secondary-container dark:text-secondary-fixed px-6 py-3 rounded-md font-semibold hover:bg-secondary-container dark:hover:bg-secondary-container/20 transition-all">
                <FileText size={20} />
                Exam Pattern Guide
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* English */}
              <div className="bg-surface-container-lowest dark:bg-on-background p-8 rounded-xl shadow-sm border border-outline-variant/10 dark:border-outline-variant/20">
                <div className="mb-6">
                  <span className="p-3 bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-fixed-dim rounded-full inline-block mb-4">
                    <BookOpen size={24} />
                  </span>
                  <h3 className="text-xl font-headline font-bold dark:text-surface-bright">
                    English Language
                  </h3>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-label text-outline dark:text-outline-variant uppercase tracking-widest">
                    Key Topics
                  </p>
                  <p className="text-on-surface-variant dark:text-outline-variant">
                    Reading Comprehension, Error Detection, Cloze Test, Fillers,
                    Para Jumbles.
                  </p>
                </div>
              </div>
              {/* General Awareness */}
              <div className="bg-surface-container-lowest dark:bg-on-background p-8 rounded-xl shadow-sm border border-outline-variant/10 dark:border-outline-variant/20">
                <div className="mb-6">
                  <span className="p-3 bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-fixed-dim rounded-full inline-block mb-4">
                    <Globe size={24} />
                  </span>
                  <h3 className="text-xl font-headline font-bold dark:text-surface-bright">
                    Banking Awareness
                  </h3>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-label text-outline dark:text-outline-variant uppercase tracking-widest">
                    Key Topics
                  </p>
                  <p className="text-on-surface-variant dark:text-outline-variant">
                    Indian Banking System, RBI Functions, Monetary Policy,
                    Financial Markets, Current Affairs.
                  </p>
                </div>
              </div>
              {/* Download Callout */}
              <div className="bg-primary dark:bg-primary-container text-white p-8 rounded-xl flex flex-col justify-center items-center text-center">
                <h3 className="text-2xl font-headline font-bold mb-4">
                  Need the Full List?
                </h3>
                <p className="text-primary-fixed dark:text-surface-container-highest mb-8 opacity-90">
                  Get the 2024 detailed banking syllabus with weightage
                  analysis.
                </p>
                <button className="w-full bg-white dark:bg-surface-container-highest text-primary dark:text-primary-container py-3 rounded-md font-bold hover:bg-primary-fixed dark:hover:bg-white transition-colors">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* PPSC Section */}
        <section
          className="bg-surface-container-low dark:bg-inverse-surface/20 py-20"
          id="PPSC"
        >
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-secondary dark:text-secondary-fixed-dim font-label text-xs tracking-widest uppercase mb-2 block">
                  Punjab State Special
                </span>
                <h2 className="text-3xl font-headline font-bold text-on-background dark:text-surface-container-lowest mb-2">
                  PPSC (Civil Services &amp; Allied)
                </h2>
                <p className="text-on-surface-variant dark:text-outline-variant">
                  Detailed syllabus for Punjab Public Service Commission
                  recruitment.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              {/* Punjab GK Item */}
              <div className="bg-surface-container-lowest dark:bg-on-background rounded-xl overflow-hidden border border-transparent dark:border-outline-variant/10">
                <button className="w-full flex justify-between items-center p-8 hover:bg-surface-variant/20 dark:hover:bg-surface-container-high/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <Map
                      className="text-primary dark:text-primary-fixed-dim"
                      size={32}
                    />
                    <div className="text-left">
                      <h4 className="text-xl font-headline font-bold dark:text-surface-bright">
                        Punjab General Knowledge
                      </h4>
                      <p className="text-sm text-on-surface-variant dark:text-outline-variant">
                        History, Geography, Culture and Economy of Punjab
                      </p>
                    </div>
                  </div>
                  <Plus
                    className="text-outline dark:text-outline-variant"
                    size={24}
                  />
                </button>
                <div className="p-8 pt-0 border-t border-outline-variant/5 dark:border-outline-variant/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                    <div className="space-y-4">
                      <h5 className="font-bold text-primary dark:text-primary-fixed-dim">
                        History &amp; Culture
                      </h5>
                      <p className="text-on-surface-variant dark:text-outline-variant text-sm leading-relaxed">
                        Sufis, Saints and Gurus, Lodhis and Mughals, Sikh
                        Rulers, The British Period, Punjab in Independent India,
                        Punjabi Language and Literature.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h5 className="font-bold text-primary dark:text-primary-fixed-dim">
                        Economy &amp; Geography
                      </h5>
                      <p className="text-on-surface-variant dark:text-outline-variant text-sm leading-relaxed">
                        Agriculture and Irrigation, Physiography and Drainage,
                        Demographics, Industrial Development, State Budget and
                        Five Year Plans.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* General Studies */}
              <div className="bg-surface-container-lowest dark:bg-on-background rounded-xl overflow-hidden opacity-60 border border-transparent dark:border-outline-variant/10">
                <button className="w-full flex justify-between items-center p-8">
                  <div className="flex items-center gap-4">
                    <Gavel
                      className="text-outline dark:text-outline-variant"
                      size={32}
                    />
                    <div className="text-left">
                      <h4 className="text-xl font-headline font-bold dark:text-surface-bright">
                        General Studies (Polity &amp; Governance)
                      </h4>
                      <p className="text-sm text-on-surface-variant dark:text-outline-variant">
                        Indian Constitution, Federalism, PRIs and Public Policy
                      </p>
                    </div>
                  </div>
                  <Plus
                    className="text-outline dark:text-outline-variant"
                    size={24}
                  />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Mentorship CTA */}
      <section className="max-w-7xl mx-auto px-8 mt-24">
        <div className="bg-secondary dark:bg-tertiary-container p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-headline font-extrabold text-white mb-4">
              Confused about the syllabus?
            </h2>
            <p className="text-secondary-fixed dark:text-surface-container-low opacity-90 text-lg">
              Speak to our expert mentors for a personalized exam strategy and
              preparation roadmap.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4">
            <button className="bg-white dark:bg-surface-container-lowest text-secondary dark:text-tertiary-container px-8 py-4 rounded-md font-bold hover:bg-secondary-fixed dark:hover:bg-white transition-all">
              Book Free Demo
            </button>
            <button className="bg-on-secondary-fixed-variant dark:bg-on-tertiary-fixed-variant text-white px-8 py-4 rounded-md font-bold border border-white/20 hover:bg-secondary/50 transition-all">
              Call Us
            </button>
          </div>
          {/* Abstract Texture Decor */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute left-0 bottom-0 w-48 h-48 bg-black/5 rounded-full -ml-20 -mb-20"></div>
        </div>
      </section>
    </>
  );
}
