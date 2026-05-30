// app/dashboard/questions/[id]/components/ImportJsonModal.tsx
"use client";

import { useState } from "react";
import { Upload, X, AlertCircle, Copy } from "lucide-react";
import { QuestionGroupInput } from "@/lib/types";
import toast from "react-hot-toast";

type Props = {
  onClose: () => void;
  onImport: (data: QuestionGroupInput[]) => Promise<void>;
};

export default function ImportJsonModal({ onClose, onImport }: Props) {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const validateJSON = (): QuestionGroupInput[] | null => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed)) {
        setError("Root element must be a JSON array");
        return null;
      }
      return parsed;
    } catch (e) {
      setError("Invalid JSON format. Please check syntax.");
      return null;
    }
  };

  const handleSubmit = async () => {
    setError(null);
    const data = validateJSON();
    if (!data) return;

    setIsImporting(true);
    try {
      await onImport(data);
      onClose();
    } catch (err) {
      setError("Server failed to import questions. Check console.");
    } finally {
      setIsImporting(false);
    }
  };

  const onCopy = async (topic: string) => {
    const prompt = `
Generate multiple-choice questions about: ${topic}

Return ONLY valid JSON inside codebox.
Do NOT wrap in markdown.
Do NOT include explanations.
Do NOT include any text before or after the JSON.
Output must exactly match this schema:

[
  {
    "qn": 1,
    "translations": [
      {
        "lang": "English",
        "q": "Question text",
        "o1": "Option 1",
        "o2": "Option 2",
        "o3": "Option 3",
        "o4": "Option 4",
        "correctOptions": [1]
      },
      {
        "lang": "Hindi",
        "q": "Question text",
        "o1": "Option 1",
        "o2": "Option 2",
        "o3": "Option 3",
        "o4": "Option 4",
        "correctOptions": [1]
      }
    ]
  }
]

Rules:
- Output ONLY JSON in codebox.
- Root value must be an array.
- Generate at least 20 questions.
- qn must start at 1 and increment by 1.
- Each question must have exactly 2 translations: English and Hindi.
- Each translation must have exactly 4 options: o1, o2, o3, o4.
- correctOptions must contain option numbers only (1-4).
- Use correct Hindi translations, not transliterations.
- All translations for the same qn must represent the same question.
- Ensure the JSON is valid and parsable.
`;

    try {
      await navigator.clipboard.writeText(prompt.trim());
      toast.success("Prompt copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy prompt to clipboard");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full h-full max-w-4xl py-6 flex flex-col">
        <div className="flex-1 rounded-2xl bg-surface p-6 shadow-xl border border-black/10 dark:border-white/10 flex flex-col overflow-hidden">
          <div className="mb-4 flex items-center justify-between shrink-0">
            <h2 className="text-xl font-bold font-headline text-text flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" /> Import JSON
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400 shrink-0">
              <AlertCircle className="h-4 w-4" /> {error}
            </div>
          )}

          <div className="flex justify-between gap-3 shrink-0 pt-3 border-t border-black/10 dark:border-white/10">
            <button
              onClick={() => onCopy("some topic")}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark disabled:opacity-50"
            >
              <Copy className="h-5 w-5" /> Copy Prompt
            </button>
          </div>

          <div className="flex-1 min-h-0 mb-4">
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='[\n  {\n    "qn": 1,\n    "translations": [\n      {\n        "lang": "English",\n        "q": "What is RAM?",\n        ...\n      }\n    ]\n  }\n]'
              className="w-full h-full rounded-xl border border-black/20 dark:border-white/20 bg-background p-4 text-sm font-mono text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 shrink-0 pt-3 border-t border-black/10 dark:border-white/10">
            <button
              onClick={onClose}
              disabled={isImporting}
              className="rounded-lg px-4 py-2 text-sm font-medium text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isImporting || !jsonInput.trim()}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark disabled:opacity-50"
            >
              {isImporting ? "Processing..." : "Validate & Import"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
