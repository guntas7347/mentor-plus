// app/dashboard/questions/[id]/components/QuestionSetHeader.tsx
"use client";

import { useState } from "react";
import { BookOpen, Pencil, Save, X, Upload } from "lucide-react";
import { updateQuestionSetTitle } from "@/lib/actions/questions";

type Props = {
  setId: string;
  title: string;
  totalGroups: number;
  totalVariations: number;
  onOpenImport: () => void;
};

export default function QuestionSetHeader({
  setId,
  title,
  totalGroups,
  totalVariations,
  onOpenImport,
}: Props) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!newTitle.trim() || newTitle === currentTitle) {
      setIsEditing(false);
      return;
    }
    setIsSaving(true);
    try {
      await updateQuestionSetTitle(setId, newTitle);
      setCurrentTitle(newTitle);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update title:", error);
      alert("Failed to update title.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-surface p-6 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
            <BookOpen className="h-5 w-5" />
          </div>

          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="rounded-md border border-black/20 dark:border-white/20 bg-background px-3 py-1.5 text-lg font-bold font-headline text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-md bg-secondary p-1.5 text-white hover:bg-secondary-dark transition-colors"
              >
                <Save className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="rounded-md p-1.5 text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group">
              <h1 className="text-2xl font-bold font-headline text-text">
                {currentTitle}
              </h1>
              <button
                onClick={() => {
                  setNewTitle(currentTitle);
                  setIsEditing(true);
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        <p className="text-sm text-text-muted mt-2 ml-13">
          Set ID: <span className="font-mono text-xs">{setId}</span> &bull;
          Groups: {totalGroups} &bull; Total Variations: {totalVariations}
        </p>
      </div>

      <button
        onClick={onOpenImport}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-secondary-dark"
      >
        <Upload className="h-4 w-4" />
        Bulk Import JSON
      </button>
    </div>
  );
}
