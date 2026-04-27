"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  ImageIcon,
  Save,
  X,
  Tag,
  Users,
  Loader2,
  BookOpen,
  Calculator,
  Globe2,
  Terminal,
  MonitorPlay,
  FileText,
  CheckCircle,
  Smartphone,
  ShieldCheck,
  Plus,
  Trash2,
} from "lucide-react";
import { notify } from "@/lib/toast";
// Note: You will need to update your Prisma types and server actions to accept the new JSON fields
import { Course } from "@/prisma/generated/client";
import { getCourseById, updateCourse } from "@/lib/actions/courses";
import { getConfig, updateConfig } from "@/lib/actions/config";

// --- Constants & Icon Mapping ---
const STATUS_OPTIONS = ["draft", "upcoming", "active", "archived"];
const HOT_TAG_OPTIONS = ["", "Best Seller", "New", "Trending", "Limited"];

// Available icons for the user to select
const AVAILABLE_ICONS = {
  BookOpen,
  Calculator,
  Globe2,
  Terminal,
  MonitorPlay,
  FileText,
  CheckCircle,
  Smartphone,
  ShieldCheck,
} as const;

type IconName = keyof typeof AVAILABLE_ICONS;

// --- Reusable UI Components ---
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
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
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

// --- Main Page Component ---
export default function CourseEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const isNew = !id || id === "new";

  const [isLoading, setIsLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [courseCategories, setCourseCategories] = useState<any>([]);

  // Extended form state to include the new JSON fields
  const [form, setForm] = useState<any>({
    id: "",
    title: "",
    subtitle: "",
    slug: "",
    description: "",
    thumbnailUrl: "",
    tags: [],
    currency: "INR",
    fullPrice: 0,
    discountedPrice: 0,
    validTill: null,
    durationMonths: 1,
    category: "Other",
    status: "draft",
    hotTag: "",
    instructors: [],
    isPublished: false,

    // New Fields initialized as empty arrays
    learningOutcomes: [],
    curriculum: [],
    features: [],
  });

  useEffect(() => {
    async function load() {
      if (isNew) return;
      try {
        const courseCategories: any = await getConfig("course_categories");
        setCourseCategories(courseCategories?.value?.categories || []);
        const data = await getCourseById(id as string);
        if (data) {
          setForm({
            ...data,
            hotTag: data.hotTag || "",
            learningOutcomes: data.learningOutcomes
              ? (data.learningOutcomes as any)
              : [],
            curriculum: data.curriculum ? (data.curriculum as any) : [],
            features: data.features ? (data.features as any) : [],
          });
        }
      } catch (error) {
        notify.error("Failed to load course details.");
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
    if (!form.title.trim()) {
      notify.error("Title is required");
      return;
    }

    setSaving(true);
    try {
      await notify.promise(
        updateCourse(id as string, {
          title: form.title,
          subtitle: form.subtitle,
          description: form.description,
          slug: form.slug,
          thumbnailUrl: form.thumbnailUrl,
          tags: form.tags,
          currency: form.currency,
          fullPrice: form.fullPrice,
          discountedPrice: form.discountedPrice,
          validTill: form.validTill,
          durationMonths: form.durationMonths,
          category: form.category,
          status: form.status,
          hotTag: form.hotTag === "" ? null : form.hotTag,
          instructors: form.instructors,
          isPublished: form.isPublished,
          // Pass the new arrays directly (Prisma handles conversion to Json)
          learningOutcomes: form.learningOutcomes,
          curriculum: form.curriculum,
          features: form.features,
        }),
        {
          loading: "Saving course...",
          success: "Course saved successfully!",
          error: "Failed to save course.",
        },
      );
      router.push("/dashboard/courses");
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-on-surface-variant dark:text-gray-400">
        <Loader2 className="animate-spin" size={32} />
        <p className="font-medium">Loading course details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl hover:bg-surface-container transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-on-surface dark:text-white">
              {isNew ? "New Course" : form.title || "Edit Course"}
            </h1>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-all shadow-md"
        >
          {saving ? (
            <Loader2 size={17} className="animate-spin" />
          ) : (
            <Save size={17} />
          )}
          {saving ? "Saving…" : "Save Course"}
        </button>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Basic Information">
            <Field label="Title" required>
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Subtitle">
                <input
                  className={inputClass}
                  value={form.subtitle || ""}
                  onChange={(e) => set("subtitle", e.target.value)}
                />
              </Field>
              <Field label="Slug" required>
                <input
                  className={inputClass}
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value)}
                />
              </Field>
            </div>
            <Field label="Description">
              <textarea
                className={`${inputClass} min-h-[100px]`}
                value={form.description || ""}
                onChange={(e) => set("description", e.target.value)}
              />
            </Field>
          </SectionCard>

          {/* --- NEW: Learning Outcomes Builder --- */}
          <SectionCard title="Learning Outcomes">
            <p className="text-xs text-gray-500 mb-4">
              What will students master in this course?
            </p>
            <div className="space-y-4">
              {form.learningOutcomes.map((outcome: any, index: number) => {
                const SelectedIcon =
                  AVAILABLE_ICONS[outcome.icon as IconName] || BookOpen;
                return (
                  <div
                    key={index}
                    className="flex gap-3 p-4 border border-outline-variant/30 rounded-xl bg-surface dark:bg-[#374151]/50 relative group"
                  >
                    <div className="pt-2">
                      <SelectedIcon size={20} className="text-primary" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-3 gap-3">
                        <input
                          className={`${inputClass} col-span-2`}
                          placeholder="Outcome Title"
                          value={outcome.title}
                          onChange={(e) => {
                            const newArr = [...form.learningOutcomes];
                            newArr[index].title = e.target.value;
                            set("learningOutcomes", newArr);
                          }}
                        />
                        <select
                          className={inputClass}
                          value={outcome.icon}
                          onChange={(e) => {
                            const newArr = [...form.learningOutcomes];
                            newArr[index].icon = e.target.value;
                            set("learningOutcomes", newArr);
                          }}
                        >
                          {Object.keys(AVAILABLE_ICONS).map((icon) => (
                            <option key={icon} value={icon}>
                              {icon}
                            </option>
                          ))}
                        </select>
                      </div>
                      <input
                        className={inputClass}
                        placeholder="Short description..."
                        value={outcome.desc}
                        onChange={(e) => {
                          const newArr = [...form.learningOutcomes];
                          newArr[index].desc = e.target.value;
                          set("learningOutcomes", newArr);
                        }}
                      />
                    </div>
                    <button
                      onClick={() =>
                        set(
                          "learningOutcomes",
                          form.learningOutcomes.filter(
                            (_: any, i: number) => i !== index,
                          ),
                        )
                      }
                      className="absolute -right-2 -top-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    >
                      <X size={14} />
                    </button>
                  </div>
                );
              })}
              <button
                onClick={() =>
                  set("learningOutcomes", [
                    ...form.learningOutcomes,
                    { title: "", desc: "", icon: "BookOpen" },
                  ])
                }
                className="w-full py-3 border-2 border-dashed border-outline-variant/50 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Add Learning Outcome
              </button>
            </div>
          </SectionCard>

          {/* --- NEW: Curriculum Builder --- */}
          <SectionCard title="Curriculum Modules">
            <div className="space-y-4">
              {form.curriculum.map((mod: any, modIndex: number) => (
                <div
                  key={modIndex}
                  className="p-4 border border-outline-variant/30 dark:border-white/10 rounded-2xl bg-surface dark:bg-[#374151]/30 space-y-4"
                >
                  {/* Module Header */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-gray-400 dark:text-gray-500 font-bold w-6 text-right">
                      {(modIndex + 1).toString().padStart(2, "0")}
                    </span>
                    <input
                      className={`${inputClass} font-semibold`}
                      placeholder="Module Title (e.g. Foundations of Mathematics)"
                      value={mod.title}
                      onChange={(e) => {
                        const newArr = [...form.curriculum];
                        newArr[modIndex].title = e.target.value;
                        set("curriculum", newArr);
                      }}
                    />
                    <button
                      onClick={() =>
                        set(
                          "curriculum",
                          form.curriculum.filter(
                            (_: any, i: number) => i !== modIndex,
                          ),
                        )
                      }
                      className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete Module"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Nested Sub-parts (Lessons) */}
                  <div className="pl-12 space-y-2 border-l-2 border-outline-variant/20 dark:border-gray-700 ml-6">
                    {(mod.lessons || []).map(
                      (lesson: any, lessonIndex: number) => (
                        <div
                          key={lessonIndex}
                          className="flex items-center gap-2 relative"
                        >
                          {/* Visual connector line */}
                          <div className="absolute -left-2 w-2 h-[2px] bg-outline-variant/20 dark:bg-gray-700" />

                          <input
                            className={`${inputClass} py-1.5 text-xs`}
                            placeholder="Lesson / Sub-part title..."
                            value={lesson.title}
                            onChange={(e) => {
                              const newArr = [...form.curriculum];
                              newArr[modIndex].lessons[lessonIndex].title =
                                e.target.value;
                              set("curriculum", newArr);
                            }}
                          />
                          <button
                            onClick={() => {
                              const newArr = [...form.curriculum];
                              newArr[modIndex].lessons = newArr[
                                modIndex
                              ].lessons.filter(
                                (_: any, i: number) => i !== lessonIndex,
                              );
                              set("curriculum", newArr);
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ),
                    )}

                    <button
                      onClick={() => {
                        const newArr = [...form.curriculum];
                        // Ensure lessons array exists before pushing (handles legacy data)
                        if (!newArr[modIndex].lessons)
                          newArr[modIndex].lessons = [];
                        newArr[modIndex].lessons.push({ title: "" });
                        set("curriculum", newArr);
                      }}
                      className="text-xs font-semibold text-primary dark:text-[#b5c4ff] hover:opacity-80 flex items-center gap-1 mt-2 px-2 py-1"
                    >
                      <Plus size={12} /> Add Sub-part
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() =>
                  set("curriculum", [
                    ...form.curriculum,
                    { title: "", lessons: [] },
                  ])
                }
                className="w-full py-3 border-2 border-dashed border-outline-variant/50 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Add Module
              </button>
            </div>
          </SectionCard>
        </div>

        {/* Right Column (Sidebar Settings) */}
        <div className="space-y-6">
          <SectionCard title="Pricing & Duration">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Currency">
                <select
                  className={inputClass}
                  value={form.currency}
                  onChange={(e) => set("currency", e.target.value)}
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </Field>

              <Field label="Duration (months)">
                <input
                  type="number"
                  min={1}
                  className={inputClass}
                  value={form.durationMonths}
                  onChange={(e) =>
                    set("durationMonths", Number(e.target.value))
                  }
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <Field label="Full Price">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-on-surface-variant dark:text-gray-400">
                    {form.currency === "INR" ? "₹" : "$"}
                  </span>
                  <input
                    type="number"
                    min={0}
                    className={`${inputClass} pl-8`}
                    value={form.fullPrice}
                    onChange={(e) => set("fullPrice", Number(e.target.value))}
                  />
                </div>
              </Field>

              <Field label="Discounted Price">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-on-surface-variant dark:text-gray-400">
                    {form.currency === "INR" ? "₹" : "$"}
                  </span>
                  <input
                    type="number"
                    min={0}
                    className={`${inputClass} pl-8`}
                    value={form.discountedPrice}
                    onChange={(e) =>
                      set("discountedPrice", Number(e.target.value))
                    }
                  />
                </div>
              </Field>
            </div>

            <div className="mt-2">
              <Field
                label="Discount Valid Till"
                hint="Leave empty if the discount has no expiration."
              >
                <input
                  type="datetime-local"
                  className={inputClass}
                  // HTML datetime-local requires a specific string format (YYYY-MM-DDThh:mm)
                  value={
                    form.validTill
                      ? new Date(form.validTill).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    set(
                      "validTill",
                      e.target.value ? new Date(e.target.value) : null,
                    )
                  }
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard title="Classification">
            <Field label="Category">
              <select
                className={inputClass}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                <option value="" disabled>
                  Select category…
                </option>
                {courseCategories.map((c: any) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Status">
              <select
                className={inputClass}
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s} className="capitalize">
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Hot Tag">
              <select
                className={inputClass}
                value={form.hotTag || ""}
                onChange={(e) => set("hotTag", e.target.value)}
              >
                {HOT_TAG_OPTIONS.map((h) => (
                  <option key={h} value={h}>
                    {h === "" ? "None" : h}
                  </option>
                ))}
              </select>
            </Field>
          </SectionCard>

          {/* --- NEW: Course Features Builder --- */}
          <SectionCard title="Included Features">
            <div className="space-y-4">
              {form.features.map((feat: any, index: number) => {
                const SelectedIcon =
                  AVAILABLE_ICONS[feat.icon as IconName] || CheckCircle;

                return (
                  <div
                    key={index}
                    className="p-3.5 bg-surface-container-lowest dark:bg-gray-800/30 rounded-xl border border-outline-variant/20 dark:border-white/5 space-y-3"
                  >
                    {/* Top Row: Icon Selector and Delete Button */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-surface dark:bg-gray-800 rounded-lg shadow-sm border border-outline-variant/20 dark:border-gray-700 flex-shrink-0">
                        <SelectedIcon
                          size={18}
                          className="text-primary dark:text-[#b5c4ff]"
                        />
                      </div>

                      <select
                        className={`${inputClass} flex-1 !py-2`}
                        value={feat.icon}
                        onChange={(e) => {
                          const newArr = [...form.features];
                          newArr[index].icon = e.target.value;
                          set("features", newArr);
                        }}
                      >
                        {Object.keys(AVAILABLE_ICONS).map((icon) => (
                          <option key={icon} value={icon}>
                            {icon}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() =>
                          set(
                            "features",
                            form.features.filter(
                              (_: any, i: number) => i !== index,
                            ),
                          )
                        }
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                        title="Remove Feature"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Bottom Row: Full-width Text Input */}
                    <div>
                      <input
                        className={`${inputClass} w-full`}
                        placeholder="Feature description (e.g. 140+ HD Video Lessons)"
                        value={feat.text}
                        onChange={(e) => {
                          const newArr = [...form.features];
                          newArr[index].text = e.target.value;
                          set("features", newArr);
                        }}
                      />
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() =>
                  set("features", [
                    ...form.features,
                    { text: "", icon: "CheckCircle" },
                  ])
                }
                className="w-full py-3 mt-2 border-2 border-dashed border-outline-variant/50 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-500 hover:text-primary hover:bg-primary/5 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Add Feature
              </button>
            </div>
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
        </div>
      </div>
    </div>
  );
}
