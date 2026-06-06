"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  ShieldCheck,
  Home,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Clock,
  User,
  Hash,
  CheckCircle2,
  Info,
} from "lucide-react";

import { getExam, submitExam } from "@/lib/actions/exams";

export type TranslationInput = {
  lang: string;
  q: string;
  o1: string;
  o2: string;
  o3: string;
  o4: string;
  correctOptions?: number[];
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
      if (!exam) throw new Error("Invalid Exam Code");
      onNext(exam);
    } catch (err: any) {
      setError(err.message || "Validation failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-1 items-center justify-center p-4 min-h-0">
      <div className="w-full max-w-md p-8 rounded-2xl bg-surface border border-black/10 dark:border-white/10 shadow-xl text-center">
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
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g., PUNJAB26"
              className="w-full uppercase rounded-xl border border-black/20 dark:border-white/20 bg-background px-4 py-3 text-text focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 font-mono tracking-widest text-center transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !code.trim()}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-white transition-all hover:bg-primary-dark disabled:opacity-50 active:scale-95"
          >
            {isLoading ? "Validating..." : "Verify Code"}{" "}
            <ChevronRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

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
    <div className="flex h-full w-full flex-1 items-center justify-center p-4 min-h-0">
      <div className="w-full max-w-md p-8 rounded-2xl bg-surface border border-black/10 dark:border-white/10 shadow-xl">
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
                className="w-full rounded-xl border border-black/20 dark:border-white/20 bg-background pl-10 pr-4 py-3 text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-all"
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
                className="w-full rounded-xl border border-black/20 dark:border-white/20 bg-background pl-10 pr-4 py-3 text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary font-mono transition-all"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={!name.trim() || !roll.trim()}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 font-semibold text-white transition-all hover:bg-secondary-dark disabled:opacity-50 active:scale-95 mt-4"
          >
            Start Exam
          </button>
        </form>
      </div>
    </div>
  );
}

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
  const isPassed = percentage >= 40;

  return (
    <div className="flex h-full w-full flex-1 items-center justify-center p-4 min-h-0">
      <div className="w-full max-w-lg p-8 rounded-2xl bg-surface border border-black/10 dark:border-white/10 shadow-xl text-center">
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

        <div className="rounded-xl bg-background border border-black/5 dark:border-white/5 p-6 mb-8 shadow-inner">
          <p className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">
            Your Score
          </p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl font-black text-text">{score}</span>
            <span className="text-xl font-medium text-text-muted">
              / {total}
            </span>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold bg-black/5 dark:bg-white/10 text-text">
            {percentage.toFixed(1)}%
          </div>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="w-full rounded-xl bg-secondary px-4 py-3 font-semibold text-white transition-all hover:bg-secondary-dark active:scale-95"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

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

  const availableLangs = exam.questions[0]?.translations.map((t) => t.lang) || [
    "English",
  ];

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Are you sure? Refreshing will erase your exam progress.";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      onSubmit(answers);
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
    return h > 0
      ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
      : `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const totalPages = Math.ceil(exam.questions.length / itemsPerPage);
  const currentQuestions = exam.questions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const isLastPage = currentPage === totalPages;

  return (
    <ExamInterface
      exam={exam}
      user={user}
      availableLangs={availableLangs}
      selectedLang={selectedLang}
      setSelectedLang={setSelectedLang}
      timeLeft={timeLeft}
      formatTime={formatTime}
      currentQuestions={currentQuestions}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      answers={answers}
      handleOptionSelect={handleOptionSelect}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
      isLastPage={isLastPage}
      onSubmit={onSubmit}
    />
  );
}

const QuestionCard = ({
  group,
  absoluteIndex,
  selectedLang,
  selectedOption,
  onSelect,
}: any) => {
  const translation =
    group.translations.find((t: any) => t.lang === selectedLang) ||
    group.translations[0];

  return (
    <div className="rounded-2xl border border-black/10 bg-surface p-5 shadow-sm transition-all hover:shadow-md dark:border-white/10 md:p-6">
      <div className="mb-6 flex items-start gap-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-bold text-primary">
          {absoluteIndex}
        </span>
        <p className="pt-0.5 text-base font-medium leading-relaxed text-text md:text-lg">
          {translation.q}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 pl-0 md:grid-cols-2 md:pl-12">
        {[1, 2, 3, 4].map((num) => {
          const optKey = `o${num}`;
          const isChecked = selectedOption === num;

          return (
            <label
              key={num}
              className={`relative group flex cursor-pointer items-center gap-4 rounded-xl border p-4 outline-none transition-all duration-200 focus-within:ring-2 focus-within:ring-secondary/50 ${
                isChecked
                  ? "border-secondary bg-secondary/5 shadow-sm ring-1 ring-secondary"
                  : "border-black/10 bg-background hover:border-black/30 hover:bg-black/5 dark:border-white/10 dark:hover:border-white/30 dark:hover:bg-white/5"
              }`}
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                  isChecked
                    ? "scale-110 border-secondary bg-secondary"
                    : "border-black/20 group-hover:border-black/40 dark:border-white/20 dark:group-hover:border-white/40"
                }`}
              >
                {isChecked && (
                  <div className="h-2 w-2 animate-in zoom-in rounded-full bg-white duration-200" />
                )}
              </div>
              <input
                type="radio"
                name={`q-${group.qn}`}
                className="sr-only"
                checked={isChecked}
                onChange={() => onSelect(group.qn, num)}
              />
              <span
                className={`text-sm leading-snug transition-colors md:text-base ${
                  isChecked
                    ? "font-semibold text-text"
                    : "text-text-muted group-hover:text-text"
                }`}
              >
                {translation[optKey]}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

function ExamInterface({
  exam,
  user,
  availableLangs,
  selectedLang,
  setSelectedLang,
  timeLeft,
  formatTime,
  currentQuestions,
  currentPage,
  itemsPerPage,
  answers,
  handleOptionSelect,
  totalPages,
  setCurrentPage,
  isLastPage,
  onSubmit,
}: any) {
  const TimerDisplay = () => (
    <div
      className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 font-mono text-2xl font-bold transition-colors duration-300 ${
        timeLeft < 300
          ? "animate-pulse border-red-500/30 bg-red-500/10 text-red-600"
          : "border-primary/20 bg-primary/10 text-primary"
      }`}
    >
      <Clock className="h-6 w-6 shrink-0" />
      <span className="min-w-[5.5rem] text-center tracking-tight">
        {formatTime(timeLeft)}
      </span>
    </div>
  );

  const LanguageToggle = () =>
    availableLangs.length > 1 && (
      <div className="flex w-full flex-col gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
          Exam Language
        </span>
        <div className="flex w-full rounded-lg border border-black/10 bg-black/5 p-1 dark:border-white/10 dark:bg-white/5">
          {availableLangs.map((lang: string) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-bold transition-all duration-200 ${
                selectedLang === lang
                  ? "scale-100 bg-secondary text-white shadow-md"
                  : "scale-95 text-text-muted hover:bg-black/5 hover:text-text dark:hover:bg-white/5"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    );

  const NavigationButtons = () => (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between text-sm font-semibold text-text-muted">
          <span>Progress</span>
          <span>
            Page <span className="text-text">{currentPage}</span> of{" "}
            {totalPages}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <div
            className="h-full bg-secondary transition-all duration-500"
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex w-full gap-2">
        <button
          onClick={() => setCurrentPage((p: number) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-black/10 bg-background px-3 py-3 text-sm font-medium text-text transition-all hover:bg-black/5 active:scale-95 disabled:pointer-events-none disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/5"
        >
          <ChevronLeft className="h-4 w-4" /> Prev
        </button>

        {!isLastPage ? (
          <button
            onClick={() =>
              setCurrentPage((p: number) => Math.min(totalPages, p + 1))
            }
            className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-text px-3 py-3 text-sm font-semibold text-background shadow-sm transition-all hover:opacity-90 active:scale-95"
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
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-3 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-green-700 hover:shadow-lg active:scale-95"
          >
            <CheckCircle2 className="h-4 w-4" /> Submit
          </button>
        )}
      </div>
    </div>
  );

  return (
    // STRICT Layout wrapper: h-full min-h-0 prevents breaking the boundary
    <div className="mx-auto flex h-full min-h-0 w-full max-w-7xl flex-col md:flex-row gap-0 md:gap-6 md:p-6">
      {/* ==================================================== */}
      {/* MOBILE HEADER (Visible only on screens < md)          */}
      {/* ==================================================== */}
      <div className="mb-2 flex shrink-0 flex-col gap-4 border-b border-black/10 bg-surface p-4 shadow-sm dark:border-white/10 md:hidden">
        <div className="flex flex-col">
          <h1 className="line-clamp-1 font-headline text-base font-bold text-text">
            {exam.title}
          </h1>
          <p className="text-xs font-medium text-text-muted">
            {user.name} &bull; {user.rollNumber}
          </p>
        </div>
        <TimerDisplay />
        <LanguageToggle />
        <NavigationButtons />
      </div>

      {/* ==================================================== */}
      {/* DESKTOP SIDEBAR (Left Side - Fixed inside layout)    */}
      {/* ==================================================== */}
      <aside className="hidden shrink-0 flex-col md:flex md:w-80 rounded-2xl border border-black/10 bg-surface p-6 shadow-sm dark:border-white/10 overflow-y-auto custom-scrollbar h-fit max-h-full gap-6">
        {/* All content stacked at the top, no mt-auto used here! */}
        <div className="flex flex-col border-b border-black/10 pb-5 dark:border-white/10">
          <h1 className="mb-3 font-headline text-xl font-bold leading-tight text-text">
            {exam.title}
          </h1>
          <div className="flex flex-col space-y-1 text-sm font-medium text-text-muted">
            <span className="text-text">{user.name}</span>
            <span>Roll Number: {user.rollNumber}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 pb-5 border-b border-black/10 dark:border-white/10">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
            Controls
          </span>
          <NavigationButtons />
        </div>

        <div className="flex flex-col gap-2 pb-5 border-b border-black/10 dark:border-white/10">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
            Time Remaining
          </span>
          <TimerDisplay />
        </div>

        {availableLangs.length > 1 && <LanguageToggle />}
      </aside>

      {/* ==================================================== */}
      {/* MAIN CONTENT AREA (Scrollable Questions)               */}
      {/* ==================================================== */}
      <div className="flex min-h-0 flex-1 flex-col bg-surface border-t border-black/10 dark:border-white/10 md:border md:rounded-2xl md:shadow-sm">
        {/* THIS is the exact div that handles scrolling */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 space-y-6">
          {/* Render Questions */}
          {currentQuestions.map((group: any, idx: number) => (
            <QuestionCard
              key={group.qn}
              group={group}
              absoluteIndex={(currentPage - 1) * itemsPerPage + idx + 1}
              selectedLang={selectedLang}
              selectedOption={answers[group.qn]}
              onSelect={handleOptionSelect}
            />
          ))}

          {/* Inline Content Footer */}
          <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-black/10 bg-black/5 p-6 text-center dark:border-white/10 dark:bg-white/5">
            <h3 className="mb-2 font-headline text-lg font-bold text-text">
              Page {currentPage} Ended
            </h3>
            <p className="flex items-center justify-center gap-2 text-sm font-medium text-text-muted">
              <Info className="h-4 w-4 shrink-0" />
              {isLastPage
                ? "You have reached the end of the exam. Review your answers and submit using the control panel."
                : "Please navigate to the next page to continue."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExamRunner() {
  const [step, setStep] = useState(0);
  const [exam, setExam] = useState<ExamData | null>(null);
  const [user, setUser] = useState<UserDetails | null>(null);
  const [score, setScore] = useState<number>(0);

  const handleExamStart = (answers: Record<number, number>) => {
    if (!exam || !user) return;

    let calculatedScore = 0;
    exam.questions.forEach((group) => {
      const correctOptions = group.translations[0].correctOptions || [];
      if (correctOptions.includes(answers[group.qn])) {
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
    setStep(3);
  };

  return (
    // STRICT flex-1 min-h-0 wrapper required to maintain layout scroll constraints
    <div className="flex flex-col flex-1 h-full min-h-0 w-full bg-background">
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
