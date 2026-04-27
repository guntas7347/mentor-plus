import {
  PlayCircle,
  Star,
  Clock,
  ArrowRight,
  Users,
  BookOpen,
  MessageCircleQuestion,
  Headset,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  const stats = [
    { value: "5000+", label: "Students Selected" },
    { value: "100+", label: "Ongoing Batches" },
    { value: "15+", label: "Expert Mentors" },
    { value: "98%", label: "Success Rate" },
  ];

  const featuredCourses = [
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAb44t-ouHYyI-sMvbC53Py_WJmMGH72G8Up8Ii9WJtKDfAp6Ey78NTCklM9hXGP2r6NcQ5TynwkzDr9MkPgZU-skBMbQeauCEsehz6wxI0CHIxwOOkCSq2yFSJ_GrmPHegG7QpVww6Bbwc1GhigT112vTFTNtT_-VB0mVUNWFy6GWQMxI7gRT7daDiJmCMjR0YZHOrbwp7vyCTfLnwlyTgQRMoSjC9jTpEYSyqQtAlJRPa61jyoEvF75-vOG9BAAOWUohQ8tMwwB8S",
      badge: "New Batch",
      badgeClasses:
        "bg-primary/10 dark:bg-primary/20 text-primary dark:text-inverse-primary",
      duration: "6 Months",
      title: "SSC CGL/CHSL Mastery",
      description:
        "Complete tier-1 & tier-2 coverage with daily practice sets and weekly full-length mocks.",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAkuGpk3A2LhyFCKWs272DmeBDC27oWLe1Ki6xGdqe5bD4k04JahD1DCPQtstw_EVfYdYqROxuaTDWtuKOQE8yo4k2kkWOAyiA0q9t2ATgW2qOMObI849cRpcOsf_6fVrAMZ1aeWKdgH1hTCuXLTUVUMtukUVhizWYVP-nm_F8IXai-HbPy9rHrtajjHjJj6g3GhlE22teLOq7UgR8b44buqv9o3pA8PnwZ4QLZ_Peose1oEodz5Rz9rWBlrA6gosYKOkk_6LoAIUKC",
      badge: "Banking Special",
      badgeClasses:
        "bg-secondary-container/30 dark:bg-secondary/20 text-secondary dark:text-secondary-fixed-dim",
      duration: "4 Months",
      title: "IBPS PO & Clerk Elite",
      description:
        "Special focus on Data Interpretation and Logical Reasoning with shortcuts from experts.",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCYsuJ2787JA-u28z1NluMjf6cNh4pJQy9QSbM5Il4bmSiyTgZVx6uDKuQTgNURkuMq5E6h_M_0kea-w3eG7o-6yHzDyj8PjGdSmS2rlyO9xRO3CdCxPIBlLk4wE6UcxJL9HLYVih61lM9GxKrkAQ6U0siDcJSb8lbvbajfF1PK8Nm2XUtEeAoOmKpJF7YBHU2UA_2c1vP7lzfbO0Riqid-yoET4RfBUmf3T4QmsZckiUs8AL-Kehqc7tL_M49ObwjG4dz6u6CELM0R",
      badge: "Punjab State",
      badgeClasses:
        "bg-tertiary-fixed dark:bg-tertiary/20 text-on-tertiary-fixed-variant dark:text-tertiary-fixed-dim",
      duration: "Lifetime Access",
      title: "PSSSB & PPSC Comprehensive",
      description:
        "Dedicated modules for Punjab GK, History, and Punjabi Language. Tailored for local exams.",
      lineColor: "bg-secondary dark:bg-secondary-fixed-dim",
    },
  ];

  const whyChooseUsFeatures = [
    {
      icon: <Users size={24} />,
      iconBg:
        "bg-primary/10 dark:bg-primary/20 text-primary dark:text-inverse-primary",
      title: "Experienced Mentors",
      description:
        "Learn from educators who have cleared these exams themselves and know the strategy.",
      translate: false,
    },
    {
      icon: <BookOpen size={24} />,
      iconBg:
        "bg-secondary-container/50 dark:bg-secondary/20 text-secondary dark:text-secondary-fixed-dim",
      title: "Premium Material",
      description:
        "Comprehensive study notes updated according to the latest 2024 exam patterns.",
      translate: true,
    },
    {
      icon: <MessageCircleQuestion size={24} />,
      iconBg:
        "bg-tertiary-fixed dark:bg-tertiary/20 text-on-tertiary-fixed-variant dark:text-tertiary-fixed-dim",
      title: "Weekly Mock Tests",
      description:
        "Real-time exam simulations with detailed performance analytics for every student.",
      translate: false,
    },
    {
      icon: <Headset size={24} />,
      iconBg:
        "bg-primary-fixed dark:bg-primary/20 text-primary dark:text-inverse-primary",
      title: "Doubt Support",
      description:
        "24/7 dedicated doubt clearing sessions via our community app and offline center.",
      translate: true,
    },
  ];

  const advantages = [
    "Personalized learning paths for every student.",
    "Regular parent-teacher updates and tracking.",
    "Integrated offline and online learning modules.",
  ];

  const mentors = [
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA4e7aR1700FNNE2hg4XAkvS8Js0e_YkHaEc3hkyODnIUilO-6rs8KhzmWgJV1wxf7RJ4KlhcXbxIGsD3q1GeU_MjGGBN5rL7U5rUzYSjILP81108B8danJc4vYO3ElaS5CwRtFrD6mrhbtmC12srO1EhpUJmgQeZaZ_evfrQErKQrZ_Cr66y2Axk9aQz985hk7MSugJAGRvxmLAsT_qI8HyeXmPDFmCfarT4COxEtFOXn0Nbcmiah21ulIoy8zbc7a49g1g_qxvgsu",
      name: "Rajesh Khanna",
      role: "Quants Expert (Ex-Bank PO)",
      desc: "12+ years of experience in making math simple.",
      bgClass: "bg-primary/20 dark:bg-primary/30",
      rotateClass: "rotate-6 group-hover:rotate-0",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAiCfz8lyaSr4wUd30Y1CDqGVySttPUmUDuj5Fdhle3kv7h_GTsOlkDTJ_cSr29ne8XDaxDvHXEGWhI0kOUgODOoks6-QrEwc4wWg0Z46FFPlR-5rw3x3Pz9RCokY2vYeLwWxUWpUkAghxUVbsdv8HGUN8kuNbCKLLNPjSftIiDLIJK1Uy2oBUPRP5uO3-HQnS3Wbd6f39fQisYr6sTWgk9g-gDvHcg2ceWJc-yJcVuo1AynYkh70jFf5LzUM0uZ_2e1J0lN5FQlMmZ",
      name: "Simran Kaur",
      role: "English & Punjab GK",
      desc: "Helping students master language and local context.",
      bgClass: "bg-secondary/20 dark:bg-secondary/30",
      rotateClass: "-rotate-6 group-hover:rotate-0",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD253xpOOHC5n6D_WJCE3J4pOZ5oEy4zs0sgYanDmX6B2k5QVI_nd2crVdYf0CjF2-J9dFvMFKXSrBMYGVJKr_R5wEkMAT4oUjFmm8s26XIJNRg-xhUfXYaZyMkZMN5wnyXmQizM4sh-oKZJw4lcwl6sXMDx4wuFEnYaD9FZfgn9tUI4_2OhUxu1SYUpv1CTNqnK3-r9hT4Q5Lgpb7KVCvwH8CrkUA8LOHf9wzr_RxD4GMx09d8lcwPBdebdBUN9n8lw5nhdlHWAy5a",
      name: "Vikram Singh",
      role: "Reasoning Specialist",
      desc: "Known for innovative shortcuts and logical flow.",
      bgClass: "bg-primary/20 dark:bg-primary/30",
      rotateClass: "rotate-6 group-hover:rotate-0",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBbIqwk1JeU-6GQA2qMXDN_sK2bxUKsEUUiy5Bx6aeht7z3L-hxcd0Ffuxv4DiwMuUX_bSqIPC7csRazANVasRU4cOIH7HQzP5R1vEtex_XSBF7ylqQ_DcsuPz4RfDMGKo0tHinx8KU9U0GEO6CJKy8D1q4kjNlndtpu0dLA4papbJ9OpNKnaYjp-ZnzihiNhPZVNbSkaTrxKfqftVLVV78xDL3NIhrg2LMQxr2rT1b6PvfTUBQaExQpQJy_5GyUOsk-D1ZwJY8h-qw",
      name: "Priya Mehta",
      role: "General Awareness",
      desc: "Making current affairs relevant and easy to recall.",
      bgClass: "bg-secondary/20 dark:bg-secondary/30",
      rotateClass: "-rotate-6 group-hover:rotate-0",
    },
  ];

  const testimonials = [
    {
      quote: `"MentorPlus changed my entire preparation strategy. The test series is very close to the actual SSC pattern. I cleared CGL 2023 only because of Vikram Sir's reasoning tricks."`,
      initials: "AM",
      name: "Aman Malik",
      achievement: "Cleared SSC CGL 2023",
      avatarBg:
        "bg-primary-fixed dark:bg-primary/20 text-primary dark:text-inverse-primary",
    },
    {
      quote: `"Punjab Govt exams can be tricky, but the focus on Punjab GK here is unmatched. Simran ma'am makes even the toughest historical facts easy to remember."`,
      initials: "HK",
      name: "Harman Kaur",
      achievement: "Selected, Punjab Revenue Dept",
      avatarBg:
        "bg-secondary-container dark:bg-secondary/20 text-secondary dark:text-secondary-fixed-dim",
    },
    {
      quote: `"The study material provided for IBPS PO is excellent. I didn't need any other books. The mock interview sessions really helped me gain confidence."`,
      initials: "RS",
      name: "Rahul Sharma",
      achievement: "Probationary Officer, PNB",
      avatarBg:
        "bg-tertiary-fixed dark:bg-tertiary/20 text-on-tertiary-fixed-variant dark:text-tertiary-fixed-dim",
    },
  ];

  const updates = [
    {
      month: "June",
      date: "15",
      title: "Notification for PSSSB Clerk recruitment released.",
      desc: "Check eligibility and exam pattern details here.",
    },
    {
      month: "June",
      date: "12",
      title: "MentorPlus All-India Open Mock Test result.",
      desc: "Download the merit list and expert analysis PDF.",
    },
    {
      month: "June",
      date: "08",
      title: "New 'Current Affairs' capsule for Banking exams.",
      desc: "Download the monthly digest for May 2024.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <span className="inline-block text-primary dark:text-inverse-primary font-label text-xs tracking-[0.3em] uppercase mb-4">
              India's Premium Coaching Hub
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold font-headline text-on-surface dark:text-white leading-tight mb-8">
              Master Your Future with{" "}
              <span className="text-primary dark:text-inverse-primary">
                MentorPlus
              </span>
            </h1>
            <p className="text-lg text-on-surface-variant dark:text-outline-variant max-w-xl mb-10 leading-relaxed">
              Join the sanctuary of elite learning. We provide comprehensive
              preparation for SSC, Banking, and Punjab State Exams with a focus
              on conceptual clarity and rigorous practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="hero-gradient text-white px-10 py-4 rounded-md font-bold text-lg shadow-lg shadow-primary/20 dark:shadow-primary/10 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Join Now
              </button>
              <button className="bg-surface-container-high dark:bg-white/10 text-on-primary-fixed-variant dark:text-inverse-on-surface px-10 py-4 rounded-md font-bold text-lg hover:bg-surface-container-highest dark:hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                <PlayCircle />
                Free Demo
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary-container/30 dark:bg-secondary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary-fixed/30 dark:bg-primary/20 rounded-full blur-3xl"></div>
            <div className="relative bg-surface-container-lowest dark:bg-white/5 rounded-3xl p-4 ambient-shadow overflow-hidden border border-transparent dark:border-white/10">
              <img
                alt="Academic Sanctuary"
                className="w-full h-[500px] object-cover rounded-2xl grayscale dark:grayscale-0 dark:brightness-90"
                data-alt="Modern students studying together in a bright library"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnDKbwYR9mcKD43HFuBY8IZqGa12antZgf3cECsTxtGl-hz9Dy0ZO5XRSSeEOMvWsZSQT7mwFqwc0uBZbkbRh_-4Zqi7iM_vkwghW_ZMvdUq7zcupWU3dtbs2AzQ16vktf95smSTb34R_jttA48B3e-wl32tzvtGXSHYiPyBhsireWz05DRott-OONNxob_8CROwRmM3Tpre-9otDThA3d7i38QMP-L-l6O60tYgLNe0bKHKD3S_LdLCL1oYSKJbsPDvFrufjFGp0h"
              />
              <div className="absolute bottom-10 left-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-xl shadow-xl max-w-xs border border-transparent dark:border-white/10">
                <div className="flex items-center gap-1 text-secondary dark:text-secondary-fixed-dim mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill="currentColor" size={16} />
                  ))}
                </div>
                <p className="text-sm font-semibold text-on-surface dark:text-inverse-on-surface italic">
                  "The best decision for my Punjab Govt exam prep. The mentors
                  are unmatched."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="bg-surface-container-low dark:bg-[#111827] py-16 md:py-24 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-extrabold font-headline text-primary dark:text-inverse-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-on-surface-variant dark:text-outline-variant font-label text-xs tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 md:py-24 bg-surface dark:bg-[#0a0f18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div className="max-w-xl">
              <span className="text-secondary dark:text-secondary-fixed-dim font-label text-xs tracking-[0.3em] uppercase mb-4 block">
                Excellence in Education
              </span>
              <h2 className="text-4xl font-extrabold font-headline text-on-surface dark:text-white">
                Featured Exam Programs
              </h2>
            </div>
            <a
              className="text-primary dark:text-inverse-primary font-bold flex items-center gap-2 hover:underline underline-offset-8"
              href="/courses"
            >
              View All Courses <ArrowRight size={20} />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest dark:bg-white/5 rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 group ambient-shadow border border-transparent dark:border-white/10"
              >
                <div className="h-48 overflow-hidden relative">
                  {course.lineColor && (
                    <div
                      className={`absolute top-0 left-0 w-1 h-full z-10 ${course.lineColor}`}
                    ></div>
                  )}
                  <img
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-95 dark:brightness-75"
                    src={course.image}
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full ${course.badgeClasses}`}
                    >
                      {course.badge}
                    </span>
                    <div className="flex items-center text-secondary dark:text-secondary-fixed-dim font-bold">
                      <Clock size={16} />
                      <span className="ml-1 text-xs">{course.duration}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-headline mb-4 text-on-surface dark:text-white">
                    {course.title}
                  </h3>
                  <p className="text-on-surface-variant dark:text-outline-variant text-sm mb-6 leading-relaxed">
                    {course.description}
                  </p>
                  <button className="w-full py-3 bg-surface-container-high dark:bg-white/10 text-primary dark:text-inverse-primary font-bold rounded-md hover:bg-primary hover:text-white transition-all">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-surface-container-low dark:bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whyChooseUsFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className={`bg-surface-container-lowest dark:bg-white/5 p-8 rounded-2xl ambient-shadow space-y-4 border border-transparent dark:border-white/10 ${feature.translate ? "md:translate-y-8" : ""}`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.iconBg}`}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-bold text-on-surface dark:text-white">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-on-surface-variant dark:text-outline-variant leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <span className="text-primary dark:text-inverse-primary font-label text-xs tracking-[0.3em] uppercase mb-4 block">
                The MentorPlus Advantage
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold font-headline mb-8 leading-tight text-on-surface dark:text-white">
                Why students choose our sanctuary?
              </h2>
              <p className="text-on-surface-variant dark:text-outline-variant text-lg leading-relaxed mb-8">
                We don't just teach subjects; we build mindsets. Our approach
                focuses on long-term retention and the psychology of
                exam-taking, ensuring you stay calm and focused on D-day.
              </p>
              <ul className="space-y-4 mb-10">
                {advantages.map((adv, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-secondary dark:text-secondary-fixed-dim mt-1 flex-shrink-0"
                    />
                    <span className="font-semibold text-on-surface dark:text-inverse-on-surface">
                      {adv}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="text-primary dark:text-inverse-primary font-bold border-b-2 border-primary/20 dark:border-inverse-primary/20 hover:border-primary dark:hover:border-inverse-primary transition-all pb-1">
                Learn more about our philosophy
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mentor Highlights */}
      <section className="py-16 md:py-24 bg-surface dark:bg-[#0a0f18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary dark:text-secondary-fixed-dim font-label text-xs tracking-[0.3em] uppercase mb-4 block">
              Expert Educators
            </span>
            <h2 className="text-4xl font-extrabold font-headline text-on-surface dark:text-white">
              Meet Your Mentors
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {mentors.map((mentor, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative mb-6 inline-block">
                  <div
                    className={`absolute inset-0 rounded-2xl transition-transform duration-300 ${mentor.bgClass} ${mentor.rotateClass}`}
                  ></div>
                  <img
                    alt={mentor.name}
                    className="w-48 h-56 object-cover rounded-2xl relative z-10 grayscale group-hover:grayscale-0 dark:grayscale-0 dark:brightness-90 transition-all"
                    src={mentor.image}
                  />
                </div>
                <h4 className="text-xl font-bold font-headline text-on-surface dark:text-white">
                  {mentor.name}
                </h4>
                <p className="text-primary dark:text-inverse-primary text-sm font-semibold mb-2">
                  {mentor.role}
                </p>
                <p className="text-xs text-on-surface-variant dark:text-outline-variant px-4">
                  {mentor.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-surface-container-low dark:bg-[#111827] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-primary dark:text-inverse-primary font-label text-xs tracking-[0.3em] uppercase mb-4 block">
              Student Stories
            </span>
            <h2 className="text-4xl font-extrabold font-headline text-on-surface dark:text-white">
              What our achievers say
            </h2>
          </div>
          <div className="flex space-x-8 pb-8 overflow-x-auto no-scrollbar">
            {testimonials.map((test, idx) => (
              <div
                key={idx}
                className="min-w-[400px] bg-surface-container-lowest dark:bg-white/5 p-10 rounded-2xl ambient-shadow border border-transparent dark:border-white/10"
              >
                <div className="flex gap-1 text-secondary dark:text-secondary-fixed-dim mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill="currentColor" size={16} />
                  ))}
                </div>
                <p className="text-on-surface-variant dark:text-outline-variant leading-relaxed mb-8 italic">
                  {test.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${test.avatarBg}`}
                  >
                    {test.initials}
                  </div>
                  <div>
                    <h5 className="font-bold text-on-surface dark:text-white">
                      {test.name}
                    </h5>
                    <p className="text-xs text-on-surface-variant dark:text-outline-variant">
                      {test.achievement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates / Announcements */}
      <section className="py-16 md:py-24 bg-surface dark:bg-[#0a0f18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-extrabold font-headline mb-6 text-on-surface dark:text-white">
                Latest Updates
              </h2>
              <p className="text-on-surface-variant dark:text-outline-variant mb-8">
                Stay informed about upcoming exams, batch start dates, and
                result announcements.
              </p>
              <div className="p-6 bg-secondary-container/20 dark:bg-secondary/10 rounded-xl border-l-4 border-secondary dark:border-secondary-fixed-dim">
                <h4 className="font-bold text-secondary dark:text-secondary-fixed-dim mb-2">
                  New Batch Alert!
                </h4>
                <p className="text-sm text-on-surface dark:text-inverse-on-surface">
                  Offline SSC CGL Crash Course starting next Monday at our
                  Ludhiana center.
                </p>
              </div>
            </div>
            <div className="md:w-2/3 space-y-4">
              {updates.map((update, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-6 p-6 rounded-xl hover:bg-surface-container-low dark:hover:bg-white/5 transition-all cursor-pointer border border-transparent dark:hover:border-white/10"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-surface-container-highest dark:bg-white/10 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-primary dark:text-inverse-primary uppercase">
                      {update.month}
                    </span>
                    <span className="text-xl font-bold dark:text-white">
                      {update.date}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-lg group-hover:text-primary dark:group-hover:text-inverse-primary transition-colors text-on-surface dark:text-white">
                      {update.title}
                    </h4>
                    <p className="text-sm text-on-surface-variant dark:text-outline-variant">
                      {update.desc}
                    </p>
                  </div>
                  <ChevronRight className="text-outline-variant" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto rounded-3xl hero-gradient p-12 md:p-20 relative overflow-hidden text-center text-white">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 flex items-center justify-center pointer-events-none">
            <BookOpen size={300} className="text-white" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold font-headline mb-8">
              Ready to secure your government job?
            </h2>
            <p className="text-lg text-primary-fixed mb-12">
              Take the first step towards a stable and prestigious career. Get a
              free counseling session today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-primary px-10 py-4 rounded-md font-bold text-lg shadow-xl hover:bg-surface-bright transition-all">
                Book Counseling
              </button>
              <button className="border-2 border-white/30 text-white px-10 py-4 rounded-md font-bold text-lg hover:bg-white/10 transition-all">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
