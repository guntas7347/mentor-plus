"use client";

import { useEffect, useState } from "react";
import { getMeta, upsertMeta } from "@/lib/actions/meta";
import {
  Save,
  Loader2,
  Settings,
  CheckCircle2,
  X,
  Plus,
  AlertCircle,
} from "lucide-react";

// ==========================================
// 1. HARDCODED CONFIGURATION SCHEMA
// ==========================================
type ConfigType = "string" | "boolean" | "string[]" | "text";

interface ConfigField {
  label: string;
  key: string;
  type: ConfigType;
  description: string;
  defaultValue: any;
  isPublic: boolean;
}

const CONFIG_FIELDS: ConfigField[] = [
  {
    label: "Categories",
    key: "categories",
    type: "string[]",
    description: "Categories for courses, test series and syllabus",
    defaultValue: [],
    isPublic: true,
  },
];

// ==========================================
// 2. MAIN PAGE COMPONENT
// ==========================================

export default function ConfigurationPage() {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [arrayInputs, setArrayInputs] = useState<Record<string, string>>({}); // Temp state for string[] inputs

  // Fetch initial data
  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const results: Record<string, any> = {};
        // Fetch all configs in parallel
        await Promise.all(
          CONFIG_FIELDS.map(async (field) => {
            const val = await getMeta(field.key);
            // Fallback to default if undefined/null
            results[field.key] =
              val !== undefined && val !== null ? val : field.defaultValue;
          }),
        );
        const formatted = Object.fromEntries(
          Object.entries(results).map(([key, item]: any) => [
            key,
            item.value?.value ?? item.value,
          ]),
        );

        setFormData(formatted);
      } catch (error) {
        console.error("Failed to load configs", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfigs();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");

    try {
      // Save all configs in parallel
      await Promise.all(
        CONFIG_FIELDS.map((field) =>
          upsertMeta(field.key, formData[field.key], field.isPublic),
        ),
      );
      setSaveStatus("success");

      // Reset success message after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      console.error("Failed to save configs", error);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setSaveStatus("idle"); // Reset status when user makes changes
  };

  // Helper for adding tags to string[]
  const addToArray = (key: string) => {
    const val = arrayInputs[key]?.trim();
    if (!val) return;

    const currentArray = formData[key] || [];
    if (!currentArray.includes(val)) {
      updateField(key, [...currentArray, val]);
    }
    setArrayInputs((prev) => ({ ...prev, [key]: "" })); // Clear input
  };

  // Helper for removing tags from string[]
  const removeFromArray = (key: string, valueToRemove: string) => {
    const currentArray = formData[key] || [];
    updateField(
      key,
      currentArray.filter((v: string) => v !== valueToRemove),
    );
  };

  return (
    <div className="min-h-screen bg-background text-text transition-colors duration-300 pb-20">
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Settings size={20} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-headline font-extrabold">
              System Configuration
            </h1>
            <p className="text-xs font-body text-text-muted hidden sm:block">
              Manage global variables and platform settings
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          {saveStatus === "success" && (
            <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 animate-in fade-in slide-in-from-right-4">
              <CheckCircle2 size={16} /> Saved
            </span>
          )}
          {saveStatus === "error" && (
            <span className="flex items-center gap-1.5 text-sm font-bold text-red-600 dark:text-red-400">
              <AlertCircle size={16} /> Error
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={isLoading || isSaving}
            className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary-dark disabled:opacity-70 disabled:cursor-not-allowed text-white font-headline font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Save Changes
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {isLoading ? (
          // SKELETON LOADER
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-surface p-6 rounded-2xl border border-gray-200 dark:border-white/5 animate-pulse"
              >
                <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/2 mb-6"></div>
                <div className="h-12 bg-gray-200 dark:bg-white/10 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          // FORM FIELDS
          <div className="space-y-6">
            {CONFIG_FIELDS.map((field) => (
              <div
                key={field.key}
                className="bg-surface p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm transition-all duration-300 hover:border-primary/30"
              >
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <label className="text-base font-headline font-bold text-text">
                      {field.label}
                    </label>
                    {field.isPublic && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-secondary/10 text-secondary tracking-widest uppercase">
                        Public
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-body text-text-muted">
                    {field.description}
                  </p>
                </div>

                {/* --- STRING INPUT --- */}
                {field.type === "string" && (
                  <input
                    type="text"
                    value={formData[field.key] || ""}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    className="w-full bg-background border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl p-3 outline-none transition-all text-text font-body"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                )}

                {/* --- TEXTAREA INPUT --- */}
                {field.type === "text" && (
                  <textarea
                    value={formData[field.key] || ""}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    rows={3}
                    className="w-full bg-background border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl p-3 outline-none transition-all text-text font-body resize-y"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                )}

                {/* --- BOOLEAN TOGGLE --- */}
                {field.type === "boolean" && (
                  <button
                    type="button"
                    onClick={() => updateField(field.key, !formData[field.key])}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                      ${formData[field.key] ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"}
                    `}
                  >
                    <span className="sr-only">Toggle {field.label}</span>
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-sm
                        ${formData[field.key] ? "translate-x-6" : "translate-x-1"}
                      `}
                    />
                  </button>
                )}

                {/* --- STRING ARRAY (TAGS) INPUT --- */}
                {field.type === "string[]" && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={arrayInputs[field.key] || ""}
                        onChange={(e) =>
                          setArrayInputs((prev) => ({
                            ...prev,
                            [field.key]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addToArray(field.key);
                          }
                        }}
                        className="flex-1 bg-background border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl p-3 outline-none transition-all text-text font-body"
                        placeholder="Type and press Enter to add..."
                      />
                      <button
                        type="button"
                        onClick={() => addToArray(field.key)}
                        className="px-4 py-3 bg-secondary/10 hover:bg-secondary/20 text-secondary font-bold rounded-xl transition-colors flex items-center gap-1"
                      >
                        <Plus size={18} /> Add
                      </button>
                    </div>

                    {/* Tag Display */}
                    {formData[field.key] && formData[field.key].length > 0 && (
                      <div className="flex flex-wrap gap-2 p-4 bg-background rounded-xl border border-gray-100 dark:border-white/5">
                        {(formData[field.key] as string[]).map((val, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-gray-200 dark:border-white/10 text-sm font-medium text-text"
                          >
                            {val}
                            <button
                              type="button"
                              onClick={() => removeFromArray(field.key, val)}
                              className="text-text-muted hover:text-red-500 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
