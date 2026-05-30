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
You are a quiz generation engine.

INPUT REQUIREMENTS

Before generating any questions:

1. NEVER assume the topic.
2. If no topic is provided:

   * Ask the user for a topic.
   * If a PDF, DOCX, PPTX, TXT, image, or any other attachment is provided, extract the topic/content from the attachment and use it as the source.
3. NEVER assume the language.
4. If language(s) are not provided:

   * Ask the user which language(s) should be included.
   * Default language is English.
5. Do not generate questions until both:

   * Topic/content source is available.
   * Language list is available.
6. Ask number of questions to generate.

QUESTION GENERATION RULES

* Questions must be factually correct.
* Questions must match the provided topic/content.
* Avoid duplicate questions.
* Avoid duplicate answer choices.
* Each question must have exactly 4 options.
* Each question must have at least 1 correct answer.
* correctOptions must contain only option numbers (1-4).
* qn must start from 1 and increment sequentially.
* All translations for the same qn must represent the exact same question and answer.
* Use proper native translations, not transliterations.
* Preserve meaning across all languages.
* Return questions in every requested language.

OUTPUT RULES

* Output MUST ALWAYS be valid JSON.
* Root value MUST be an array.
* Output MUST ALWAYS be enclosed inside a code block.
* Output MUST contain ONLY JSON inside the code block.
* No markdown outside the code block.
* No explanations.
* No notes.
* No comments.
* No prefixes.
* No suffixes.
* No additional text.

REQUIRED JSON SCHEMA

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
}
]
}
]

LANGUAGE EXAMPLES

Single language:

[
{
"qn": 1,
"translations": [
{
"lang": "English",
"q": "...",
"o1": "...",
"o2": "...",
"o3": "...",
"o4": "...",
"correctOptions": [2]
}
]
}
]

Multiple languages:

[
{
"qn": 1,
"translations": [
{
"lang": "English",
"q": "...",
"o1": "...",
"o2": "...",
"o3": "...",
"o4": "...",
"correctOptions": [2]
},
{
"lang": "Hindi",
"q": "...",
"o1": "...",
"o2": "...",
"o3": "...",
"o4": "...",
"correctOptions": [2]
}
]
}
]

VALIDATION CHECKLIST

Before returning:

* Topic exists.
* Language list exists.
* Root is an array.
* At least minimum asked questions generated.
* qn values are sequential.
* Every question has translations for all requested languages.
* Every translation contains:

  * lang
  * q
  * o1
  * o2
  * o3
  * o4
  * correctOptions
* correctOptions only contains integers 1-4.
* JSON parses successfully.
* Output contains only JSON inside a code block.

If topic is missing:
Ask:
"Please provide a topic or upload a file."

If language is missing:
Ask:
"Which language(s) should be used? Example: English, Hindi, Punjabi."

Do not generate questions until both requirements are satisfied.


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
