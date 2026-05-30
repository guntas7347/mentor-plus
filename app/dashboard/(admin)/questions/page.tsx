"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  ListChecks,
  Calendar,
  FileQuestion,
  ChevronRight,
} from "lucide-react";
import { createQuestionSet, getAllQuestionSets } from "@/lib/actions/questions";
import { title } from "process";

type QuestionSet = {
  id: string;
  title: string;
  questionCount: number;
  createdAt: Date;
};

export default function QuestionSetsPage() {
  const [sets, setSets] = useState<QuestionSet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSets() {
      try {
        const res = await getAllQuestionSets();
        setSets(res);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSets();
  }, []);

  const handleCreateQuestionSet = async () => {
    try {
      const res = await createQuestionSet();
      if (res) {
        setSets((prev) => [res, ...prev]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-8 font-body bg-background text-text min-h-screen">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-headline">
            Question Sets
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Manage your test series question banks
          </p>
        </div>
        <button
          onClick={handleCreateQuestionSet}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark"
        >
          <Plus className="h-4 w-4" />
          Create Question Set
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/5 dark:bg-white/5 text-xs uppercase tracking-wider text-text-muted">
              <tr>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Questions</th>
                <th className="px-6 py-4 font-semibold">Created At</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 dark:divide-white/10">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-text-muted"
                  >
                    Loading sets...
                  </td>
                </tr>
              ) : sets.length > 0 ? (
                sets.map((set) => (
                  <tr
                    key={set.id}
                    className="transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                      <div className="p-2 rounded-md bg-secondary/10 text-secondary">
                        <ListChecks className="h-4 w-4" />
                      </div>
                      {set.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-text-muted">
                        <FileQuestion className="h-4 w-4" />
                        {set.questionCount}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-text-muted">
                        <Calendar className="h-4 w-4" />
                        {new Date(set.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/dashboard/questions/${set.id}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-secondary-dark"
                      >
                        Manage <ChevronRight className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-text-muted"
                  >
                    No question sets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
