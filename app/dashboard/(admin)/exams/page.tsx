"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  GraduationCap,
  Calendar,
  Hash,
  ChevronRight,
  X,
  ListChecks,
} from "lucide-react";
// Adjust these imports based on your actual file structure
import { createExam, getAllExams } from "@/lib/actions/exams";
import { getAllQuestionSets } from "@/lib/actions/questions"; // Assuming you have this

// --- Types ---
type ExamRow = {
  id: string;
  examCode: string;
  title: string;
  createdAt: Date;
};

type QuestionSetOption = {
  id: string;
  title: string;
};

export default function ExamsPage() {
  const [exams, setExams] = useState<ExamRow[]>([]);
  const [availableSets, setAvailableSets] = useState<QuestionSetOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Create Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [selectedSetIds, setSelectedSetIds] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Fetch both exams and the available question sets for the modal
      const [examsData, setsData] = await Promise.all([
        getAllExams(),
        getAllQuestionSets(), // Ensure this returns {id, title}
      ]);
      setExams(examsData as ExamRow[]);
      setAvailableSets(setsData as QuestionSetOption[]);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleSetSelection = (id: string) => {
    setSelectedSetIds((prev) =>
      prev.includes(id) ? prev.filter((setId) => setId !== id) : [...prev, id],
    );
  };

  const handleCreateExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || selectedSetIds.length === 0) return;

    setIsCreating(true);
    try {
      await createExam(newTitle, selectedSetIds);
      await loadData();
      setIsModalOpen(false);
      setNewTitle("");
      setSelectedSetIds([]);
    } catch (error) {
      console.error("Failed to create exam:", error);
      alert("Failed to create exam.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-8 font-body bg-background text-text min-h-screen">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-surface p-6 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-headline flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            Exams
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Create and manage your live examinations
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark"
        >
          <Plus className="h-4 w-4" />
          Create Exam
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/5 dark:bg-white/5 text-xs uppercase tracking-wider text-text-muted">
              <tr>
                <th className="px-6 py-4 font-semibold">Exam Title</th>
                <th className="px-6 py-4 font-semibold">Exam Code</th>
                <th className="px-6 py-4 font-semibold">Created At</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 dark:divide-white/10">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-text-muted animate-pulse"
                  >
                    Loading exams...
                  </td>
                </tr>
              ) : exams.length > 0 ? (
                exams.map((exam) => (
                  <tr
                    key={exam.id}
                    className="transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                      <div className="p-2 rounded-md bg-primary/10 text-primary">
                        <GraduationCap className="h-4 w-4" />
                      </div>
                      {exam.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-1.5 rounded-md bg-black/5 dark:bg-white/10 px-2.5 py-1 text-xs font-mono font-semibold text-text">
                        <Hash className="h-3.5 w-3.5 text-text-muted" />
                        {exam.examCode}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-text-muted">
                        <Calendar className="h-4 w-4" />
                        {new Date(exam.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/dashboard/exams/${exam.id}`}
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
                    className="px-6 py-16 text-center text-text-muted"
                  >
                    <GraduationCap className="mx-auto h-12 w-12 opacity-20 mb-3" />
                    No exams found. Create one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Exam Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl bg-surface p-6 shadow-xl border border-black/10 dark:border-white/10 flex flex-col max-h-[90vh]">
            <div className="mb-4 flex items-center justify-between shrink-0">
              <h2 className="text-xl font-bold font-headline text-text flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" /> Create New Exam
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1.5 text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleCreateExam}
              className="flex-1 overflow-y-auto pr-2 space-y-5"
            >
              <div>
                <label className="block text-sm font-semibold text-text-muted mb-1.5">
                  Exam Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Final Semester Computer Science"
                  className="w-full rounded-lg border border-black/20 dark:border-white/20 bg-background px-4 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-muted mb-1.5">
                  Select Question Sets
                </label>
                <div className="rounded-xl border border-black/10 dark:border-white/10 bg-background overflow-hidden max-h-[300px] overflow-y-auto">
                  {availableSets.length === 0 ? (
                    <div className="p-4 text-sm text-center text-text-muted">
                      No question sets available. Create one first.
                    </div>
                  ) : (
                    <div className="divide-y divide-black/5 dark:divide-white/5">
                      {availableSets.map((set) => {
                        const isSelected = selectedSetIds.includes(set.id);
                        return (
                          <label
                            key={set.id}
                            className={`flex items-center gap-3 p-3 cursor-pointer transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${isSelected ? "bg-secondary/5" : ""}`}
                          >
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={isSelected}
                              onChange={() => toggleSetSelection(set.id)}
                            />
                            <div
                              className={`h-4 w-4 shrink-0 rounded-sm border flex items-center justify-center transition-colors ${isSelected ? "border-secondary bg-secondary" : "border-black/30 dark:border-white/30"}`}
                            >
                              {isSelected && (
                                <svg
                                  className="h-3 w-3 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <ListChecks className="h-4 w-4 text-text-muted" />
                              <span
                                className={`text-sm font-medium ${isSelected ? "text-text" : "text-text-muted"}`}
                              >
                                {set.title}
                              </span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
                <p className="text-xs text-text-muted mt-2">
                  {selectedSetIds.length} sets selected
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-black/10 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    isCreating ||
                    !newTitle.trim() ||
                    selectedSetIds.length === 0
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark disabled:opacity-50"
                >
                  {isCreating ? "Creating..." : "Create Exam"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
