"use client";

import { useEffect, useState, use } from "react";
import {
  GraduationCap,
  Hash,
  BookOpen,
  Users,
  CheckCircle2,
  Clock,
  ChevronLeft,
  FileQuestion,
  RefreshCcw,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { deleteExam, getExamAdmin } from "@/lib/actions/exams";

// --- Types mapping to your Prisma include structure ---
type QuestionSet = {
  id: string;
  title: string;
};

type Attempt = {
  rollNumber: string;
  studentName: string;
  totalQuestions: number;
  totalCorrect: number;
  submittedAt: Date;
};

type ExamDetails = {
  id: string;
  title: string;
  examCode: string;
  createdAt: Date;
  questionSets: QuestionSet[];
  attempts: Attempt[];
};

export default function ExamDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const examId = unwrappedParams.id;

  const [exam, setExam] = useState<ExamDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadExam = async () => {
    try {
      const data = await getExamAdmin(examId);
      setExam(data as unknown as ExamDetails);
    } catch (error) {
      console.error("Failed to fetch exam:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadExam();
  }, [examId]);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-text-muted animate-pulse">
        Loading exam details...
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-red-500">
        Exam not found.
      </div>
    );
  }

  // Calculate some quick stats
  const totalAttempts = exam.attempts.length;
  const averageScore =
    totalAttempts > 0
      ? exam.attempts.reduce(
          (acc, curr) => acc + curr.totalCorrect / curr.totalQuestions,
          0,
        ) / totalAttempts
      : 0;

  const handleDeleteExam = async () => {
    const confirmation = confirm("Are you sure you want to delete this exam?");
    if (!confirmation) {
      return;
    }
    try {
      await deleteExam(examId);
      window.location.href = "/dashboard/exams";
    } catch (error) {
      console.error("Failed to delete exam:", error);
      alert("Failed to delete exam. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-8 font-body bg-background text-text min-h-screen">
      {/* Navigation & Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/exams"
          className="inline-flex items-center gap-1 text-sm font-medium text-text-muted hover:text-primary transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Exams
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between bg-surface p-6 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-headline flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <GraduationCap className="h-6 w-6" />
              </div>
              {exam.title}
            </h1>
            <div className="mt-3 flex items-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-1.5">
                <Hash className="h-4 w-4" /> ID:{" "}
                <span className="font-mono">{exam.id}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> Created:{" "}
                {new Date(exam.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <button
            onClick={handleDeleteExam}
            className="inline-flex items-center cursor-pointer justify-center gap-2 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-danger-dark"
          >
            <Trash className="h-4 w-4" />
            Delete Exam
          </button>

          <div className="flex flex-col items-end">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
              Share Exam Code
            </span>
            <div className="inline-flex items-center gap-2 rounded-xl bg-black/5 dark:bg-white/10 px-4 py-2 font-mono text-xl font-bold tracking-widest text-secondary shadow-inner">
              {exam.examCode}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Configuration & Stats */}
        <div className="space-y-6 lg:col-span-1">
          {/* Quick Stats Card */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-surface p-5 shadow-sm">
            <h2 className="text-lg font-bold font-headline mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-secondary" /> Exam Overview
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-background p-4 border border-black/5 dark:border-white/5">
                <p className="text-xs font-medium text-text-muted mb-1">
                  Total Attempts
                </p>
                <p className="text-2xl font-bold text-text flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" /> {totalAttempts}
                </p>
              </div>
              <div className="rounded-xl bg-background p-4 border border-black/5 dark:border-white/5">
                <p className="text-xs font-medium text-text-muted mb-1">
                  Avg Score
                </p>
                <p className="text-2xl font-bold text-text flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  {totalAttempts > 0
                    ? `${(averageScore * 100).toFixed(1)}%`
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Assigned Question Sets */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-surface overflow-hidden shadow-sm">
            <div className="bg-black/5 dark:bg-white/5 px-5 py-4 border-b border-black/10 dark:border-white/10">
              <h2 className="text-lg font-bold font-headline flex items-center gap-2">
                <FileQuestion className="h-5 w-5 text-secondary" /> Source
                Material
              </h2>
            </div>
            <div className="p-2">
              {exam.questionSets.length > 0 ? (
                <ul className="divide-y divide-black/5 dark:divide-white/5">
                  {exam.questionSets.map((set) => (
                    <li
                      key={set.id}
                      className="p-3 text-sm font-medium text-text flex items-center gap-3"
                    >
                      <div className="h-2 w-2 rounded-full bg-secondary"></div>
                      {set.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-sm text-text-muted">
                  No question sets linked.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Student Attempts Table */}
        <div className="lg:col-span-2 rounded-2xl border border-black/10 dark:border-white/10 bg-surface overflow-hidden shadow-sm">
          <div className="bg-black/5 dark:bg-white/5 px-6 py-5 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-bold font-headline flex items-center gap-2 text-text">
              <Users className="h-5 w-5 text-primary" /> Student Submissions
            </h2>
            <button
              onClick={async () => {
                setIsRefreshing(true);
                await loadExam();
                setIsRefreshing(false);
              }}
              disabled={isRefreshing}
              className={`inline-flex items-center gap-2 rounded-lg ${isRefreshing ? " cursor-not-allowed" : ""} px-4 py-2 text-sm font-medium text-secondary hover:bg-secondary/20 transition-all`}
            >
              <RefreshCcw
                className={`h-4 w-4 ${isRefreshing ? " animate-spin" : ""}`}
              />{" "}
              {isRefreshing ? "Refreshing" : "Refresh"}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/5 dark:bg-white/5 text-xs uppercase tracking-wider text-text-muted border-b border-black/10 dark:border-white/10">
                <tr>
                  <th className="px-6 py-4 font-semibold">Student</th>
                  <th className="px-6 py-4 font-semibold">Roll Number</th>
                  <th className="px-6 py-4 font-semibold">Score</th>
                  <th className="px-6 py-4 font-semibold">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 dark:divide-white/10">
                {exam.attempts.length > 0 ? (
                  exam.attempts.map((attempt, idx) => {
                    const percentage =
                      (attempt.totalCorrect / attempt.totalQuestions) * 100;
                    return (
                      <tr
                        key={idx}
                        className="transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                      >
                        <td className="px-6 py-4 font-medium text-text">
                          {attempt.studentName}
                        </td>
                        <td className="px-6 py-4 font-mono text-text-muted">
                          {attempt.rollNumber}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-text">
                              {attempt.totalCorrect}
                            </span>
                            <span className="text-text-muted">
                              / {attempt.totalQuestions}
                            </span>
                            <span
                              className={`ml-2 text-xs font-bold px-2 py-0.5 rounded-full ${
                                percentage >= 75
                                  ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                  : percentage >= 40
                                    ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                                    : "bg-red-500/10 text-red-600 dark:text-red-400"
                              }`}
                            >
                              {percentage.toFixed(0)}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-text-muted">
                          {new Date(attempt.submittedAt).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-16 text-center text-text-muted"
                    >
                      <Users className="mx-auto h-12 w-12 opacity-20 mb-3" />
                      No students have attempted this exam yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
