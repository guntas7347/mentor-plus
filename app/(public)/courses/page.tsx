import { getAllPublishedCourses } from "@/lib/actions/courses";
import CourseExplorer from "../../../components/CourseExplorer"; // Adjust path as needed

export default async function CoursesPage() {
  const courses = await getAllPublishedCourses();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Hero Title Section */}
      <section className="mb-16 text-center md:text-left">
        <span className="text-xs font-bold tracking-widest text-primary dark:text-[#b5c4ff] uppercase mb-4 block">
          EXPERT GUIDANCE
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface dark:text-[#eaf1ff] leading-tight mb-6">
          Master Your Future with <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container dark:from-[#b5c4ff] dark:to-[#1a56db]">
            Strategic Learning
          </span>
        </h1>
        <p className="text-on-surface-variant dark:text-[#a3b1c6] text-base md:text-lg max-w-2xl mx-auto md:mx-0">
          Choose from our expertly curated courses designed to help you crack
          competitive exams with confidence and precision.
        </p>
      </section>

      {/* Mount Interactive Client Component here */}
      <CourseExplorer initialCourses={courses} />

      {/* CTA Newsletter */}
      <section
        className="mt-24 rounded-3xl overflow-hidden relative shadow-xl"
        style={{
          background: "linear-gradient(135deg, #003fb1 0%, #1a56db 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        ></div>
        <div className="relative px-8 py-16 md:px-12 md:py-20 text-center text-white max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Not sure which course is right for you?
          </h2>
          <p className="text-blue-100 dark:text-[#dbe1ff] mb-10 text-lg max-w-2xl mx-auto">
            Speak with our expert career counselors today and get a personalized
            learning roadmap for your target exams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-secondary-container dark:bg-[#85f8c4] text-on-secondary-container dark:text-[#002114] font-bold rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              Book Free Counseling
            </button>
            <button className="px-8 py-4 bg-white/10 border border-white/20 backdrop-blur-md text-white font-bold rounded-xl hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
