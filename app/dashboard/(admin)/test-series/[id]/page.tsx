"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  ImageIcon,
  Save,
  Loader2,
  Trash2,
  Plus,
  FileText,
  Layers,
  History,
  Radio,
  BrainCircuit,
  Timer,
  BarChart3,
  Calendar,
  MonitorSmartphone,
  Languages,
  ShieldCheck,
  Clock,
  CheckCircle,
  Star,
  LinkIcon,
} from "lucide-react";
import { notify } from "@/lib/toast";
import { getTestSeriesById, updateTestSeries } from "@/lib/actions/test-series";
import { Field } from "@/components/Field";
import {
  HOT_TAG_OPTIONS,
  MEDIUMS,
  STATUS_OPTIONS,
  TEST_SERIES_CATEGORIES,
} from "@/lib/configs";
import SectionCard from "@/components/SectionCard";
import PdfUploader from "@/components/PdfUploader";

const AVAILABLE_ICONS = {
  FileText,
  Layers,
  History,
  Radio,
  BrainCircuit,
  Timer,
  BarChart3,
  Calendar,
  MonitorSmartphone,
  Languages,
  ShieldCheck,
  Clock,
  CheckCircle,
  Star,
} as const;

type IconName = keyof typeof AVAILABLE_ICONS;

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/50 bg-surface dark:bg-[#374151] text-on-surface dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

export default function TestSeriesEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const isNew = !id || id === "new";

  const [isLoading, setIsLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  // Prices and Months are kept as strings in state to easily apply regex filtering
  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "SSC CGL 2024-25 Preparation",
    medium: "English",
    summary: "",
    description: "",
    thumbnailUrl: "",
    fullPrice: "",
    discountedPrice: "",
    validityMonths: "12",
    validTill: null as string | null,
    status: "draft",
    hotTag: "",
    isPublished: false,
    accessLink: "",
    sampleLink: "",
    stats: [] as any[],
    analytics: [] as any[],
    phases: [] as any[],
    reviews: [] as any[],
    features: [] as any[],
  });

  useEffect(() => {
    async function load() {
      try {
        if (!isNew) {
          const data = await getTestSeriesById(id as string);
          if (data) {
            setForm({
              title: data.title || "",
              slug: data.slug || "",
              category: data.category || "SSC CGL 2024-25 Preparation",
              medium: data.medium || "English",
              summary: data.summary || "",
              description: data.description || "",
              thumbnailUrl: data.thumbnailUrl || "",
              fullPrice: data.fullPrice ? data.fullPrice.toString() : "",
              discountedPrice: data.discountedPrice
                ? data.discountedPrice.toString()
                : "",
              validityMonths: data.validityMonths
                ? data.validityMonths.toString()
                : "12",
              validTill: data.validTill
                ? new Date(data.validTill).toISOString()
                : null,
              status: data.status || "draft",
              hotTag: data.hotTag || "",
              isPublished: Boolean(data.isPublished),
              accessLink: data.accessLink || "",
              sampleLink: data.sampleLink || "",
              stats: data.stats ? (data.stats as any[]) : [],
              analytics: data.analytics ? (data.analytics as any[]) : [],
              phases: data.phases ? (data.phases as any[]) : [],
              reviews: data.reviews ? (data.reviews as any[]) : [],
              features: data.features ? (data.features as any[]) : [],
            });
          }
        }
      } catch (error) {
        notify.error("Failed to load test series.");
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
    if (!form.title.trim() || !form.slug.trim()) {
      notify.error("Title and Slug are required");
      return;
    }

    setSaving(true);
    try {
      // Construct strict payload for the DB
      const payload = {
        title: form.title,
        slug: form.slug,
        category: form.category,
        medium: form.medium,
        summary: form.summary || null,
        description: form.description || null,
        thumbnailUrl: form.thumbnailUrl || null,
        fullPrice: parseInt(form.fullPrice || "0", 10),
        discountedPrice: parseInt(form.discountedPrice || "0", 10),
        validityMonths: parseInt(form.validityMonths || "1", 10),
        validTill: form.validTill ? new Date(form.validTill) : null,
        status: form.status,
        hotTag: form.hotTag === "" ? null : form.hotTag,
        isPublished: form.isPublished,
        accessLink: form.accessLink || null,
        sampleLink: form.sampleLink || null,
        stats: form.stats,
        analytics: form.analytics,
        phases: form.phases,
        reviews: form.reviews,
        features: form.features,
      };

      await notify.promise(updateTestSeries(id as string, payload), {
        loading: "Saving...",
        success: "Saved successfully!",
        error: "Failed to save.",
      });
      router.push("/dashboard/test-series");
    } finally {
      setSaving(false);
    }
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <Loader2 className="animate-spin text-primary" size={32} />
          <p className="font-medium">Loading test series...</p>
        </div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl hover:bg-surface-container transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold dark:text-white">
            {isNew ? "New Test Series" : form.title || "Edit Test Series"}
          </h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold flex items-center gap-2 hover:opacity-90 disabled:opacity-50 shadow-md"
        >
          {saving ? (
            <Loader2 size={17} className="animate-spin" />
          ) : (
            <Save size={17} />
          )}{" "}
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Basic Info">
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
            <Field label="Slug" required>
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

          {/* Stats Grid Builder */}
          <SectionCard title="Key Stats Grid">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {form.stats.map((stat: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="p-3 bg-surface-container-lowest dark:bg-gray-800/30 rounded-xl border border-outline-variant/30 space-y-2"
                  >
                    <div className="flex gap-2">
                      <select
                        // Added !w-24, !px-2, flex-shrink-0, and truncate for proper sizing
                        className={`${inputClass} !py-1 !w-24 !px-2 flex-shrink-0 truncate`}
                        value={stat.icon || "FileText"}
                        onChange={(e) => {
                          const arr = [...form.stats];
                          arr[index].icon = e.target.value;
                          set("stats", arr);
                        }}
                      >
                        {Object.keys(AVAILABLE_ICONS).map((icon) => (
                          <option key={icon} value={icon}>
                            {icon}
                          </option>
                        ))}
                      </select>
                      <input
                        className={`${inputClass} !py-1 flex-1 font-bold`}
                        placeholder="Value (e.g. 150+)"
                        value={stat.value || ""}
                        onChange={(e) => {
                          const arr = [...form.stats];
                          arr[index].value = e.target.value;
                          set("stats", arr);
                        }}
                      />
                      <button
                        onClick={() =>
                          set(
                            "stats",
                            form.stats.filter((_, i) => i !== index),
                          )
                        }
                        className="p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <input
                      className={`${inputClass} !py-1 text-xs`}
                      placeholder="Label (e.g. Total Tests)"
                      value={stat.label || ""}
                      onChange={(e) => {
                        const arr = [...form.stats];
                        arr[index].label = e.target.value;
                        set("stats", arr);
                      }}
                    />
                    <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={stat.highlight || false}
                        onChange={(e) => {
                          const arr = [...form.stats];
                          arr[index].highlight = e.target.checked;
                          set("stats", arr);
                        }}
                      />{" "}
                      Highlight this card
                    </label>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() =>
                set("stats", [
                  ...form.stats,
                  { icon: "FileText", value: "", label: "", highlight: false },
                ])
              }
              className="w-full py-2 border-2 border-dashed border-outline-variant/50 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex justify-center items-center gap-1"
            >
              <Plus size={14} /> Add Stat
            </button>
          </SectionCard>

          {/* Analytics Builder */}
          <SectionCard title="Analytics Features">
            <div className="space-y-4">
              {form.analytics.map((item: any, index: number) => {
                const SelectedIcon =
                  AVAILABLE_ICONS[item.icon as IconName] || BrainCircuit;
                return (
                  <div
                    key={index}
                    className="p-3 bg-surface-container-lowest dark:bg-gray-800/30 rounded-xl border border-outline-variant/30 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-surface dark:bg-gray-700 rounded-lg">
                        <SelectedIcon
                          size={18}
                          className="text-primary dark:text-[#b5c4ff]"
                        />
                      </div>
                      <select
                        // Added !w-24 and !px-2 to force a smaller width and override the w-full in inputClass
                        className={`${inputClass} !w-24 !px-2 flex-shrink-0 truncate`}
                        value={item.icon || "BrainCircuit"}
                        onChange={(e) => {
                          const arr = [...form.analytics];
                          arr[index].icon = e.target.value;
                          set("analytics", arr);
                        }}
                      >
                        {Object.keys(AVAILABLE_ICONS).map((icon) => (
                          <option key={icon} value={icon}>
                            {icon}
                          </option>
                        ))}
                      </select>
                      <input
                        // Fixed the missing space: flex-1 font-bold
                        className={`${inputClass} flex-1 font-bold`}
                        placeholder="Title (e.g. AI Error Detection)"
                        value={item.title || ""}
                        onChange={(e) => {
                          const arr = [...form.analytics];
                          arr[index].title = e.target.value;
                          set("analytics", arr);
                        }}
                      />
                      <button
                        onClick={() =>
                          set(
                            "analytics",
                            form.analytics.filter((_, i) => i !== index),
                          )
                        }
                        className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <textarea
                      className={`${inputClass} text-xs min-h-[60px]`}
                      placeholder="Description..."
                      value={item.desc || ""}
                      onChange={(e) => {
                        const arr = [...form.analytics];
                        arr[index].desc = e.target.value;
                        set("analytics", arr);
                      }}
                    />
                  </div>
                );
              })}
              <button
                onClick={() =>
                  set("analytics", [
                    ...form.analytics,
                    { icon: "BrainCircuit", title: "", desc: "" },
                  ])
                }
                className="w-full py-3 border-2 border-dashed border-outline-variant/50 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex justify-center items-center gap-2"
              >
                <Plus size={16} /> Add Analytics Feature
              </button>
            </div>
          </SectionCard>

          {/* Phases Builder */}
          <SectionCard title="Test Schedule & Phases">
            <div className="space-y-3">
              {form.phases.map((phase: any, index: number) => (
                <div
                  key={index}
                  className="p-3 bg-surface-container-lowest dark:bg-gray-800/30 rounded-xl border border-outline-variant/30 space-y-2"
                >
                  <div className="flex gap-3">
                    <span className="font-mono font-bold text-gray-400 w-6 pt-2">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <div className="flex-1 space-y-2">
                      <input
                        className={`${inputClass} font-bold`}
                        placeholder="Phase Title (e.g. Phase I: Foundation)"
                        value={phase.title || ""}
                        onChange={(e) => {
                          const arr = [...form.phases];
                          arr[index].title = e.target.value;
                          set("phases", arr);
                        }}
                      />
                      <input
                        className={`${inputClass} text-sm`}
                        placeholder="Short Description"
                        value={phase.desc || ""}
                        onChange={(e) => {
                          const arr = [...form.phases];
                          arr[index].desc = e.target.value;
                          set("phases", arr);
                        }}
                      />
                    </div>
                    <button
                      onClick={() =>
                        set(
                          "phases",
                          form.phases.filter((_, i) => i !== index),
                        )
                      }
                      className="p-2 h-10 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() =>
                  set("phases", [...form.phases, { title: "", desc: "" }])
                }
                className="w-full py-2 border-2 border-dashed border-outline-variant/50 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex justify-center items-center gap-1"
              >
                <Plus size={14} /> Add Phase
              </button>
            </div>
          </SectionCard>

          {/* Included Features */}
          <SectionCard title="Included Features">
            <div className="space-y-3">
              {form.features.map((feat: any, index: number) => {
                const SelectedIcon =
                  AVAILABLE_ICONS[feat.icon as IconName] || CheckCircle;
                return (
                  <div
                    key={index}
                    // Changed to a single flex row
                    className="p-2 bg-surface-container-lowest dark:bg-gray-800/30 rounded-xl border border-outline-variant/30 flex items-center gap-2"
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
                className="w-full py-2 border-2 border-dashed border-outline-variant/50 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex justify-center items-center gap-1"
              >
                <Plus size={14} /> Add Feature
              </button>
            </div>
          </SectionCard>
        </div>

        {/* Sidebar Settings Column */}
        <div className="space-y-6">
          <SectionCard title="Pricing & Duration">
            <Field label="Duration (months)">
              <input
                type="text"
                className={inputClass}
                placeholder="12"
                value={form.validityMonths}
                onChange={(e) =>
                  set("validityMonths", e.target.value.replace(/\D/g, ""))
                }
              />
            </Field>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Field label="Full Price">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-on-surface-variant dark:text-gray-400">
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
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-on-surface-variant dark:text-gray-400">
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
            <Field label="Thumbnail URL">
              <div className="relative">
                <ImageIcon
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  className={`${inputClass} pl-9`}
                  placeholder="https://…"
                  value={form.thumbnailUrl}
                  onChange={(e) => set("thumbnailUrl", e.target.value)}
                />
              </div>
              {form.thumbnailUrl && (
                <img
                  src={form.thumbnailUrl}
                  alt="Preview"
                  className="mt-3 h-32 w-full object-cover rounded-xl border border-outline-variant/30"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).style.display = "none")
                  }
                />
              )}
            </Field>
          </SectionCard>

          <SectionCard title="Access Links & PDF">
            <PdfUploader
              onUploadSuccess={(id) => {
                set("accessLink", id);
              }}
            />
            <Field label="Access Link">
              <div className="relative">
                <LinkIcon
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  className={`${inputClass} pl-9`}
                  placeholder="https://…"
                  value={form.accessLink}
                  onChange={(e) => set("accessLink", e.target.value)}
                />
              </div>
            </Field>
            <div className="mt-4">
              <Field label="Sample Link">
                <div className="relative">
                  <LinkIcon
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    className={`${inputClass} pl-9`}
                    placeholder="https://…"
                    value={form.sampleLink}
                    onChange={(e) => set("sampleLink", e.target.value)}
                  />
                </div>
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
                {TEST_SERIES_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <div className="mt-4">
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
            </div>

            <div className="mt-4">
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
            </div>

            <div className="mt-4">
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
            </div>
          </SectionCard>

          <SectionCard title="Visibility">
            <button
              type="button"
              onClick={() => set("isPublished", !form.isPublished)}
              className={`w-full flex justify-between px-4 py-3 rounded-xl border transition-all ${
                form.isPublished
                  ? "bg-primary-container border-primary/30 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                  : "bg-surface-container-low dark:bg-[#374151] text-gray-500 dark:text-gray-300"
              }`}
            >
              <span className="font-semibold text-sm">
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
