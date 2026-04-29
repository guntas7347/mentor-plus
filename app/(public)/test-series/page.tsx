import { getAllPublishedTestSeries } from "@/lib/actions/test-series";
import TestSeriesExplorer from "../../../components/TestSeriesExplorer"; // Adjust import path

export default async function TestSeriesPage() {
  const testSeriesData = await getAllPublishedTestSeries();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Header Section */}
      <header className="mb-12 text-center md:text-left">
        <div className="flex flex-col space-y-4">
          <span className="text-primary dark:text-[#60a5fa] font-label font-bold tracking-widest text-xs uppercase">
            Premium Exam Resources
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface dark:text-white leading-tight tracking-tight">
            Store{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container dark:from-[#b5c4ff] dark:to-[#1a56db]">
              &amp;
            </span>{" "}
            Assessment
          </h1>
          <p className="text-on-surface-variant dark:text-gray-400 max-w-2xl text-base md:text-lg font-body leading-relaxed mx-auto md:mx-0">
            Exhaustive practice materials curated by top mentors to ensure you
            are exam-ready for Punjab Government and National Level
            competitions.
          </p>
        </div>
      </header>

      {/* Tab Switching UI (Static for visual layout) */}
      <div className="flex items-center space-x-2 mb-12 p-1.5 bg-surface-container-low dark:bg-[#1e2a3b] border border-outline-variant/20 dark:border-white/5 rounded-2xl w-fit mx-auto md:mx-0 shadow-sm">
        <button className="px-8 py-3 bg-white dark:bg-[#2a3b52] text-primary dark:text-[#b5c4ff] font-bold rounded-xl shadow-sm transition-all duration-300">
          Test Series
        </button>
        <button className="px-8 py-3 text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-[#b5c4ff] font-semibold rounded-xl transition-all duration-300">
          Study Material
        </button>
      </div>

      {/* Mount the Interactive Client Component */}
      <TestSeriesExplorer initialTests={testSeriesData} />
    </main>
  );
}
