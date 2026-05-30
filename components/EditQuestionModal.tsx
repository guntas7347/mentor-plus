// app/dashboard/questions/[id]/components/EditQuestionModal.tsx
"use client";

import { useState } from "react";
import { Pencil, X, CheckCircle2 } from "lucide-react";
import { TranslationInput } from "@/lib/types";

type Props = {
  question: TranslationInput;
  onClose: () => void;
  onSave: (updatedQuestion: TranslationInput) => Promise<void>;
};

export default function EditQuestionModal({
  question,
  onClose,
  onSave,
}: Props) {
  const [formData, setFormData] = useState<TranslationInput>({ ...question });
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCorrectOption = (num: number) => {
    const current = formData.correctOptions || [];
    const updated = current.includes(num)
      ? current.filter((n) => n !== num)
      : [...current, num];
    setFormData({ ...formData, correctOptions: updated.sort() });
  };

  const handleSubmit = async () => {
    setIsUpdating(true);
    await onSave(formData);
    setIsUpdating(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-surface p-6 shadow-xl border border-black/10 dark:border-white/10 flex flex-col max-h-[90vh]">
        <div className="mb-4 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-bold font-headline text-text flex items-center gap-2">
            <Pencil className="h-5 w-5 text-primary" /> Edit {formData.lang}{" "}
            Question
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text-muted mb-1.5">
              Question Content
            </label>
            <textarea
              value={formData.q}
              onChange={(e) => setFormData({ ...formData, q: e.target.value })}
              className="w-full h-24 rounded-xl border border-black/20 dark:border-white/20 bg-background p-3 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((num) => {
              const key = `o${num}` as keyof TranslationInput;
              return (
                <div key={num}>
                  <label className="block text-sm font-semibold text-text-muted mb-1.5">
                    Option {num}
                  </label>
                  <input
                    type="text"
                    value={formData[key] as string}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                    className="w-full rounded-lg border border-black/20 dark:border-white/20 bg-background px-3 py-2 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                  />
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <label className="block text-sm font-semibold text-text-muted mb-2">
              Mark Correct Option(s)
            </label>
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4].map((num) => {
                const isChecked = formData.correctOptions?.includes(num);
                return (
                  <label
                    key={num}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                      isChecked
                        ? "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400"
                        : "border-black/20 dark:border-white/20 bg-background text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isChecked}
                      onChange={() => toggleCorrectOption(num)}
                    />
                    <div
                      className={`h-4 w-4 rounded-sm border flex items-center justify-center ${isChecked ? "border-green-500 bg-green-500" : "border-black/30 dark:border-white/30"}`}
                    >
                      {isChecked && (
                        <CheckCircle2 className="h-3 w-3 text-white" />
                      )}
                    </div>
                    Option {num}
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 shrink-0 pt-4 mt-2 border-t border-black/10 dark:border-white/10">
          <button
            onClick={onClose}
            disabled={isUpdating}
            className="rounded-lg px-4 py-2 text-sm font-medium text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isUpdating || !formData.q.trim()}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark disabled:opacity-50"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
