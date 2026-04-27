"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Loader2,
  Trash2,
  Plus,
  Calculator,
  FileText,
  BookOpen,
  Map,
  ShieldCheck,
  Landmark,
  Briefcase,
  BadgeCheck,
} from "lucide-react";
import { getSyllabusById, updateSyllabus } from "@/lib/actions/syllabus";
import { notify } from "@/lib/toast";

const AVAILABLE_ICONS = {
  Calculator,
  FileText,
  BookOpen,
  Map,
  ShieldCheck,
  Landmark,
  Briefcase,
} as const;

type IconName = keyof typeof AVAILABLE_ICONS;

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/50 bg-surface dark:bg-[#374151] text-on-surface dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface-container-lowest dark:bg-[#1f2937] rounded-2xl border border-outline-variant/20 shadow-sm p-6">
      <h2 className="font-headline font-bold text-base text-on-surface dark:text-gray-100 mb-4">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className="block font-label text-xs font-semibold text-on-surface-variant dark:text-gray-400 uppercase tracking-wide mb-1.5">
        {label} {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && (
        <p className="mt-1 text-xs text-on-surface-variant dark:text-gray-500">
          {hint}
        </p>
      )}
    </div>
  );
}

export default function SyllabusEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const isNew = !id || id === "new";

  const [isLoading, setIsLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<any>({
    categoryId: "",
    categoryTitle: "",
    status: "draft",
    items: [],
    isPublished: false,
  });

  useEffect(() => {
    async function load() {
      if (isNew) return;
      try {
        const data = await getSyllabusById(id as string);
        if (data) {
          setForm({
            ...data,
            items: Array.isArray(data.items) ? data.items : [],
          });
        }
      } catch (error) {
        notify.error("Failed to load syllabus.");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [id, isNew]);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!form.categoryTitle.trim() || !form.categoryId.trim()) {
      notify.error("Category Title and ID are required.");
      return;
    }
    setSaving(true);
    try {
      await updateSyllabus(id as string, { ...form });
      notify.success("Saved successfully!");
      router.push("/dashboard/syllabus");
    } catch (err) {
      notify.error("Failed to save syllabus.");
    } finally {
      setSaving(false);
    }
  }

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl hover:bg-surface-container transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold dark:text-white">
            {isNew
              ? "New Syllabus Category"
              : form.categoryTitle || "Edit Syllabus"}
          </h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold flex items-center gap-2 hover:opacity-90"
        >
          {saving ? (
            <Loader2 size={17} className="animate-spin" />
          ) : (
            <Save size={17} />
          )}{" "}
          Save
        </button>
      </div>

      <div className="space-y-6">
        <SectionCard title="Category Info">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Category Title"
              required
              hint="e.g. SSC & Central Govt Exams"
            >
              <input
                className={inputClass}
                value={form.categoryTitle}
                onChange={(e) => set("categoryTitle", e.target.value)}
              />
            </Field>
            <Field
              label="Category ID"
              required
              hint="Used for anchor links (e.g. SSC-CGL)"
            >
              <input
                className={inputClass}
                value={form.categoryId}
                onChange={(e) => set("categoryId", e.target.value)}
              />
            </Field>
          </div>
          <Field label="Status">
            <select
              className={`${inputClass} w-full md:w-1/2`}
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </Field>
        </SectionCard>

        <SectionCard title="Visibility">
          <button
            type="button"
            onClick={() => set("isPublished", !form.isPublished)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
              form.isPublished
                ? "bg-primary-container border-primary/30 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                : "bg-surface-container-low dark:bg-[#374151] text-gray-500 dark:text-gray-300"
            }`}
          >
            <span className="font-label font-semibold text-sm">
              {form.isPublished ? "Published" : "Unpublished"}
            </span>
            <BadgeCheck
              size={18}
              className={form.isPublished ? "text-green-500" : "opacity-40"}
            />
          </button>
        </SectionCard>

        <SectionCard title="Attached PDFs / Syllabi">
          <div className="space-y-6">
            {form.items.map((item: any, index: number) => {
              const SelectedIcon =
                AVAILABLE_ICONS[item.icon as IconName] || FileText;
              return (
                <div
                  key={index}
                  className="p-4 bg-surface-container-lowest dark:bg-gray-800/30 rounded-2xl border border-outline-variant/30 space-y-4"
                >
                  {/* Top Row: Icon, Name, Delete */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-surface dark:bg-gray-700 rounded-lg shrink-0">
                      <SelectedIcon
                        size={20}
                        className="text-primary dark:text-[#b5c4ff]"
                      />
                    </div>
                    <select
                      className={`${inputClass} w-32 shrink-0 !py-2`}
                      value={item.icon}
                      onChange={(e) => {
                        const arr = [...form.items];
                        arr[index].icon = e.target.value;
                        set("items", arr);
                      }}
                    >
                      {Object.keys(AVAILABLE_ICONS).map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                    <input
                      className={`${inputClass} flex-1 font-bold !py-2`}
                      placeholder="Syllabus Name (e.g. SSC CHSL Syllabus)"
                      value={item.name}
                      onChange={(e) => {
                        const arr = [...form.items];
                        arr[index].name = e.target.value;
                        set("items", arr);
                      }}
                    />
                    <button
                      onClick={() =>
                        set(
                          "items",
                          form.items.filter((_: any, i: number) => i !== index),
                        )
                      }
                      className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Bottom Rows: Link and Description */}
                  <div className="space-y-3">
                    <Field label="PDF Download Link">
                      <input
                        type="url"
                        className={inputClass}
                        placeholder="https://..."
                        value={item.pdfLink}
                        onChange={(e) => {
                          const arr = [...form.items];
                          arr[index].pdfLink = e.target.value;
                          set("items", arr);
                        }}
                      />
                    </Field>
                    <Field label="Short Description">
                      <textarea
                        className={`${inputClass} min-h-[80px] text-xs`}
                        placeholder="Briefly describe what this PDF covers..."
                        value={item.description}
                        onChange={(e) => {
                          const arr = [...form.items];
                          arr[index].description = e.target.value;
                          set("items", arr);
                        }}
                      />
                    </Field>
                  </div>
                </div>
              );
            })}

            <button
              onClick={() =>
                set("items", [
                  ...form.items,
                  { name: "", description: "", icon: "FileText", pdfLink: "" },
                ])
              }
              className="w-full py-3 border-2 border-dashed border-outline-variant/50 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Syllabus PDF
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
