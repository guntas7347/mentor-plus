import { Search, Clock } from "lucide-react";

export default function Courses() {
  const courses = [
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBhFIxvBuo7sSLXCKZTS7jO-bnTJPyN6zSwFzRvx7oVCklw1fjZo6Uv2-zbZ_HHV3XlWJc-R-YiFO1uenhxs2TCyMTWVrP2AbrBNV6SPIcRbePI3mqzZ8lLcjlTsOTp11TT_P4dznV4pZk4uCI5m239cHzP07DlDkmhCEqKgyyFDbpcpOYTNtoNHro3x-mSwpe_iaYyPQVves4uqPz9UqDAVw9ahn6TsvP1mCmN3aI7O_CDVFR-LrJ1RWazxCrjzvNlQGYobIsPyg2q",
      badgeText: "New Batch",
      badgeClasses:
        "bg-secondary-container dark:bg-[#005137] text-on-secondary-container dark:text-[#85f8c4]",
      category: "PUNJAB GOVT EXAMS",
      title: "Naib Tehsildar Masterclass",
      description:
        "Complete coverage of GS, Quant, and Reasoning with a special focus on Punjab History & Culture.",
      duration: "6 Months",
      price: "₹14,999",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBJLIikt0AZjTeAuYB7A_nBnrnQ9_Ta-ja9P8h14nR4MDp3oq2rIBPhT-qI2EC2iTYk4JsfhQb9nuvgSRAH3u_fogsQVZ8R0hXtSaEuj0WqvAHupvYFkx4CG1crkAMebH3mpaFdv5ZMkPuunr_GKIqIjK4cALg65xD9W0rYElQ4lgCA23kqwJ6DgnSA9Ur_CMHprOIePnKQIFZCktW_p4vLVAWC6ZkjFTI_LP8d2mGXAP_cfsVTkhOu4vg6i6V2MqrKLdcEW3NCmEGU",
      badgeText: "Most Popular",
      badgeClasses: "bg-primary dark:bg-[#1a56db] text-white",
      category: "SSC CGL / CHSL",
      title: "SSC Comprehensive 2024",
      description:
        "All-in-one preparation for Tier 1 & Tier 2. Includes 100+ mock tests and weekly doubt sessions.",
      duration: "9 Months",
      price: "₹12,499",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCHs6PMCiZpxo6MoEaGn9-m1W7fqnNe9zI4rEx3dXdgmqBaSd8G9o7EruIyZxFVYsFc--Q3-0a_pZ_C_9R033LZVQR_gMuTu5Ah_jjss20icMd860FPgf0qq7QmHllBVLk8Tc-LeHfJ8mLRYTmBVVR40dM4QC_eD1JwOj9c2isCNSvjgH7_w1DL6yIpiRoCMxxd4BD5Lm4IbPQ-agJoudaRmXOEVX-4R4pju1e11Po5SydxmkaEYWKG0jKonovief3XxByrnTf7DTSd",
      category: "BANKING EXAMS",
      title: "IBPS PO & Clerk Elite",
      description:
        "Specialized speed math techniques and advanced reasoning modules tailored for banking speed requirements.",
      duration: "4 Months",
      price: "₹9,999",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuATzz3Vvh2hZgpBFRahd89JDqvrxiHnXOR9bumAN0sqnNqjvRZST54_UdxaNSKrGg4I5Qulk6prFgz9nqhlBjMOeR28j-9BDMp2YeEk33HfqbPYU2_AQoEg1-ITOhH49BayTqPKG5W8bsNcfgG55DBzq_4JKXFt687OHn1jsLZtZiUlE9e6voLq6BJnsasSviKe8XRHTkN6bDJly3HsV1uBnRM6pKhNhGnsJekioyZOI4oSLqGh9SXLFsW9WXvq_AheFnOKzpBPv69-",
      category: "UPSC BASICS",
      title: "NCERT Foundation Course",
      description:
        "Build your base with simplified NCERT lectures. Perfect for beginners starting their UPSC journey.",
      duration: "12 Months",
      price: "₹18,500",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBlOnTWxMkEDFQGpkhmuWkv3OP9-lhAcQwFmlDhb1XJaWKR691JwAcIR9IWYQHS7wZ22HREMy6eZfO9d0yrpx6MOxsiXXD6tokVgzwawheR2RHp29fhqF6xoEy8ryRR9TvDK6s2M8RGVoK0Pb1vsmioejEvq5ei-82So20eP6ntMcir93aWMS1wJgCQNA1Gzp-e08a5VCSQIYhJ-h246CFxsbwxZpQN4dpp92EpAYo54c3jfalUmvchcw_2Q5atbRZT33c0orgwl9oO",
      category: "PUNJAB GOVT EXAMS",
      title: "Punjab Police SI Intensive",
      description:
        "A rigorous 3-month crash course focusing on the latest exam pattern of Punjab Police recruitments.",
      duration: "3 Months",
      price: "₹7,500",
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCwrgacsF8kBrMlIbVEl1FqGJXt9GKKMpTsET2LKTzP6UwGoRNNAcNy2_4DKgkLXWjRxBfzTDllY1NhLyYcKJev9moS_jnXoSZuLnPU5qG-c1I1-aq-7RrroTvIfxe3doQK4jPEOdNB9a8_L_FwBictnbVGU8P5RBqyVaO412Qlm82kdfY7fRSmzFTQ25ec4J6Ztz4WQWtTqmow0Xk2XD4Hhrkt2AOm7gTqDHCvo8DKfOgLdJqrLBAuxxtvq2hCGvTEliPw5x2Vkops",
      badgeText: "Fast Track",
      badgeClasses: "bg-secondary dark:bg-[#006c4a] text-white",
      category: "SSC",
      title: "SSC GD Constable Plus",
      description:
        "Focus on high-yielding topics and mental ability. Extensive physical and written guidance provided.",
      duration: "5 Months",
      price: "₹8,999",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Hero Title Section */}
      <section className="mb-16">
        <span className="text-xs font-semibold tracking-widest text-primary dark:text-[#b5c4ff] uppercase mb-4 block">
          EXPERT GUIDANCE
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-on-surface dark:text-[#eaf1ff] leading-tight mb-6">
          Master Your Future with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container dark:from-[#b5c4ff] dark:to-[#1a56db]">
            Strategic Learning
          </span>
        </h1>
        <p className="text-on-surface-variant dark:text-[#a3b1c6] text-lg max-w-2xl">
          Choose from our expertly curated courses designed to help you crack
          competitive exams with confidence and precision.
        </p>
      </section>

      {/* Filter & Search UI */}
      <section className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-wrap gap-3">
          <button className="px-5 py-2 bg-primary dark:bg-[#1a56db] text-white rounded-full font-semibold shadow-sm">
            All Courses
          </button>
          <button className="px-5 py-2 bg-surface-container-high dark:bg-white/5 text-on-surface-variant dark:text-[#a3b1c6] rounded-full font-semibold hover:bg-primary/10 dark:hover:bg-white/10 transition-colors">
            Punjab Govt Exams
          </button>
          <button className="px-5 py-2 bg-surface-container-high dark:bg-white/5 text-on-surface-variant dark:text-[#a3b1c6] rounded-full font-semibold hover:bg-primary/10 dark:hover:bg-white/10 transition-colors">
            SSC
          </button>
          <button className="px-5 py-2 bg-surface-container-high dark:bg-white/5 text-on-surface-variant dark:text-[#a3b1c6] rounded-full font-semibold hover:bg-primary/10 dark:hover:bg-white/10 transition-colors">
            Banking
          </button>
          <button className="px-5 py-2 bg-surface-container-high dark:bg-white/5 text-on-surface-variant dark:text-[#a3b1c6] rounded-full font-semibold hover:bg-primary/10 dark:hover:bg-white/10 transition-colors">
            UPSC Basics
          </button>
        </div>
        <div className="relative min-w-[300px]">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-outline dark:text-[#737686]"
            size={20}
          />
          <input
            className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest dark:bg-[#121c28] border-none rounded-xl focus:ring-2 focus:ring-primary/20 dark:focus:ring-white/10 shadow-sm text-on-surface dark:text-[#eaf1ff] placeholder:dark:text-[#434654]"
            placeholder="Search for courses..."
            type="text"
          />
        </div>
      </section>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, idx) => (
          <div
            key={idx}
            className="bg-surface-container-lowest dark:bg-[#121c28] rounded-xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 flex flex-col border border-transparent dark:border-white/5"
            style={{ boxShadow: "0 20px 40px -10px rgba(18, 28, 40, 0.06)" }}
          >
            <div className="h-48 bg-surface-container dark:bg-[#1e2a3b] relative overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 dark:opacity-80"
                src={course.image}
                alt={course.title}
              />
              {course.badgeText && (
                <div
                  className={`absolute top-4 left-4 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${course.badgeClasses}`}
                >
                  {course.badgeText}
                </div>
              )}
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <span className="text-[10px] font-bold text-outline dark:text-[#737686] tracking-widest uppercase mb-2">
                {course.category}
              </span>
              <h3 className="text-xl font-bold text-on-surface dark:text-[#eaf1ff] mb-3">
                {course.title}
              </h3>
              <p className="text-on-surface-variant dark:text-[#a3b1c6] text-sm mb-6 flex-grow">
                {course.description}
              </p>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center text-on-surface-variant dark:text-[#a3b1c6] text-sm">
                  <Clock size={16} className="mr-1" />
                  {course.duration}
                </div>
                <div className="text-2xl font-extrabold text-primary dark:text-[#b5c4ff]">
                  {course.price}
                </div>
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-primary to-primary-container dark:from-[#1a56db] dark:to-[#003fb1] text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Newsletter */}
      <section
        className="mt-24 rounded-3xl overflow-hidden relative"
        style={{
          background: "linear-gradient(135deg, #003fb1 0%, #1a56db 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        ></div>
        <div className="relative px-12 py-16 text-center text-white max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-6">
            Not sure which course is right for you?
          </h2>
          <p className="text-blue-100 dark:text-[#dbe1ff] mb-10 text-lg">
            Speak with our expert career counselors today and get a personalized
            learning roadmap for your target exams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-secondary-container dark:bg-[#85f8c4] text-on-secondary-container dark:text-[#002114] font-bold rounded-lg hover:scale-[1.02] transition-all">
              Book Free Counseling
            </button>
            <button className="px-8 py-4 border border-white/30 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/10 transition-all">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
