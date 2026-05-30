"use client";

import { useState, useEffect, useCallback } from "react";
import {
  GraduationCap,
  Clock,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  CheckCircle2,
  Languages,
  User,
  Hash,
  FileCheck,
} from "lucide-react";
import { getExam, submitExam } from "@/lib/actions/exams";

// ============================================================================
// 1. Types & Interfaces
// ============================================================================
export type TranslationInput = {
  lang: string;
  q: string;
  o1: string;
  o2: string;
  o3: string;
  o4: string;
  correctOptions?: number[]; // Using array as per your previous schema
};

export type QuestionGroupInput = {
  qn: number;
  translations: TranslationInput[];
};

export type ExamData = {
  id: string;
  title: string;
  durationMinutes: number;
  questions: QuestionGroupInput[];
};

export type UserDetails = {
  name: string;
  rollNumber: string;
};

// ============================================================================
// 3. Sub-Components
// ============================================================================

// --- STEP 1: Code Entry ---
function CodeEntryStep({ onNext }: { onNext: (exam: ExamData) => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const exam: any = await getExam(code);
      if (!exam) {
        setError("Invalid Exam Code");
        return;
      }
      onNext(exam);
    } catch (err: any) {
      setError(err.message || "Validation failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md mt-20 p-8 rounded-2xl bg-surface border border-black/10 dark:border-white/10 shadow-xl text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
        <GraduationCap className="h-8 w-8" />
      </div>
      <h2 className="font-headline text-2xl font-bold text-text mb-2">
        Access Exam
      </h2>
      <p className="text-text-muted mb-8 text-sm">
        Enter your secure exam code to proceed.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-semibold text-text-muted mb-1.5">
            Exam Code
          </label>
          <input
            type="text"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g., PUNJAB26"
            className="w-full uppercase rounded-xl border border-black/20 dark:border-white/20 bg-background px-4 py-3 text-text focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 font-mono tracking-widest text-center"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !code.trim()}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-white transition-all hover:bg-primary-dark disabled:opacity-50"
        >
          {isLoading ? "Validating..." : "Verify Code"}{" "}
          <ChevronRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

// --- STEP 2: User Details ---
function UserDetailsStep({
  exam,
  onNext,
}: {
  exam: ExamData;
  onNext: (user: UserDetails) => void;
}) {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");

  return (
    <div className="mx-auto max-w-md mt-20 p-8 rounded-2xl bg-surface border border-black/10 dark:border-white/10 shadow-xl">
      <div className="mb-6 pb-6 border-b border-black/10 dark:border-white/10">
        <h3 className="font-headline font-bold text-text">{exam.title}</h3>
        <p className="text-sm text-text-muted flex items-center gap-1.5 mt-2">
          <Clock className="h-4 w-4" /> {exam.durationMinutes} Minutes &bull;{" "}
          {exam.questions.length} Questions
        </p>
      </div>

      <h2 className="font-headline text-xl font-bold text-text mb-6">
        Candidate Details
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext({ name, rollNumber: roll });
        }}
        className="space-y-5"
      >
        <div>
          <label className="block text-sm font-semibold text-text-muted mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-black/20 dark:border-white/20 bg-background pl-10 pr-4 py-3 text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-muted mb-1.5">
            Roll Number
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              required
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              className="w-full rounded-xl border border-black/20 dark:border-white/20 bg-background pl-10 pr-4 py-3 text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary font-mono"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={!name.trim() || !roll.trim()}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 font-semibold text-white transition-all hover:bg-secondary-dark disabled:opacity-50 mt-4"
        >
          Start Exam
        </button>
      </form>
    </div>
  );
}

// --- STEP 3: The Actual Test ---
function TestTakingStep({
  exam,
  user,
  onSubmit,
}: {
  exam: ExamData;
  user: UserDetails;
  onSubmit: (answers: Record<number, number>) => void;
}) {
  const [timeLeft, setTimeLeft] = useState(exam.durationMinutes * 60);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLang, setSelectedLang] = useState<string>("English");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const itemsPerPage = 10;

  // Derive available languages from the first question
  const availableLangs = exam.questions[0]?.translations.map((t) => t.lang) || [
    "English",
  ];

  // Prevent Refresh Warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Are you sure? Refreshing will erase your exam progress.";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) {
      onSubmit(answers); // Auto submit when time is up
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onSubmit, answers]);

  const handleOptionSelect = (qn: number, optionNum: number) => {
    setAnswers((prev) => ({ ...prev, [qn]: optionNum }));
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0)
      return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const totalPages = Math.ceil(exam.questions.length / itemsPerPage);
  const currentQuestions = exam.questions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const isLastPage = currentPage === totalPages;

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-screen py-4">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between rounded-2xl bg-surface p-4 shadow-sm border border-black/10 dark:border-white/10 mb-6">
        <div>
          <h1 className="font-headline font-bold text-lg text-text hidden sm:block">
            {exam.title}
          </h1>
          <p className="text-xs text-text-muted">
            {user.name} &bull; {user.rollNumber}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          {availableLangs.length > 1 && (
            <div className="flex bg-background rounded-lg p-1 border border-black/10 dark:border-white/10">
              {availableLangs.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${selectedLang === lang ? "bg-secondary text-white shadow-sm" : "text-text-muted hover:text-text"}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}

          {/* Timer */}
          <div
            className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono font-bold text-lg border ${timeLeft < 300 ? "bg-red-500/10 text-red-600 border-red-500/30 animate-pulse" : "bg-primary/10 text-primary border-primary/20"}`}
          >
            <Clock className="h-5 w-5" />
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="flex-1 overflow-y-auto space-y-6 pb-24 px-1">
        {currentQuestions.map((group, idx) => {
          const absoluteIndex = (currentPage - 1) * itemsPerPage + idx + 1;
          const translation =
            group.translations.find((t) => t.lang === selectedLang) ||
            group.translations[0];
          const selectedOption = answers[group.qn];

          return (
            <div
              key={group.qn}
              className="rounded-2xl border border-black/10 dark:border-white/10 bg-surface p-6 shadow-sm"
            >
              <div className="flex items-start gap-4 mb-6">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/5 dark:bg-white/10 font-bold text-text text-sm">
                  {absoluteIndex}
                </span>
                <p className="text-lg font-medium text-text pt-1 leading-relaxed">
                  {translation.q}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-12">
                {[1, 2, 3, 4].map((num) => {
                  const optKey = `o${num}` as keyof TranslationInput;
                  const isChecked = selectedOption === num;

                  return (
                    <label
                      key={num}
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${isChecked ? "border-secondary bg-secondary/5 ring-1 ring-secondary" : "border-black/10 dark:border-white/10 bg-background hover:border-black/30 dark:hover:border-white/30"}`}
                    >
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${isChecked ? "border-secondary bg-secondary" : "border-text-muted"}`}
                      >
                        {isChecked && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>
                      <input
                        type="radio"
                        name={`q-${group.qn}`}
                        className="hidden"
                        checked={isChecked}
                        onChange={() => handleOptionSelect(group.qn, num)}
                      />
                      <span
                        className={`text-sm ${isChecked ? "font-semibold text-text" : "text-text-muted"}`}
                      >
                        {translation[optKey] as string}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Footer */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-black/10 dark:border-white/10 bg-surface p-4 shadow-lg backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="text-sm font-medium text-text-muted">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 rounded-lg border border-black/10 dark:border-white/10 bg-background px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>

            {!isLastPage ? (
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="flex items-center gap-1 rounded-lg bg-text px-4 py-2 text-sm font-semibold text-background transition-colors hover:opacity-90"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to submit your exam? You cannot undo this action.",
                    )
                  ) {
                    onSubmit(answers);
                  }
                }}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-green-700"
              >
                <CheckCircle2 className="h-4 w-4" /> Submit Exam
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- STEP 4: Result Screen ---
function ResultStep({
  exam,
  score,
  total,
}: {
  exam: ExamData;
  score: number;
  total: number;
}) {
  const percentage = (score / total) * 100;
  const isPassed = percentage >= 40; // Example passing mark

  return (
    <div className="mx-auto max-w-lg mt-20 p-8 rounded-2xl bg-surface border border-black/10 dark:border-white/10 shadow-xl text-center">
      <div
        className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full mb-6 ${isPassed ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
      >
        {isPassed ? (
          <CheckCircle2 className="h-10 w-10" />
        ) : (
          <AlertCircle className="h-10 w-10" />
        )}
      </div>

      <h2 className="font-headline text-3xl font-bold text-text mb-2">
        Exam Submitted!
      </h2>
      <p className="text-text-muted mb-8">{exam.title}</p>

      <div className="rounded-xl bg-background border border-black/5 dark:border-white/5 p-6 mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">
          Your Score
        </p>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-5xl font-black text-text">{score}</span>
          <span className="text-xl font-medium text-text-muted">/ {total}</span>
        </div>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold bg-black/5 dark:bg-white/10 text-text">
          {percentage.toFixed(1)}%
        </div>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="w-full rounded-xl bg-secondary px-4 py-3 font-semibold text-white transition-all hover:bg-secondary-dark"
      >
        Return to Home
      </button>
    </div>
  );
}

// ============================================================================
// 4. Main Exam Runner (The Orchestrator)
// ============================================================================
export default function ExamRunner() {
  const [step, setStep] = useState(0);
  const [exam, setExam] = useState<ExamData | null>(null);
  const [user, setUser] = useState<UserDetails | null>(null);
  const [score, setScore] = useState<number>(0);

  const handleExamStart = (answers: Record<number, number>) => {
    if (!exam || !user) return;

    // Compile result
    let calculatedScore = 0;
    exam.questions.forEach((group) => {
      // Assuming English is always index 0 and has the ground truth correctOptions
      const correctOptions = group.translations[0].correctOptions || [];
      const userAnswer = answers[group.qn];
      if (correctOptions.includes(userAnswer)) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);

    submitExam({
      examId: exam.id,
      studentName: user.name,
      rollNumber: user.rollNumber,
      totalQuestions: exam.questions.length,
      totalCorrect: calculatedScore,
    });

    setStep(3); // Move to Result
  };

  return (
    <div className="min-h-screen bg-background font-body text-text selection:bg-secondary/30">
      {step === 0 && (
        <CodeEntryStep
          onNext={(data) => {
            setExam(data);
            setStep(1);
          }}
        />
      )}
      {step === 1 && exam && (
        <UserDetailsStep
          exam={exam}
          onNext={(data) => {
            setUser(data);
            setStep(2);
          }}
        />
      )}
      {step === 2 && exam && user && (
        <TestTakingStep exam={exam} user={user} onSubmit={handleExamStart} />
      )}
      {step === 3 && exam && (
        <ResultStep exam={exam} score={score} total={exam.questions.length} />
      )}
    </div>
  );
}
