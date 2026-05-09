"use client";

import Link from "next/link";
import { FileText, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createTestSeries,
  deleteTestSeries,
  getAllTestSeries,
} from "@/lib/actions/test-series";

type TestSeriesListResponse = Awaited<ReturnType<typeof getAllTestSeries>>;
type TestSeries = TestSeriesListResponse[number];

const statusStyles: Record<string, string> = {
  active:
    "bg-primary-dark text-primary-dark dark:bg-primary/20 dark:text-primary",
  upcoming:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  draft:
    "bg-secondary-dark text-secondary-dark dark:bg-secondary/20 dark:text-secondary-fixed",
  archived:
    "bg-surface text-text-muted dark:bg-outline/20 dark:text-text-muted",
};

function formatDate(dateStr: string | Date) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function TestSeriesListPage() {
  const router = useRouter();

  const [testSeriesList, setTestSeriesList] = useState<TestSeries[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestSeries = async () => {
      try {
        const data = await getAllTestSeries();
        setTestSeriesList(data);
      } catch (error) {
        console.error("Failed to fetch test series:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestSeries();
  }, []);

  const handleDeleteTestSeries = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this test series? This action cannot be undone.",
    );
    if (!confirmDelete) return;

    try {
      await deleteTestSeries(id);
      setTestSeriesList((prev) => prev.filter((ts) => ts.id !== id));
    } catch (error) {
      alert("Failed to delete the test series.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-sm text-text-muted">
        Loading test series...
      </div>
    );
  }

  const handleTestSeries = async () => {
    const testSeries = await createTestSeries();
    router.push(`/dashboard/test-series/${testSeries.id}`);
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-headline font-bold text-text dark:text-inverse-primary mb-1">
            Test Series
          </h1>
          <p className="font-body text-sm text-text-muted dark:text-text-muted">
            Manage all your mock tests and exam series packages.
          </p>
        </div>

        <button
          onClick={handleTestSeries}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-body font-semibold text-sm hover:opacity-90 active:scale-95 transition-all duration-150 shadow-md"
        >
          <Plus size={18} />
          Create New Test Series
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-background dark:bg-[#1f2937] rounded-2xl ambient-shadow border border-gray-200/20 overflow-hidden">
        {/* Summary bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200/15 dark:border-white/5">
          <FileText
            size={18}
            className="text-primary dark:text-inverse-primary"
          />
          <span className="font-body text-sm font-semibold text-text dark:text-gray-100">
            {testSeriesList.length} test series total
          </span>
        </div>

        {/* Scrollable table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-gray-200/15 dark:border-white/5 bg-surface dark:bg-[#182030]">
                <th className="text-left px-6 py-3 font-body font-semibold text-text-muted dark:text-text-muted text-xs uppercase tracking-wide">
                  Test Series Name
                </th>
                <th className="text-left px-6 py-3 font-body font-semibold text-text-muted dark:text-text-muted text-xs uppercase tracking-wide">
                  Date Created
                </th>
                <th className="text-left px-6 py-3 font-body font-semibold text-text-muted dark:text-text-muted text-xs uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-6 py-3 font-body font-semibold text-text-muted dark:text-text-muted text-xs uppercase tracking-wide">
                  Enrollments
                </th>
                <th className="text-right px-6 py-3 font-body font-semibold text-text-muted dark:text-text-muted text-xs uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 dark:divide-white/5">
              {testSeriesList.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-text-muted dark:text-gray-400"
                  >
                    No test series found. Click "Create New" to add one.
                  </td>
                </tr>
              ) : (
                testSeriesList.map((ts) => (
                  <tr
                    key={ts.id}
                    className="hover:bg-surface dark:hover:bg-[#182030] transition-colors duration-150 group"
                  >
                    {/* Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-dark dark:bg-primary/20 flex items-center justify-center shrink-0">
                          <FileText
                            size={15}
                            className="text-primary dark:text-inverse-primary"
                          />
                        </div>
                        <span className="font-semibold text-text dark:text-gray-100 group-hover:text-primary dark:group-hover:text-inverse-primary transition-colors">
                          {ts.title}
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-text-muted dark:text-text-muted">
                      {formatDate(ts.createdAt)}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                          statusStyles[ts.status] || statusStyles.draft
                        }`}
                      >
                        {ts.status}
                      </span>
                    </td>

                    {/* Enrollments */}
                    <td className="px-6 py-4">
                      <span className="font-semibold text-text dark:text-gray-100">
                        {ts._count?.purchases || 0}
                      </span>
                      <span className="ml-1 text-xs text-text-muted dark:text-text-muted">
                        students
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/dashboard/test-series/${ts.id}`}
                          className="p-2 rounded-lg hover:bg-surface dark:hover:bg-outline/20 text-text-muted dark:text-text-muted hover:text-secondary dark:hover:text-secondary-fixed transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => handleDeleteTestSeries(ts.id)}
                          className="p-2 rounded-lg hover:bg-red-100/40 text-text-muted dark:text-text-muted hover:text-error transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200/15 dark:border-white/5 bg-surface dark:bg-[#182030]">
          <p className="text-xs text-text-muted dark:text-text-muted font-body">
            Showing {testSeriesList.length} of {testSeriesList.length} test
            series
          </p>
        </div>
      </div>
    </>
  );
}
