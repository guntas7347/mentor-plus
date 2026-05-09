export default async function LoadingCoursesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Hero Title Section */}
      <section className="mb-16 text-center md:text-left">
        <span className="text-xs font-bold tracking-widest text-primary dark:text-[#b5c4ff] uppercase mb-4 block">
          EXPERT GUIDANCE
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text dark:text-[#eaf1ff] leading-tight mb-6">
          Master Your Future with <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container dark:from-[#b5c4ff] dark:to-[#1a56db]">
            Strategic Learning
          </span>
        </h1>
        <p className="text-text-muted dark:text-[#a3b1c6] text-base md:text-lg max-w-2xl mx-auto md:mx-0">
          Choose from our expertly curated courses designed to help you crack
          competitive exams with confidence and precision.
        </p>
      </section>

      {/* Mount Interactive Client Component here */}
      <>
        {/* Filter & Search Skeleton */}
        <section className="mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Filters */}
          <div className="flex overflow-x-auto gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-9 w-24 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse"
              />
            ))}
          </div>

          {/* Search */}
          <div className="relative min-w-[300px]">
            <div className="w-full h-12 rounded-2xl bg-gray-200 dark:bg-white/10 animate-pulse" />
          </div>
        </section>

        {/* Course Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10"
            >
              {/* Thumbnail */}
              <div className="h-48 bg-gray-200 dark:bg-white/10 animate-pulse" />

              <div className="p-6 flex flex-col gap-4">
                {/* Category */}
                <div className="h-3 w-20 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />

                {/* Title */}
                <div className="h-5 w-3/4 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                <div className="h-5 w-1/2 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />

                {/* Description */}
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 dark:bg-white/10 rounded animate-pulse w-5/6" />
                  <div className="h-3 bg-gray-200 dark:bg-white/10 rounded animate-pulse w-2/3" />
                </div>

                {/* Meta */}
                <div className="flex justify-between pt-4">
                  <div className="space-y-2">
                    <div className="h-3 w-20 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                    <div className="h-3 w-16 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                  </div>

                  <div className="space-y-2 flex flex-col items-end">
                    <div className="h-3 w-12 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                    <div className="h-5 w-16 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                  </div>
                </div>

                {/* Button */}
                <div className="h-11 w-full rounded-xl bg-gray-200 dark:bg-white/10 animate-pulse mt-2" />
              </div>
            </div>
          ))}
        </div>
      </>

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
            <button className="px-8 py-4 bg-secondary-dark dark:bg-[#85f8c4] text-secondary-dark dark:text-[#002114] font-bold rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
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
