export default function CourseLoadingSkeleton() {
  return (
    <main className="pt-24 pb-32 animate-pulse">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column (Main Content Area) */}
        <div className="lg:col-span-8 space-y-16">
          {/* Hero Info Skeleton */}
          <section className="space-y-6">
            {/* Tags */}
            <div className="flex gap-3">
              <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
              <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-4">
              <div className="h-14 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
              <div className="h-14 w-1/2 bg-gray-200 dark:bg-gray-800 rounded-xl md:hidden"></div>
              <div className="h-7 w-1/3 bg-gray-200 dark:bg-gray-800 rounded-lg mt-2"></div>
            </div>

            {/* Ratings & Instructors */}
            <div className="flex items-center gap-6 pt-2">
              <div className="h-12 w-36 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 border-2 border-white dark:border-[#121c28] z-10"
                    ></div>
                  ))}
                </div>
                <div className="h-5 w-32 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              </div>
            </div>

            {/* Description Paragraph */}
            <div className="space-y-3 pt-4">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
            </div>
          </section>

          {/* Learning Outcomes Skeleton */}
          <section className="space-y-8">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-6 bg-gray-100 dark:bg-[#121c28]/50 rounded-2xl border border-gray-200 dark:border-white/5 flex items-start space-x-4"
                >
                  <div className="h-12 w-12 rounded-xl bg-gray-200 dark:bg-gray-800 flex-shrink-0"></div>
                  <div className="space-y-2 w-full">
                    <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                    <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Curriculum Skeleton */}
          <section className="space-y-8">
            <div className="flex justify-between items-end border-b border-gray-200 dark:border-white/10 pb-4">
              <div className="h-8 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="border-b border-gray-100 dark:border-white/5 pb-4 py-4 flex justify-between items-center"
                >
                  <div className="flex items-center space-x-5 w-1/2">
                    <div className="h-6 w-8 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                    <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                  </div>
                  <div className="h-5 w-5 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (Sticky Sidebar) */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 space-y-6">
            {/* Main Action Card Skeleton */}
            <div className="bg-gray-50 dark:bg-[#121c28]/80 rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-white/5">
              {/* Media Thumbnail */}
              <div className="h-56 w-full bg-gray-200 dark:bg-gray-800 relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              </div>

              {/* Pricing & Buttons */}
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                    <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                  </div>
                  <div className="h-4 w-40 bg-gray-200 dark:bg-gray-800 rounded-md mt-2"></div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="h-14 w-full bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                  <div className="h-12 w-full bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                </div>

                {/* Features List */}
                <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-white/10">
                  <div className="h-3 w-32 bg-gray-200 dark:bg-gray-800 rounded-sm mb-4"></div>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-5 w-5 bg-gray-200 dark:bg-gray-800 rounded-full flex-shrink-0"></div>
                      <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Guarantee Box Skeleton */}
            <div className="p-5 bg-gray-50 dark:bg-[#1e2a3b]/50 rounded-2xl border border-gray-200 dark:border-white/5 flex items-center gap-4">
              <div className="h-12 w-12 bg-gray-200 dark:bg-gray-800 rounded-xl flex-shrink-0"></div>
              <div className="space-y-2 w-full">
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
