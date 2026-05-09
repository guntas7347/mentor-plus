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
import { Course } from "@/prisma/generated/client";
import { getCourseById, updateCourse } from "@/lib/actions/courses";
import SectionCard from "@/components/SectionCard";
import { Field } from "@/components/Field";
import {
  COURSE_CATEGORIES,
  HOT_TAG_OPTIONS,
  MEDIUMS,
  STATUS_OPTIONS,
} from "@/lib/configs";
import CloudinaryUploader from "@/components/CloudinaryUploader";

// --- Constants & Icon Mapping ---

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
  "w-full px-3.5 py-2.5 rounded-xl border border-gray-200/50 bg-surface dark:bg-[#374151] text-text dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

// --- Main Page Component ---
export default function CourseEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const isNew = !id || id === "new";

  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Prices and Duration are kept as strings in state to easily apply regex filtering
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    slug: "",
    description: "",
    thumbnailUrl: "",
    tags: [] as string[],
    fullPrice: "",
    discountedPrice: "",
    validTill: null as string | null,
    durationMonths: "1",
    category: "Other",
    brochureUrl: "",
    status: "draft",
    hotTag: "",
    instructors: [] as string[],
    medium: "",
    isPublished: false,
    learningOutcomes: [] as any[],
    curriculum: [] as any[],
    features: [] as any[],
  });

  useEffect(() => {
    async function load() {
      try {
        if (!isNew) {
          const data = await getCourseById(id as string);
          if (data) {
            setForm({
              title: data.title || "",
              subtitle: data.subtitle || "",
              slug: data.slug || "",
              description: data.description || "",
              thumbnailUrl: data.thumbnailUrl || "",
              tags: data.tags || [],
              // Convert stored integer (Paisa) back to Rupees for UI editing
              fullPrice: data.fullPrice
                ? Math.floor(data.fullPrice).toString()
                : "",
              discountedPrice: data.discountedPrice
                ? Math.floor(data.discountedPrice).toString()
                : "",
              validTill: data.validTill
                ? new Date(data.validTill).toISOString()
                : null,
              durationMonths: data.durationMonths
                ? data.durationMonths.toString()
                : "1",
              category: data.category || "Other",
              status: data.status || "draft",
              hotTag: data.hotTag || "",
              instructors: data.instructors || [],
              isPublished: Boolean(data.isPublished),
              learningOutcomes: data.learningOutcomes
                ? (data.learningOutcomes as any[])
                : [],
              medium: data.medium || "",
              brochureUrl: data.brochureUrl || "",
              curriculum: data.curriculum ? (data.curriculum as any[]) : [],
              features: data.features ? (data.features as any[]) : [],
            });
          }
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
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!form.title.trim()) {
      notify.error("Title is required");
      return;
    }
    if (!form.slug.trim()) {
      notify.error("Slug is required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title,
        subtitle: form.subtitle || null,
        description: form.description || null,
        slug: form.slug,
        thumbnailUrl: form.thumbnailUrl || null,
        tags: form.tags,
        fullPrice: Number(form.fullPrice),
        discountedPrice: Number(form.discountedPrice),
        validTill: form.validTill ? new Date(form.validTill) : null,
        durationMonths: Number(form.durationMonths),
        category: form.category,
        status: form.status,
        hotTag: form.hotTag === "" ? null : form.hotTag,
        instructors: form.instructors,
        isPublished: form.isPublished,
        brochureUrl: form.brochureUrl,
        learningOutcomes: form.learningOutcomes,
        curriculum: form.curriculum,
        medium: form.medium,
        features: form.features,
      };

      await notify.promise(updateCourse(id as string, payload), {
        loading: "Saving course...",
        success: "Course saved successfully!",
        error: "Failed to save course.",
      });
      router.push("/dashboard/courses");
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-text-muted dark:text-gray-400">
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
            className="p-2 rounded-xl hover:bg-surface transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-text dark:text-white">
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
                onChange={(e) => {
                  set("title", e.target.value);
                  set(
                    "slug",
                    e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, ""),
                  );
                }}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Subtitle">
                <input
                  className={inputClass}
                  value={form.subtitle}
                  onChange={(e) => set("subtitle", e.target.value)}
                />
              </Field>
              <Field label="Slug (unique)" required>
                <input
                  className={inputClass}
                  value={form.slug}
                  onChange={(e) =>
                    set(
                      "slug",
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-+|-+$/g, ""),
                    )
                  }
                />
              </Field>
            </div>{" "}
            <Field label="Summary">
              <textarea
                className={`${inputClass} min-h-[100px]`}
                value={form.summary}
                onChange={(e) => set("summary", e.target.value)}
              />
            </Field>
            <Field label="Description">
              <textarea
                className={`${inputClass} min-h-[100px]`}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </Field>
          </SectionCard>

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
                    className="flex gap-3 p-4 border border-gray-200 rounded-xl bg-surface dark:bg-[#374151]/50 relative group"
                  >
                    <div className="pt-2">
                      <SelectedIcon size={20} className="text-primary" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-3 gap-3">
                        <input
                          className={`${inputClass} col-span-2`}
                          placeholder="Outcome Title"
                          value={outcome.title || ""}
                          onChange={(e) => {
                            const newArr = [...form.learningOutcomes];
                            newArr[index] = {
                              ...newArr[index],
                              title: e.target.value,
                            };
                            set("learningOutcomes", newArr);
                          }}
                        />
                        <select
                          className={inputClass}
                          value={outcome.icon || "BookOpen"}
                          onChange={(e) => {
                            const newArr = [...form.learningOutcomes];
                            newArr[index] = {
                              ...newArr[index],
                              icon: e.target.value,
                            };
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
                        value={outcome.desc || ""}
                        onChange={(e) => {
                          const newArr = [...form.learningOutcomes];
                          newArr[index] = {
                            ...newArr[index],
                            desc: e.target.value,
                          };
                          set("learningOutcomes", newArr);
                        }}
                      />
                    </div>
                    <button
                      onClick={() =>
                        set(
                          "learningOutcomes",
                          form.learningOutcomes.filter((_, i) => i !== index),
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
                className="w-full py-3 border-2 border-dashed border-gray-200/50 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Add Learning Outcome
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Curriculum Modules">
            <div className="space-y-4">
              {form.curriculum.map((mod: any, modIndex: number) => (
                <div
                  key={modIndex}
                  className="p-4 border border-gray-200 dark:border-white/10 rounded-2xl bg-surface dark:bg-[#374151]/30 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-gray-400 dark:text-gray-500 font-bold w-6 text-right">
                      {(modIndex + 1).toString().padStart(2, "0")}
                    </span>
                    <input
                      className={`${inputClass} font-semibold`}
                      placeholder="Module Title (e.g. Foundations of Mathematics)"
                      value={mod.title || ""}
                      onChange={(e) => {
                        const newArr = [...form.curriculum];
                        newArr[modIndex] = {
                          ...newArr[modIndex],
                          title: e.target.value,
                        };
                        set("curriculum", newArr);
                      }}
                    />
                    <button
                      onClick={() =>
                        set(
                          "curriculum",
                          form.curriculum.filter((_, i) => i !== modIndex),
                        )
                      }
                      className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete Module"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="pl-12 space-y-2 border-l-2 border-gray-200/20 dark:border-gray-700 ml-6">
                    {(mod.lessons || []).map(
                      (lesson: any, lessonIndex: number) => (
                        <div
                          key={lessonIndex}
                          className="flex items-center gap-2 relative"
                        >
                          <div className="absolute -left-2 w-2 h-[2px] bg-outline-variant/20 dark:bg-gray-700" />
                          <input
                            className={`${inputClass} py-1.5 text-xs`}
                            placeholder="Lesson / Sub-part title..."
                            value={lesson.title || ""}
                            onChange={(e) => {
                              const newArr = [...form.curriculum];
                              const updatedLessons = [
                                ...newArr[modIndex].lessons,
                              ];
                              updatedLessons[lessonIndex] = {
                                ...updatedLessons[lessonIndex],
                                title: e.target.value,
                              };
                              newArr[modIndex].lessons = updatedLessons;
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
                className="w-full py-3 border-2 border-dashed border-gray-200/50 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Add Module
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Included Features">
            <div className="space-y-3">
              {form.features.map((feat: any, index: number) => {
                const SelectedIcon =
                  AVAILABLE_ICONS[feat.icon as IconName] || CheckCircle;
                return (
                  <div
                    key={index}
                    // Changed to a single flex row
                    className="p-2 bg-background dark:bg-gray-800/30 rounded-xl border border-gray-200 flex items-center gap-2"
                  >
                    {/* Icon Preview */}
                    <div className="p-2 bg-surface dark:bg-gray-700 rounded-lg flex-shrink-0">
                      <SelectedIcon
                        size={18}
                        className="text-primary dark:text-[#b5c4ff]"
                      />
                    </div>

                    {/* Icon Selector */}
                    <select
                      // Made compact to fit nicely inline
                      className={`${inputClass} !py-2 !w-28 !px-2 flex-shrink-0 truncate`}
                      value={feat.icon || "CheckCircle"}
                      onChange={(e) => {
                        const arr = [...form.features];
                        arr[index].icon = e.target.value;
                        set("features", arr);
                      }}
                    >
                      {Object.keys(AVAILABLE_ICONS).map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>

                    {/* Feature Text Input */}
                    <input
                      // flex-1 allows this input to fill the remaining horizontal space
                      className={`${inputClass} !py-2 flex-1`}
                      placeholder="Feature text..."
                      value={feat.text || ""}
                      onChange={(e) => {
                        const arr = [...form.features];
                        arr[index].text = e.target.value;
                        set("features", arr);
                      }}
                    />

                    {/* Delete Button */}
                    <button
                      onClick={() =>
                        set(
                          "features",
                          form.features.filter((_, i) => i !== index),
                        )
                      }
                      className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
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
                className="w-full py-2 border-2 border-dashed border-gray-200/50 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex justify-center items-center gap-1"
              >
                <Plus size={14} /> Add Feature
              </button>
            </div>
          </SectionCard>
        </div>

        {/* Right Column (Sidebar Settings) */}
        <div className="space-y-6">
          <SectionCard title="Pricing & Duration">
            <Field label="Duration (months)">
              <input
                type="text"
                className={inputClass}
                placeholder="1"
                value={form.durationMonths}
                onChange={(e) =>
                  set("durationMonths", e.target.value.replace(/\D/g, ""))
                }
              />
            </Field>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Field label="Full Price">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-text-muted dark:text-gray-400">
                    ₹
                  </span>
                  <input
                    type="text"
                    className={`${inputClass} pl-8`}
                    placeholder="0"
                    value={form.fullPrice}
                    onChange={(e) =>
                      set("fullPrice", e.target.value.replace(/\D/g, ""))
                    }
                  />
                </div>
              </Field>

              <Field label="Discounted Price">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-text-muted dark:text-gray-400">
                    ₹
                  </span>
                  <input
                    type="text"
                    className={`${inputClass} pl-8`}
                    placeholder="0"
                    value={form.discountedPrice}
                    onChange={(e) =>
                      set("discountedPrice", e.target.value.replace(/\D/g, ""))
                    }
                  />
                </div>
              </Field>
            </div>

            <div className="mt-4">
              <Field
                label="Discount Valid Till"
                hint="Leave empty if the discount has no expiration."
              >
                <input
                  type="datetime-local"
                  className={inputClass}
                  value={
                    form.validTill
                      ? new Date(form.validTill).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    set(
                      "validTill",
                      e.target.value
                        ? new Date(e.target.value).toISOString()
                        : null,
                    )
                  }
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard title="Thumbnail">
            <Field label="Thumbnail">
              <CloudinaryUploader
                defaultImage={form.thumbnailUrl}
                onUpload={(value) => set("thumbnailUrl", value)}
              />
              <div className="relative">
                <ImageIcon
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  className={`${inputClass} pl-9`}
                  placeholder="https://…"
                  value={form.thumbnailUrl || ""}
                  onChange={(e) => set("thumbnailUrl", e.target.value)}
                />
              </div>
              {form.thumbnailUrl && (
                <img
                  src={form.thumbnailUrl}
                  alt="Preview"
                  className="mt-3 h-32 w-full object-cover rounded-xl"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).style.display = "none")
                  }
                />
              )}
            </Field>
          </SectionCard>

          <SectionCard title="Broucher">
            <Field label="Broucher URL">
              <input
                className={inputClass}
                value={form.brochureUrl}
                onChange={(e) => set("brochureUrl", e.target.value)}
              />
            </Field>
          </SectionCard>

          <SectionCard title="Instructors">
            <div className="space-y-3">
              {form.instructors.map((instructor: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="p-2 bg-surface dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200/20 dark:border-gray-700 flex-shrink-0">
                    <Users
                      size={18}
                      className="text-primary dark:text-[#b5c4ff]"
                    />
                  </div>
                  <input
                    className={`${inputClass} flex-1`}
                    placeholder="Instructor Name"
                    value={instructor}
                    onChange={(e) => {
                      const newArr = [...form.instructors];
                      newArr[index] = e.target.value;
                      set("instructors", newArr);
                    }}
                  />
                  <button
                    onClick={() =>
                      set(
                        "instructors",
                        form.instructors.filter((_, i) => i !== index),
                      )
                    }
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                    title="Remove Instructor"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => set("instructors", [...form.instructors, ""])}
                className="w-full py-3 mt-2 border-2 border-dashed border-gray-200/50 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-500 hover:text-primary hover:bg-primary/5 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Add Instructor
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Classification">
            <Field label="Category">
              <select
                className={inputClass}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                {COURSE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Medium">
              <select
                className={inputClass}
                value={form.medium}
                onChange={(e) => set("medium", e.target.value)}
              >
                {MEDIUMS.map((c) => (
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
                value={form.hotTag}
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

          <SectionCard title="Visibility">
            <button
              type="button"
              onClick={() => set("isPublished", !form.isPublished)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                form.isPublished
                  ? "bg-primary-dark border-primary/30 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                  : "bg-surface dark:bg-[#374151] text-gray-500 dark:text-gray-300"
              }`}
            >
              <span className="font-body font-semibold text-sm">
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
