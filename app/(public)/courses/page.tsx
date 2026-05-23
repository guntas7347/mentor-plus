import { getAllPublishedCourses } from "@/lib/actions/courses";
import CourseExplorer from "../../../components/CourseExplorer"; // Adjust path as needed
import { ArrowRight, BookOpen, Compass, Download } from "lucide-react";
import { getMeta } from "@/lib/actions/meta";

// ==========================================
// 1. CENTRALIZED DATA CONFIGURATION
// ==========================================
const PAGE_DATA = {
  hero: {
    tagline: "Expert Guidance",
    title: "Master Your Future with",
    highlight: "Strategic Learning",
    description:
      "Choose from our expertly curated courses designed to help you crack competitive exams with confidence and precision.",
  },
  cta: {
    title: "Not sure which course is right for you?",
    description:
      "Speak with our expert career counselors today and get a personalized learning roadmap for your target exams.",
    primaryButton: "Book Free Counseling",
    secondaryButton: "Download Brochure",
  },
};

// ==========================================
// 2. MODULAR SECTIONS
// ==========================================

const HeroSection = () => (
  <section className="relative mb-20 text-center md:text-left pt-12">
    <div className="relative z-10">
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-body font-bold tracking-widest uppercase mb-6">
        <Compass size={14} />
        {PAGE_DATA.hero.tagline}
      </span>
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-headline text-text leading-[1.15] mb-6">
        {PAGE_DATA.hero.title} <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          {PAGE_DATA.hero.highlight}
        </span>
      </h1>
      <p className="text-text-muted font-body text-lg md:text-xl max-w-2xl mx-auto md:mx-0 leading-relaxed">
        {PAGE_DATA.hero.description}
      </p>
    </div>

    {/* Subtle Decorative Element */}
    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
  </section>
);

const CTASection = () => (
  <section className="mt-24 rounded-[2.5rem] overflow-hidden relative shadow-2xl shadow-primary/20 bg-gradient-to-br from-primary via-primary-dark to-black">
    {/* Abstract Dot Pattern */}
    <div
      className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle at 2px 2px, white 2px, transparent 0)",
        backgroundSize: "32px 32px",
      }}
    ></div>

    <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-center max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline text-white mb-6">
        {PAGE_DATA.cta.title}
      </h2>
      <p className="text-white/80 font-body text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
        {PAGE_DATA.cta.description}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-headline font-bold text-lg rounded-xl shadow-xl hover:bg-surface hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group">
          {PAGE_DATA.cta.primaryButton}
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
        <button className="w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/20 backdrop-blur-md text-white font-headline font-bold text-lg rounded-xl hover:bg-white/20 hover:border-white/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
          <Download size={20} />
          {PAGE_DATA.cta.secondaryButton}
        </button>
      </div>
    </div>
  </section>
);

// ==========================================
// 3. MAIN PAGE COMPONENT
// ==========================================

export default async function CoursesPage() {
  const courses = await getAllPublishedCourses();

  const categories = (await getMeta("categories"))?.value as string[];

  return (
    <main className="min-h-screen bg-background text-text transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <HeroSection />

        {/* 
          Since we are mapping theme colors to CSS variables, 
          CourseExplorer doesn't need 'dark:' classes either. 
          Make sure it uses 'bg-surface', 'bg-background', 'text-text', etc. 
        */}
        <CourseExplorer
          initialCourses={courses}
          categories={["All Courses", ...categories]}
        />

        <CTASection />
      </div>
    </main>
  );
}
