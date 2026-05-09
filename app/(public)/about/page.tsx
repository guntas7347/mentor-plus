import Mentors from "@/components/Mentors";
import {
  ArrowRight,
  Eye,
  Rocket,
  BookOpen,
  GraduationCap,
  Award,
} from "lucide-react";

export default function About() {
  const stats = [
    {
      value: "94%",
      label: "Success Rate",
      valueClass: "text-primary dark:text-[#b5c4ff]",
    },
    {
      value: "1200+",
      label: "Selected Officers",
      valueClass: "text-secondary dark:text-[#10b981]",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="font-body text-primary dark:text-[#b5c4ff] font-bold tracking-widest uppercase text-xs mb-4 block">
              PUNJAB GOVERNMENT EXAMS
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold font-headline text-text dark:text-white leading-tight mb-6">
              Empowering Aspirants <br />
              <span className="text-primary dark:text-[#b5c4ff]">
                Shaping Futures.
              </span>
            </h1>
            <p className="text-lg text-text-muted dark:text-[#94a3b8] leading-relaxed mb-8">
              MentorPlus Coaching is Punjab's premier institute dedicated to
              preparing students for high-stakes government examinations. Our
              sanctuary of learning focuses on depth, discipline, and definitive
              results.
            </p>
          </div>
        </div>
        {/* Asymmetric abstract background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-br from-primary-fixed to-surface-container dark:from-[#1e293b] dark:to-[#0b1117] opacity-20 dark:opacity-40 -z-0 rounded-bl-[200px]"></div>
      </section>

      {/* Institute Introduction */}
      <section className="py-16 md:py-24 bg-surface dark:bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div
              className="aspect-[4/5] rounded-xl overflow-hidden shadow-xl"
              style={{ borderRadius: "40px 0 40px 40px" }}
            >
              <img
                alt="Learning Environment"
                className="w-full h-full object-cover"
                data-alt="Modern classroom with students studying"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo2Bd3eQUuBq9EKH1XeK5B6Ttub7xRfMeJS92Sl6diQsTxscRyMOSDiVsuUoaga8Hgdf2x2ZtoKxuEBZrX-x6JI9_ijzDTyI4VC3ZD62xhW-HA_8u-RXl_YKNbu8eGGbRHStAEc-O3Qm8tYvX6qYiOVOCAYieYRozg0X3MtqsN28a64YGMrKZoO8caTyaSvMaciuyCLHrKQtBfBDCY7IaYU352YfWbsZpIrXusGxa5V22NNvR5M4QEI2VcR4vVou8T7K8TasByFxK5"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white dark:bg-[#1e293b] p-8 rounded-xl shadow-2xl max-w-xs border-l-4 border-secondary dark:border-[#10b981]">
              <p className="text-text dark:text-white font-headline font-bold text-xl italic leading-tight">
                "Where education meets excellence and dreams meet destiny."
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-headline dark:text-white">
              A Legacy of Excellence
            </h2>
            <div className="space-y-4 text-text-muted dark:text-[#94a3b8] leading-relaxed">
              <p>
                Founded on the principles of integrity and rigorous academic
                standards, MentorPlus has emerged as a beacon of hope for
                thousands of aspirants in Punjab. We don't just teach; we
                mentor.
              </p>
              <p>
                Our methodology combines traditional pedagogical depth with
                modern analytical tools, ensuring that every student is equipped
                with the knowledge and the confidence to excel in competitive
                environments.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-4">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <span
                    className={`text-4xl font-extrabold font-headline block ${stat.valueClass}`}
                  >
                    {stat.value}
                  </span>
                  <span className="text-sm font-body tracking-wider uppercase dark:text-[#94a3b8]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Bento Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 bg-primary-dark dark:bg-[#1e3a8a] p-12 rounded-xl text-white relative overflow-hidden flex flex-col justify-end min-h-[400px]">
            <Rocket
              className="absolute top-12 left-12 text-6xl opacity-20"
              size={64}
            />
            <div className="relative z-10">
              <h3 className="text-3xl font-headline font-bold mb-4">
                Our Mission
              </h3>
              <p className="text-lg opacity-90 leading-relaxed">
                To democratize high-quality coaching and provide an unparalleled
                learning ecosystem that empowers every Punjab student to achieve
                their goal of serving in the government sector.
              </p>
            </div>
          </div>
          <div className="md:col-span-5 bg-surface dark:bg-[#1e293b] p-12 rounded-xl flex flex-col justify-between shadow-sm">
            <div>
              <Eye
                className="text-4xl text-primary dark:text-[#b5c4ff] mb-6"
                size={40}
              />
              <h3 className="text-2xl font-headline font-bold mb-4 dark:text-white">
                Our Vision
              </h3>
              <p className="text-text-muted dark:text-[#94a3b8]">
                To be recognized globally as the most student-centric exam
                preparation institute, fostering a culture of curiosity and
                relentless perseverance.
              </p>
            </div>
            <div className="pt-8">
              <hr className="border-gray-200 dark:border-[#334155] mb-6" />
              <div className="flex items-center space-x-2 text-primary dark:text-[#b5c4ff] font-bold cursor-pointer group">
                <span>Learn more about our values</span>
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentor Profiles */}
      <section className="py-16 md:py-24 bg-surface dark:bg-[#0b1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-body text-secondary dark:text-[#10b981] font-bold tracking-widest uppercase text-xs mb-4 block">
              EXPERT FACULTY
            </span>
            <h2 className="text-4xl font-extrabold font-headline mb-4 dark:text-white">
              Meet Your Mentors
            </h2>
            <p className="text-text-muted dark:text-[#94a3b8] max-w-2xl mx-auto">
              Our teachers are more than just subject experts; they are
              architects of success with decades of collective experience in
              government exam training.
            </p>
          </div>
          <Mentors />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-background dark:bg-[#0b1117]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface dark:bg-[#1e293b] p-12 rounded-3xl text-center shadow-lg">
            <h2 className="text-3xl font-headline font-extrabold mb-6 dark:text-white">
              Ready to start your journey with us?
            </h2>
            <p className="text-text-muted dark:text-[#94a3b8] mb-10 text-lg">
              Join MentorPlus today and experience the difference of structured
              learning and professional mentorship.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
              <button className="bg-primary-dark dark:bg-[#1e40af] text-white px-10 py-4 rounded-md font-bold text-lg hover:scale-[0.98] transition-all shadow-md">
                Book a Free Consultation
              </button>
              <button className="text-primary dark:text-[#b5c4ff] font-bold px-10 py-4 flex items-center group">
                Contact Us Today
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
