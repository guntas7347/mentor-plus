"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  Globe,
  CreditCard,
  ToggleRight,
  Save,
  Loader2,
  Mail,
  X,
  Layers,
  ListChecks,
} from "lucide-react";
// Import your server actions (adjust path if needed)
import { getConfig, updateConfig } from "@/lib/actions/config";
// Import your toast library
import { notify } from "@/lib/toast";

// ============================================================================
// 1. SCHEMA DEFINITION: Add new config sections here!
// ============================================================================

type FieldType = "string" | "number" | "boolean" | "password" | "stringArray";

interface ConfigField {
  name: string; // The JSON key inside the DB (e.g. 'siteName')
  label: string; // The UI Label
  type: FieldType;
  placeholder?: string;
  defaultValue?: any;
  hint?: string;
}

interface ConfigSchemaItem {
  key: string; // The primary key for the Prisma Config model
  name: string;
  description: string;
  icon: React.ElementType;
  fields: ConfigField[]; // Defines the shape of the JSON object stored in value
}

const CONFIG_SCHEMA: ConfigSchemaItem[] = [
  {
    key: "course_categories",
    name: "Course Categories",
    description:
      "Manage categories used to organize courses across the platform.",
    icon: Layers, // or any relevant icon
    fields: [
      {
        name: "categories",
        label: "Course Categories",
        type: "stringArray",
        placeholder: "e.g. Web Development",
        hint: "Add multiple categories. Press enter after each.",
      },
    ],
  },
  {
    key: "test_series_categories",
    name: "Test Series Categories",
    description:
      "Manage categories for test series organization and filtering.",
    icon: ListChecks, // or any relevant icon
    fields: [
      {
        name: "categories",
        label: "Test Series Categories",
        type: "stringArray",
        placeholder: "e.g. UPSC Prelims",
        hint: "Used to group and filter test series.",
      },
    ],
  },
];

// ============================================================================
// 2. HELPER COMPONENTS
// ============================================================================

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/50 bg-surface dark:bg-[#374151] text-on-surface dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

// Dedicated component to handle the array of strings
function StringArrayInput({
  value,
  onChange,
  placeholder,
  hint,
  label,
}: {
  value: string[];
  onChange: (val: string[]) => void;
  placeholder?: string;
  hint?: string;
  label: string;
}) {
  const [inputValue, setInputValue] = useState("");
  const items = Array.isArray(value) ? value : [];

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !items.includes(trimmed)) {
      onChange([...items, trimmed]);
      setInputValue("");
    }
  };

  const handleRemove = (itemToRemove: string) => {
    onChange(items.filter((i) => i !== itemToRemove));
  };

  return (
    <div>
      <label className="block text-xs font-bold text-on-surface-variant dark:text-gray-400 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          className={inputClass}
          placeholder={placeholder || "Type and press Enter..."}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 bg-surface-container-high dark:bg-gray-700 text-on-surface dark:text-white rounded-xl text-sm font-bold hover:bg-surface-container-highest transition-colors shrink-0"
        >
          Add
        </button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {items.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 dark:bg-[#1a56db]/20 text-primary dark:text-[#b5c4ff] text-xs font-semibold rounded-full border border-primary/20 dark:border-[#1a56db]/30 shadow-sm"
            >
              {item}
              <button
                type="button"
                onClick={() => handleRemove(item)}
                className="hover:text-red-500 transition-colors opacity-70 hover:opacity-100"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
      {hint && (
        <p className="text-xs text-on-surface-variant dark:text-gray-500 mt-1.5">
          {hint}
        </p>
      )}
    </div>
  );
}

// ============================================================================
// 3. MAIN PAGE COMPONENT
// ============================================================================

export default function ConfigPage() {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  // Fetch all configurations on mount
  useEffect(() => {
    async function fetchConfigs() {
      try {
        const promises = CONFIG_SCHEMA.map(async (schema) => {
          const record = await getConfig(schema.key);
          return { key: schema.key, value: record?.value || {} };
        });

        const results = await Promise.all(promises);

        // Convert to key-value object: { "general_settings": { siteName: "..." } }
        const dataMap = results.reduce(
          (acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
          },
          {} as Record<string, any>,
        );

        setFormData(dataMap);
      } catch (error) {
        notify.error("Failed to load configurations.");
      } finally {
        setIsPageLoading(false);
      }
    }

    fetchConfigs();
  }, []);

  // Update local state for a specific field
  const handleUpdateField = (
    configKey: string,
    fieldName: string,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [configKey]: {
        ...(prev[configKey] || {}),
        [fieldName]: value,
      },
    }));
  };

  // Save a specific config block to the database
  const handleSave = async (configKey: string) => {
    setSavingKey(configKey);
    try {
      const dataToSave = formData[configKey] || {};
      await updateConfig(configKey, dataToSave);
      notify.success("Settings saved successfully!");
    } catch (error) {
      notify.error("Failed to save settings.");
    } finally {
      setSavingKey(null);
    }
  };

  if (isPageLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-on-surface-variant dark:text-gray-400">
        <Loader2 className="animate-spin" size={32} />
        <p className="font-medium">Loading configurations...</p>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-primary/10 dark:bg-[#1a56db]/20 rounded-xl">
            <Settings className="text-primary dark:text-[#b5c4ff]" size={24} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface dark:text-white tracking-tight">
            Platform Configuration
          </h1>
        </div>
        <p className="text-on-surface-variant dark:text-gray-400 text-lg max-w-2xl ml-14">
          Manage system-wide settings, feature flags, and integrations. Changes
          made here apply instantly across the platform.
        </p>
      </header>

      {/* Configuration Blocks */}
      <div className="space-y-8">
        {CONFIG_SCHEMA.map((section) => {
          const Icon = section.icon;
          const currentSectionData = formData[section.key] || {};
          const isSaving = savingKey === section.key;

          return (
            <section
              key={section.key}
              className="bg-surface-container-lowest dark:bg-[#121c28] rounded-3xl border border-outline-variant/20 dark:border-white/5 shadow-sm overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 md:p-8 border-b border-outline-variant/10 dark:border-white/5 bg-surface-container-low/50 dark:bg-white/[0.02]">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="p-3 bg-surface dark:bg-[#1e2a3b] rounded-xl border border-outline-variant/20 dark:border-white/5 shrink-0">
                    <Icon
                      size={24}
                      className="text-primary dark:text-[#b5c4ff]"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-on-surface dark:text-white">
                      {section.name}
                    </h2>
                    <p className="text-sm text-on-surface-variant dark:text-gray-400 mt-1">
                      {section.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleSave(section.key)}
                  disabled={isSaving}
                  className="shrink-0 px-6 py-2.5 bg-primary dark:bg-[#1a56db] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all shadow-md"
                >
                  {isSaving ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  Save Changes
                </button>
              </div>

              {/* Dynamic Form Body */}
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {section.fields.map((field) => {
                  // Get value from state, fallback to schema default, then to empty type defaults
                  const val =
                    currentSectionData[field.name] ??
                    field.defaultValue ??
                    (field.type === "boolean"
                      ? false
                      : field.type === "stringArray"
                        ? []
                        : "");

                  return (
                    <div
                      key={field.name}
                      className={`${field.type === "boolean" || field.type === "stringArray" ? "col-span-1 md:col-span-2" : ""}`}
                    >
                      {/* Boolean Render (Toggles) */}
                      {field.type === "boolean" ? (
                        <label className="flex items-center justify-between p-4 bg-surface dark:bg-[#1e2a3b]/50 rounded-xl border border-outline-variant/20 dark:border-white/5 cursor-pointer hover:bg-surface-container-low dark:hover:bg-[#1e2a3b] transition-colors">
                          <div>
                            <span className="font-bold text-on-surface dark:text-white text-sm">
                              {field.label}
                            </span>
                            {field.hint && (
                              <p className="text-xs text-on-surface-variant dark:text-gray-400 mt-0.5">
                                {field.hint}
                              </p>
                            )}
                          </div>
                          <div
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${val ? "bg-primary dark:bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"}`}
                          >
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={val}
                              onChange={(e) =>
                                handleUpdateField(
                                  section.key,
                                  field.name,
                                  e.target.checked,
                                )
                              }
                            />
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${val ? "translate-x-6" : "translate-x-1"}`}
                            />
                          </div>
                        </label>
                      ) : field.type === "stringArray" ? (
                        /* String Array Render (Pill Badges) */
                        <StringArrayInput
                          label={field.label}
                          hint={field.hint}
                          placeholder={field.placeholder}
                          value={val}
                          onChange={(newArray) =>
                            handleUpdateField(section.key, field.name, newArray)
                          }
                        />
                      ) : (
                        /* Standard Input Render (String, Password, Number) */
                        <div>
                          <label className="block text-xs font-bold text-on-surface-variant dark:text-gray-400 uppercase tracking-wide mb-1.5">
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={val}
                            onChange={(e) => {
                              const newValue =
                                field.type === "number"
                                  ? Number(e.target.value)
                                  : e.target.value;
                              handleUpdateField(
                                section.key,
                                field.name,
                                newValue,
                              );
                            }}
                            className={inputClass}
                          />
                          {field.hint && (
                            <p className="text-xs text-on-surface-variant dark:text-gray-500 mt-1.5">
                              {field.hint}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
