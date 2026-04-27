"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  ImageIcon,
  Save,
  X,
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
import { getConfig } from "@/lib/actions/config";

const STATUS_OPTIONS = ["draft", "upcoming", "active", "archived"];

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

export default function TestSeriesEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const isNew = !id || id === "new";

  const [isLoading, setIsLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [testSeriesCategories, setTestSeriesCategories] = useState<string[]>(
    [],
  );

  const [form, setForm] = useState<any>({
    id: "",
    title: "",
    slug: "",
    category: "SSC CGL 2024-25 Preparation",
    description: "",
    thumbnailUrl: "",
    currency: "INR",
    fullPrice: 0,
    discountedPrice: 0,
    validityMonths: 12,
    validTill: null,
    status: "draft",
    isPublished: false,
    stats: [],
    analytics: [],
    phases: [],
    accessLink: "",
    reviews: [],
    features: [],
  });

  useEffect(() => {
    async function load() {
      if (isNew) return;
      try {
        const testSeriesCategories = await getConfig("test_series_categories");
        setTestSeriesCategories(testSeriesCategories?.value?.categories || []);
        const data = await getTestSeriesById(id as string);
        if (data) {
          setForm({
            ...data,
            stats: data.stats || [],
            analytics: data.analytics || [],
            phases: data.phases || [],
            reviews: data.reviews || [],
            features: data.features || [],
          });
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
    setForm((prev: any) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!form.title.trim() || !form.slug.trim()) {
      notify.error("Title and Slug are required");
      return;
    }
    setSaving(true);
    try {
      await notify.promise(updateTestSeries(id as string, { ...form }), {
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
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
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
            {isNew ? "New Test Series" : form.title}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Basic Info">
            <Field label="Title" required>
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
              />
            </Field>
            <Field label="Slug" required>
              <input
                className={inputClass}
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
              />
            </Field>
            <Field label="Description">
              <textarea
                className={`${inputClass} min-h-[100px]`}
                value={form.description || ""}
                onChange={(e) => set("description", e.target.value)}
              />
            </Field>
          </SectionCard>

          {/* Stats Grid Builder */}
          <SectionCard title="Key Stats Grid">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {form.stats.map((stat: any, index: number) => {
                const SelectedIcon =
                  AVAILABLE_ICONS[stat.icon as IconName] || FileText;
                return (
                  <div
                    key={index}
                    className="p-3 bg-surface-container-lowest dark:bg-gray-800/30 rounded-xl border border-outline-variant/30 space-y-2"
                  >
                    <div className="flex gap-2">
                      <select
                        className={`${inputClass} !py-1 w-24`}
                        value={stat.icon}
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
                        value={stat.value}
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
                            form.stats.filter(
                              (_: any, i: number) => i !== index,
                            ),
                          )
                        }
                        className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <input
                      className={`${inputClass} !py-1 text-xs`}
                      placeholder="Label (e.g. Total Tests)"
                      value={stat.label}
                      onChange={(e) => {
                        const arr = [...form.stats];
                        arr[index].label = e.target.value;
                        set("stats", arr);
                      }}
                    />
                    <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={stat.highlight}
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
              className="w-full py-2 border border-dashed rounded-xl text-sm font-semibold text-gray-500 flex justify-center items-center gap-1"
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
                        <SelectedIcon size={18} className="text-primary" />
                      </div>
                      <select
                        className={`${inputClass} w-32`}
                        value={item.icon}
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
                        className={`${inputClass} flex-1 font-bold`}
                        placeholder="Title (e.g. AI Error Detection)"
                        value={item.title}
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
                            form.analytics.filter(
                              (_: any, i: number) => i !== index,
                            ),
                          )
                        }
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <textarea
                      className={`${inputClass} text-xs min-h-[60px]`}
                      placeholder="Description..."
                      value={item.desc}
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
                className="w-full py-3 border-2 border-dashed rounded-xl text-sm font-semibold text-gray-500 flex justify-center items-center gap-2"
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
                        value={phase.title}
                        onChange={(e) => {
                          const arr = [...form.phases];
                          arr[index].title = e.target.value;
                          set("phases", arr);
                        }}
                      />
                      <input
                        className={`${inputClass} text-sm`}
                        placeholder="Short Description"
                        value={phase.desc}
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
                          form.phases.filter(
                            (_: any, i: number) => i !== index,
                          ),
                        )
                      }
                      className="p-2 h-10 text-red-400 hover:bg-red-50 rounded-lg"
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
                className="w-full py-2 border border-dashed rounded-xl text-sm font-semibold text-gray-500 flex justify-center items-center gap-1"
              >
                <Plus size={14} /> Add Phase
              </button>
            </div>
          </SectionCard>

          {/* Reviews Builder */}
          <SectionCard title="Student Reviews">
            <div className="space-y-3">
              {form.reviews.map((rev: any, index: number) => (
                <div
                  key={index}
                  className="p-3 bg-surface-container-lowest dark:bg-gray-800/30 rounded-xl border border-outline-variant/30 space-y-2 relative group"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className={`${inputClass} font-bold`}
                      placeholder="Student Name"
                      value={rev.name}
                      onChange={(e) => {
                        const arr = [...form.reviews];
                        arr[index].name = e.target.value;
                        set("reviews", arr);
                      }}
                    />
                    <input
                      className={`${inputClass} text-xs`}
                      placeholder="Role (e.g. Rank 412)"
                      value={rev.role}
                      onChange={(e) => {
                        const arr = [...form.reviews];
                        arr[index].role = e.target.value;
                        set("reviews", arr);
                      }}
                    />
                  </div>
                  <textarea
                    className={`${inputClass} text-xs min-h-[60px] italic`}
                    placeholder="Review comment..."
                    value={rev.comment}
                    onChange={(e) => {
                      const arr = [...form.reviews];
                      arr[index].comment = e.target.value;
                      set("reviews", arr);
                    }}
                  />
                  <button
                    onClick={() =>
                      set(
                        "reviews",
                        form.reviews.filter((_: any, i: number) => i !== index),
                      )
                    }
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  set("reviews", [
                    ...form.reviews,
                    { name: "", role: "", comment: "" },
                  ])
                }
                className="w-full py-2 border border-dashed rounded-xl text-sm font-semibold text-gray-500 flex justify-center items-center gap-1"
              >
                <Plus size={14} /> Add Review
              </button>
            </div>
          </SectionCard>
        </div>

        {/* Sidebar Settings Column */}
        <div className="space-y-6">
          <SectionCard title="Pricing & Validity">
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
              <Field label="Validity (months)">
                <input
                  type="number"
                  min={1}
                  className={inputClass}
                  value={form.validityMonths}
                  onChange={(e) =>
                    set("validityMonths", Number(e.target.value))
                  }
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <Field label="Full Price">
                <input
                  type="number"
                  min={0}
                  className={inputClass}
                  value={form.fullPrice}
                  onChange={(e) => set("fullPrice", Number(e.target.value))}
                />
              </Field>
              <Field label="Discount Price">
                <input
                  type="number"
                  min={0}
                  className={inputClass}
                  value={form.discountedPrice}
                  onChange={(e) =>
                    set("discountedPrice", Number(e.target.value))
                  }
                />
              </Field>
            </div>
            <div className="mt-2">
              <Field
                label="Discount Valid Till"
                hint="Leave empty if no expiration."
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
                      e.target.value ? new Date(e.target.value) : null,
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
          <SectionCard title="Access Link">
            <Field label="Access Link">
              <div className="relative">
                <LinkIcon
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  className={`${inputClass} pl-9`}
                  placeholder="https://…"
                  value={form.accessLink || ""}
                  onChange={(e) => set("accessLink", e.target.value)}
                />
              </div>
            </Field>
          </SectionCard>

          <SectionCard title="Classification">
            <Field label="Category">
              <select
                className={inputClass}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                {testSeriesCategories.map((c) => (
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
          </SectionCard>

          {/* Features Builder */}
          <SectionCard title="Included Features">
            <div className="space-y-3">
              {form.features.map((feat: any, index: number) => {
                const SelectedIcon =
                  AVAILABLE_ICONS[feat.icon as IconName] || CheckCircle;
                return (
                  <div
                    key={index}
                    className="p-3 bg-surface-container-lowest dark:bg-gray-800/30 rounded-xl border border-outline-variant/30 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-surface dark:bg-gray-700 rounded-lg">
                        <SelectedIcon size={18} className="text-primary" />
                      </div>
                      <select
                        className={`${inputClass} !py-2 flex-1`}
                        value={feat.icon}
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
                      <button
                        onClick={() =>
                          set(
                            "features",
                            form.features.filter(
                              (_: any, i: number) => i !== index,
                            ),
                          )
                        }
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <input
                      className={`${inputClass} w-full`}
                      placeholder="Feature text..."
                      value={feat.text}
                      onChange={(e) => {
                        const arr = [...form.features];
                        arr[index].text = e.target.value;
                        set("features", arr);
                      }}
                    />
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
                className="w-full py-2 border border-dashed rounded-xl text-sm font-semibold text-gray-500 flex justify-center items-center gap-1"
              >
                <Plus size={14} /> Add Feature
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Visibility">
            <button
              type="button"
              onClick={() => set("isPublished", !form.isPublished)}
              className={`w-full flex justify-between px-4 py-3 rounded-xl border ${form.isPublished ? "bg-green-900/20 text-green-400" : "bg-[#374151] text-gray-300"}`}
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
