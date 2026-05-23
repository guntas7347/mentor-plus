import Mentors from "@/components/Mentors";
import CourseCard from "@/components/CourseCard";
import { getAllPublishedCourses } from "@/lib/actions/courses";
import {
  PlayCircle,
  Star,
  ArrowRight,
  Users,
  BookOpen,
  MessageCircleQuestion,
  Headset,
  CheckCircle2,
  ChevronRight,
  Trophy,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

// ==========================================
// 1. CENTRALIZED DATA CONFIGURATION
// ==========================================
const PAGE_DATA = {
  // stats: [
  //   { id: "students", value: "5000+", label: "Students Selected", icon: Users },
  //   { id: "batches", value: "100+", label: "Ongoing Batches", icon: Target },
  //   { id: "mentors", value: "15+", label: "Expert Mentors", icon: Trophy },
  //   { id: "success", value: "98%", label: "Success Rate", icon: TrendingUp },
  // ],
  features: [
    {
      id: "mentors",
      icon: Users,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      title: "Experienced Mentors",
      description:
        "Learn from educators who have cleared these exams themselves and know the winning strategy.",
      offset: false,
    },
    {
      id: "material",
      icon: BookOpen,
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      title: "Premium Material",
      description:
        "Comprehensive study notes continuously updated according to the latest 2024 exam patterns.",
      offset: true,
    },
    {
      id: "tests",
      icon: MessageCircleQuestion,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
      title: "Weekly Mock Tests",
      description:
        "Real-time exam simulations with detailed performance analytics for every student.",
      offset: false,
    },
    {
      id: "support",
      icon: Headset,
      iconColor: "text-orange-600 dark:text-orange-400",
      iconBg: "bg-orange-100 dark:bg-orange-900/30",
      title: "24/7 Doubt Support",
      description:
        "Dedicated doubt clearing sessions via our community app and offline center.",
      offset: true,
    },
  ],
  advantages: [
    "Personalized learning paths for every student.",
    "Regular parent-teacher updates and tracking.",
    "Integrated offline and online learning modules.",
  ],
  testimonials: [
    {
      id: "t1",
      quote:
        "MentorPlus changed my entire preparation strategy. The test series is very close to the actual SSC pattern. I cleared CGL 2023 only because of Vikram Sir's reasoning tricks.",
      initials: "AM",
      name: "Aman Malik",
      achievement: "Cleared SSC CGL 2023",
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    },
    {
      id: "t2",
      quote:
        "Punjab Govt exams can be tricky, but the focus on Punjab GK here is unmatched. Simran ma'am makes even the toughest historical facts easy to remember.",
      initials: "HK",
      name: "Harman Kaur",
      achievement: "Selected, Punjab Revenue Dept",
      color:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
    },
    {
      id: "t3",
      quote:
        "The study material provided for IBPS PO is excellent. I didn't need any other books. The mock interview sessions really helped me gain confidence.",
      initials: "RS",
      name: "Rahul Sharma",
      achievement: "Probationary Officer, PNB",
      color:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
    },
    {
      id: "t4",
      quote:
        "The math shortcuts taught here saved me so much time during the actual exam. The environment is highly competitive yet supportive.",
      initials: "SJ",
      name: "Simranjit Singh",
      achievement: "Inspector, Cooperative Societies",
      color:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
    },
  ],
  updates: [
    {
      id: "u1",
      month: "June",
      date: "15",
      title: "Notification for PSSSB Clerk recruitment released.",
      desc: "Check eligibility and exam pattern details here.",
      isNew: true,
    },
    {
      id: "u2",
      month: "June",
      date: "12",
      title: "MentorPlus All-India Open Mock Test result.",
      desc: "Download the merit list and expert analysis PDF.",
      isNew: false,
    },
    {
      id: "u3",
      month: "June",
      date: "08",
      title: "New 'Current Affairs' capsule for Banking exams.",
      desc: "Download the monthly digest for May 2024.",
      isNew: false,
    },
  ],
};

// ==========================================
// 2. MODULAR SECTIONS
// ==========================================

const HeroSection = () => (
  <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-32">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="relative z-10">
        <span className="inline-block text-primary dark:text-primary font-body text-xs tracking-widest font-bold uppercase mb-6 bg-primary/10 dark:bg-primary/20 px-4 py-1.5 rounded-full">
          India's Premium Coaching Hub
        </span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-headline text-text dark:text-white leading-[1.1] mb-8">
          Master Your Future with{" "}
          <span className="text-primary dark:text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
            MentorPlus
          </span>
        </h1>
        <p className="text-lg text-text-muted dark:text-gray-400 max-w-xl mb-10 leading-relaxed font-body">
          Join the sanctuary of elite learning. We provide comprehensive
          preparation for SSC, Banking, and Punjab State Exams with a focus on
          conceptual clarity and rigorous practice.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
            Explore Courses
          </button>
          <button className="bg-surface dark:bg-white/5 border border-gray-200 dark:border-white/10 text-text dark:text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 group">
            <PlayCircle className="group-hover:scale-110 transition-transform text-primary" />
            Watch Demo
          </button>
        </div>
      </div>

      <div className="relative lg:ml-auto w-full max-w-lg">
        {/* Decorative Blurs */}
        <div className="absolute -top-12 -right-12 w-72 h-72 bg-secondary/20 dark:bg-secondary/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-primary/20 dark:bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Image Card */}
        <div className="relative bg-white dark:bg-gray-900 rounded-[2rem] p-3 shadow-2xl border border-gray-100 dark:border-gray-800">
          <div className="relative rounded-3xl overflow-hidden group">
            <img
              alt="Students studying at MentorPlus"
              className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnDKbwYR9mcKD43HFuBY8IZqGa12antZgf3cECsTxtGl-hz9Dy0ZO5XRSSeEOMvWsZSQT7mwFqwc0uBZbkbRh_-4Zqi7iM_vkwghW_ZMvdUq7zcupWU3dtbs2AzQ16vktf95smSTb34R_jttA48B3e-wl32tzvtGXSHYiPyBhsireWz05DRott-OONNxob_8CROwRmM3Tpre-9otDThA3d7i38QMP-L-l6O60tYgLNe0bKHKD3S_LdLCL1oYSKJbsPDvFrufjFGp0h"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Floating Review Card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700">
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" size={14} />
                ))}
              </div>
              <p className="text-sm font-semibold text-text dark:text-gray-100 leading-snug">
                "The best decision for my Punjab Govt exam prep. The mentors are
                absolutely unmatched."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// const StatsSection = () => (
//   <section className="px-6 lg:px-8 pb-16 md:pb-24 -mt-8 relative z-20">
//     <div className="max-w-7xl mx-auto">
//       <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100 dark:divide-gray-800">
//         {PAGE_DATA.stats.map((stat, idx) => {
//           const Icon = stat.icon;
//           return (
//             <div
//               key={stat.id}
//               className={`flex flex-col items-center text-center ${idx !== 0 ? "pl-8" : ""}`}
//             >
//               <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
//                 <Icon size={24} />
//               </div>
//               <h3 className="text-3xl md:text-4xl font-headline font-extrabold text-text dark:text-white mb-1">
//                 {stat.value}
//               </h3>
//               <p className="text-sm font-body font-semibold text-text-muted dark:text-gray-400 uppercase tracking-wider">
//                 {stat.label}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   </section>
// );

const FeaturesSection = () => (
  <section className="py-16 md:py-24 bg-surface dark:bg-black/50 border-y border-gray-100 dark:border-gray-900">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-24 items-center">
        {/* Left: Text Content */}
        <div>
          <span className="text-primary dark:text-primary font-body text-xs font-bold tracking-widest uppercase mb-4 block">
            The MentorPlus Advantage
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-headline mb-6 leading-tight text-text dark:text-white">
            Why students choose our sanctuary?
          </h2>
          <p className="text-text-muted dark:text-gray-400 text-lg leading-relaxed mb-8 font-body">
            We don't just teach subjects; we build mindsets. Our approach
            focuses on long-term retention and the psychology of exam-taking,
            ensuring you stay calm and focused on D-day.
          </p>
          <ul className="space-y-5 mb-10">
            {PAGE_DATA.advantages.map((adv, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <span className="font-semibold text-text dark:text-gray-200 text-lg">
                  {adv}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors group"
          >
            Learn more about our philosophy
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Right: Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PAGE_DATA.features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl dark:hover:border-gray-700 transition-all duration-300 hover:-translate-y-1 ${
                  feature.offset ? "sm:mt-12" : ""
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.iconBg} ${feature.iconColor}`}
                >
                  <Icon size={28} />
                </div>
                <h4 className="text-xl font-bold font-headline text-text dark:text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-text-muted dark:text-gray-400 leading-relaxed text-sm font-body">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-16 md:py-24 bg-background dark:bg-black overflow-hidden relative">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <span className="text-primary dark:text-primary font-body text-xs font-bold tracking-widest uppercase mb-4 block">
            Student Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-headline text-text dark:text-white">
            What our achievers say
          </h2>
        </div>
        <div className="flex gap-2 hidden md:flex">
          {/* Decorative scroll indicators for desktop */}
          <div className="w-12 h-2 rounded-full bg-primary"></div>
          <div className="w-4 h-2 rounded-full bg-gray-200 dark:bg-gray-800"></div>
          <div className="w-4 h-2 rounded-full bg-gray-200 dark:bg-gray-800"></div>
        </div>
      </div>

      {/* Snap Scrolling Container */}
      <div className="flex space-x-6 pb-8 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
        {PAGE_DATA.testimonials.map((test) => (
          <div
            key={test.id}
            className="min-w-[340px] md:min-w-[420px] snap-center bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex gap-1 text-yellow-500 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" size={18} />
                ))}
              </div>
              <p className="text-text-muted dark:text-gray-300 leading-relaxed mb-8 italic text-lg">
                "{test.quote}"
              </p>
            </div>
            <div className="flex items-center gap-4 mt-auto">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg tracking-wider ${test.color}`}
              >
                {test.initials}
              </div>
              <div>
                <h5 className="font-bold font-headline text-text dark:text-white text-lg">
                  {test.name}
                </h5>
                <p className="text-sm font-body text-text-muted dark:text-gray-400">
                  {test.achievement}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const UpdatesSection = () => (
  <section className="py-16 md:py-24 bg-surface dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-900">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-4">
          <span className="text-primary dark:text-primary font-body text-xs font-bold tracking-widest uppercase mb-4 block">
            Notice Board
          </span>
          <h2 className="text-4xl font-extrabold font-headline mb-6 text-text dark:text-white">
            Latest Updates
          </h2>
          <p className="text-text-muted dark:text-gray-400 mb-8 font-body leading-relaxed">
            Stay informed about upcoming exams, batch start dates, and result
            announcements.
          </p>
          <div className="p-6 bg-primary/10 dark:bg-primary/10 rounded-2xl border-l-4 border-primary">
            <h4 className="font-bold text-primary dark:text-primary mb-2 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              New Batch Alert!
            </h4>
            <p className="text-sm font-body text-text dark:text-gray-200">
              Offline SSC CGL Crash Course starting next Monday at our Ludhiana
              center. Seats filling fast.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-4">
          {PAGE_DATA.updates.map((update) => (
            <div
              key={update.id}
              className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 rounded-2xl bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer border border-gray-100 dark:border-gray-800 hover:shadow-md"
            >
              <div className="flex-shrink-0 w-20 h-20 bg-surface dark:bg-black rounded-xl flex flex-col items-center justify-center border border-gray-100 dark:border-gray-800">
                <span className="text-xs font-bold text-primary dark:text-primary uppercase tracking-wider">
                  {update.month}
                </span>
                <span className="text-2xl font-black font-headline text-text dark:text-white">
                  {update.date}
                </span>
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-bold text-xl font-headline group-hover:text-primary dark:group-hover:text-primary transition-colors text-text dark:text-white">
                    {update.title}
                  </h4>
                  {update.isNew && (
                    <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-muted dark:text-gray-400 font-body">
                  {update.desc}
                </p>
              </div>
              <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-full bg-gray-50 dark:bg-black items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <ChevronRight size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="px-6 lg:px-8 pb-16 md:pb-24">
    <div className="max-w-7xl mx-auto rounded-[2.5rem] bg-primary dark:bg-primary-dark p-10 md:p-20 relative overflow-hidden text-center shadow-2xl shadow-primary/20">
      {/* Decorative Background Icon */}
      <div className="absolute -top-24 -right-24 opacity-10 pointer-events-none transform rotate-12">
        <Target size={400} className="text-white" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-headline mb-6 text-white">
          Ready to secure your government job?
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-10 font-body">
          Take the first step towards a stable and prestigious career. Get a
          free counseling session with our experts today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-gray-50 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            Book Counseling <ArrowRight size={20} />
          </Link>
          <button className="w-full sm:w-auto border-2 border-white/20 text-white bg-black/10 backdrop-blur-sm px-8 py-4 rounded-xl font-bold text-lg hover:bg-black/20 hover:border-white/40 transition-all">
            Download Brochure
          </button>
        </div>
      </div>
    </div>
  </section>
);

// ==========================================
// 3. MAIN PAGE COMPONENT
// ==========================================

export default async function Home() {
  const featuredCourses = await getAllPublishedCourses(3);

  return (
    <main className="min-h-screen bg-background dark:bg-background-dark">
      <HeroSection />

      {/* <StatsSection /> */}

      {/* Featured Courses Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-primary dark:text-primary font-body text-xs font-bold tracking-widest uppercase mb-4 block">
                Excellence in Education
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold font-headline text-text dark:text-white">
                Featured Exam Programs
              </h2>
            </div>
            <Link
              href="/courses"
              className="group text-primary dark:text-primary font-bold flex items-center gap-2 hover:text-primary-dark transition-colors"
            >
              View All Courses
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />

      {/* Mentors Section (Imported Component) */}
      <section className="py-16 md:py-24 bg-surface dark:bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary dark:text-primary font-body text-xs font-bold tracking-widest uppercase mb-4 block">
              Learn From The Best
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-headline text-text dark:text-white">
              Meet Your Mentors
            </h2>
          </div>
          <Mentors />
        </div>
      </section>

      <TestimonialsSection />

      <UpdatesSection />

      <CTASection />
    </main>
  );
}
