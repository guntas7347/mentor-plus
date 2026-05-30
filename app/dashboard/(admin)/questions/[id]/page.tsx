// app/dashboard/questions/[id]/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import { Upload } from "lucide-react";
import {
  getAllQuestions,
  importQuestions,
  updateQuestion,
  deleteQuestionGroup,
} from "@/lib/actions/questions";

import { QuestionGroupInput, TranslationInput } from "@/lib/types";
import QuestionSetHeader from "@/components/QuestionSetHeader";
import QuestionGroupCard from "@/components/QuestionGroupCard";
import EditQuestionModal from "@/components/EditQuestionModal";
import ImportJsonModal from "@/components/ImportJsonModal";

export default function QuestionSetDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const setId = unwrappedParams.id;

  const [questionGroups, setQuestionGroups] = useState<QuestionGroupInput[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  // Modal States
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [editingTranslation, setEditingTranslation] =
    useState<TranslationInput | null>(null);

  const loadQuestions = async () => {
    setIsLoading(true);
    try {
      const data = await getAllQuestions(setId);
      setQuestionGroups(data as QuestionGroupInput[]);
    } catch (error) {
      console.error("Failed to load questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [setId]);

  // --- Actions ---

  const handleImport = async (data: QuestionGroupInput[]) => {
    await importQuestions(setId, data);
    await loadQuestions();
  };

  const handleUpdateTranslation = async (
    updatedTranslation: TranslationInput,
  ) => {
    if (!updatedTranslation.id) return;
    try {
      await updateQuestion(updatedTranslation.id, updatedTranslation);
      await loadQuestions();
      setEditingTranslation(null);
    } catch (error) {
      console.error("Failed to update question:", error);
      alert("Failed to update question.");
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this entire question group? This will remove all translations.",
      )
    ) {
      try {
        await deleteQuestionGroup(groupId);
        await loadQuestions();
      } catch (error) {
        console.error("Failed to delete group:", error);
        alert("Failed to delete group.");
      }
    }
  };

  const totalTranslations = questionGroups.reduce(
    (acc, curr) => acc + curr.translations.length,
    0,
  );

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-8 font-body bg-background text-text min-h-screen">
      <QuestionSetHeader
        setId={setId}
        title={`Question Set ${setId}`}
        totalGroups={questionGroups.length}
        totalVariations={totalTranslations}
        onOpenImport={() => setIsImportModalOpen(true)}
      />

      {/* --- Questions List --- */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-12 text-text-muted animate-pulse">
            Loading questions...
          </div>
        ) : questionGroups.length === 0 ? (
          <div className="text-center py-16 bg-surface rounded-xl border border-dashed border-black/20 dark:border-white/20">
            <Upload className="mx-auto h-12 w-12 text-text-muted/50 mb-3" />
            <p className="text-text-muted">
              No questions found. Import JSON to get started.
            </p>
          </div>
        ) : (
          questionGroups.map((group) => (
            <QuestionGroupCard
              key={group.groupId || group.qn}
              group={group}
              onEditTranslation={setEditingTranslation}
              onDeleteGroup={handleDeleteGroup}
            />
          ))
        )}
      </div>

      {/* --- Modals --- */}
      {editingTranslation && (
        <EditQuestionModal
          question={editingTranslation}
          onClose={() => setEditingTranslation(null)}
          onSave={handleUpdateTranslation}
        />
      )}

      {isImportModalOpen && (
        <ImportJsonModal
          onClose={() => setIsImportModalOpen(false)}
          onImport={handleImport}
        />
      )}
    </div>
  );
}
