// app/dashboard/questions/[id]/components/QuestionGroupCard.tsx
"use client";

import { Hash, Languages, Pencil, Trash2, CheckCircle2 } from "lucide-react";
import { QuestionGroupInput, TranslationInput } from "@/lib/types";

type Props = {
  group: QuestionGroupInput;
  onEditTranslation: (translation: TranslationInput) => void;
  onDeleteGroup: (groupId: string) => void;
};

export default function QuestionGroupCard({
  group,
  onEditTranslation,
  onDeleteGroup,
}: Props) {
  return (
    <div className="rounded-xl border border-black/10 dark:border-white/10 bg-surface shadow-sm overflow-hidden">
      {/* Group Header */}
      <div className="bg-black/5 dark:bg-white/5 px-4 py-3 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-headline font-bold flex items-center gap-1.5 text-text">
            <Hash className="h-4 w-4 text-primary" />
            Question {group.qn}
          </span>
          <div className="flex gap-2">
            {group.translations.map((t) => (
              <span
                key={t.id || t.lang}
                className="text-xs px-2 py-1 rounded-md bg-secondary/10 text-secondary font-semibold flex items-center gap-1"
              >
                <Languages className="h-3 w-3" /> {t.lang}
              </span>
            ))}
          </div>
        </div>

        {/* Delete Group Button */}
        {group.groupId && (
          <button
            onClick={() => group.groupId && onDeleteGroup(group.groupId)}
            className="p-1.5 rounded-md text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"
            title="Delete Entire Question Group"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Translations List */}
      <div className="divide-y divide-black/5 dark:divide-white/5">
        {group.translations.map((q, idx) => (
          <div
            key={q.id || idx}
            className="group p-4 md:p-6 hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors relative"
          >
            {q.id && (
              <button
                onClick={() => onEditTranslation(q)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-surface border border-black/10 dark:border-white/10 text-text-muted opacity-0 group-hover:opacity-100 hover:text-primary hover:border-primary/50 shadow-sm transition-all"
                title="Edit Translation"
              >
                <Pencil className="h-4 w-4" />
              </button>
            )}

            <p className="text-sm font-semibold text-secondary mb-2 uppercase tracking-wider">
              {q.lang}
            </p>
            <p className="font-medium text-lg mb-4 text-text pr-12">{q.q}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[q.o1, q.o2, q.o3, q.o4].map((opt, oIdx) => {
                const optionNum = oIdx + 1;
                const isCorrect = q.correctOptions?.includes(optionNum);
                return (
                  <div
                    key={optionNum}
                    className={`p-3 rounded-lg border text-sm flex items-center gap-3 ${
                      isCorrect
                        ? "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400"
                        : "border-black/10 dark:border-white/10 bg-background text-text-muted"
                    }`}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/5 dark:bg-white/10 text-xs font-bold">
                      {optionNum}
                    </span>
                    <span>{opt}</span>
                    {isCorrect && (
                      <CheckCircle2 className="h-4 w-4 ml-auto shrink-0 text-green-500" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
