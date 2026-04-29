export default function PublicSyllabusSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero / Header Section Skeleton */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20 pt-16">
        <div className="max-w-3xl">
          <span className="text-primary dark:text-[#b5c4ff] font-label text-sm font-bold tracking-widest uppercase block mb-4">
            Exam Preparation Guide
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-extrabold text-on-surface dark:text-white tracking-tight leading-tight mb-6">
            Master the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container dark:from-[#b5c4ff] dark:to-[#1a56db]">
              Curriculum
            </span>{" "}
            with Authority.
          </h1>
          <p className="text-lg text-on-surface-variant dark:text-gray-300 leading-relaxed mb-8">
            Detailed breakdown of exam patterns and subject-wise syllabus for
            Punjab Government, Banking, and Central Government exams. Stay ahead
            with our structured learning path.
          </p>
          {/* Anchor Links (Pills) */}
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-24 h-12 bg-gray-200 dark:bg-gray-800 rounded-xl"
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Syllabus Sections Skeleton */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24 mb-24">
        {/* Render 2 placeholder categories */}
        {[1, 2].map((sectionIndex) => (
          <section key={sectionIndex}>
            {/* Section Header */}
            <div className="mb-10 border-b border-gray-200 dark:border-gray-800 pb-4">
              <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
            </div>

            {/* Syllabus Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((cardIndex) => (
                <div
                  key={cardIndex}
                  className="bg-gray-50 dark:bg-[#121c28] p-8 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col h-[300px]"
                >
                  {/* Card Header (Icon & Title) */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-xl shrink-0"></div>
                    <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg pt-1"></div>
                  </div>

                  {/* Card Description */}
                  <div className="space-y-3 mb-8 flex-grow">
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                  </div>

                  {/* Download Button */}
                  <div className="w-full h-12 bg-gray-200 dark:bg-gray-800 rounded-xl mt-auto"></div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Mentorship CTA Skeleton */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <div className="bg-gray-100 dark:bg-[#121c28] p-10 md:p-14 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-200 dark:border-white/5">
          <div className="w-full max-w-xl space-y-5">
            {/* CTA Heading */}
            <div className="h-10 md:h-12 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            {/* CTA Text */}
            <div className="space-y-3">
              <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              <div className="h-6 w-5/6 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
            <div className="h-14 w-full sm:w-40 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            <div className="h-14 w-full sm:w-40 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
