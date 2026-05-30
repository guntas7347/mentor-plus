"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Save,
  Trash2,
  ArrowUp,
  ArrowDown,
  FileText,
  Calculator,
  BookOpen,
  Map,
  ShieldCheck,
  Landmark,
  Briefcase,
  Loader2,
  BadgeCheck,
  FolderOpen,
  Settings,
} from "lucide-react";
import { notify } from "@/lib/toast";
import {
  getAllSyllabus,
  deleteSyllabusCategory,
  updateSyllabus,
} from "@/lib/actions/syllabus";
import { getMeta } from "@/lib/actions/meta";

const AVAILABLE_ICONS = {
  FileText,
  Calculator,
  BookOpen,
  Map,
  ShieldCheck,
  Landmark,
  Briefcase,
} as const;

type IconName = keyof typeof AVAILABLE_ICONS;

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-background text-text text-sm focus:outline-none focus:ring-2 focus:border-primary/50 focus:ring-primary/20 transition-all font-body";

export default function SyllabusDashboard() {
  const [syllabuses, setSyllabuses] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [form, setForm] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const [syllabusData, categoriesMeta] = await Promise.all([
        getAllSyllabus(),
        getMeta("categories"),
      ]);

      const fetchedCategories = (categoriesMeta?.value as string[]) || [];
      setCategories(fetchedCategories);
      setSyllabuses(syllabusData || []);

      if (syllabusData && syllabusData.length > 0 && !activeId) {
        selectCategory(syllabusData[0]);
      } else if (!syllabusData || syllabusData.length === 0) {
        // Pass fetchedCategories so we can set a default
        handleCreateNew(fetchedCategories);
      }
    } catch (error) {
      notify.error("Failed to load syllabus data.");
    } finally {
      setIsLoading(false);
    }
  }

  function selectCategory(categoryData: any) {
    setActiveId(categoryData.id);
    setForm({
      ...categoryData,
      items: Array.isArray(categoryData.items) ? categoryData.items : [],
    });
  }

  function handleCreateNew(availableCategories: string[] = categories) {
    setActiveId("new");
    setForm({
      id: "new",
      // Default to the first available category if exists
      category: availableCategories.length > 0 ? availableCategories[0] : "",
      isPublished: false,
      items: [],
    });
  }

  function moveItem(index: number, direction: "up" | "down") {
    if (!form) return;
    const newItems = [...form.items];

    if (direction === "up" && index > 0) {
      [newItems[index - 1], newItems[index]] = [
        newItems[index],
        newItems[index - 1],
      ];
    } else if (direction === "down" && index < newItems.length - 1) {
      [newItems[index + 1], newItems[index]] = [
        newItems[index],
        newItems[index + 1],
      ];
    }

    setForm({ ...form, items: newItems });
  }

  async function handleSave() {
    if (!form.category.trim()) {
      notify.error("Please select a valid category.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        category: form.category,
        isPublished: form.isPublished,
        items: form.items,
      };

      await notify.promise(
        updateSyllabus(form.id === "new" ? null : form.id, payload),
        {
          loading: "Saving category...",
          success: "Saved successfully!",
          error: "Failed to save.",
        },
      );

      await loadData();
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (form.id === "new") {
      setForm(null);
      setActiveId(null);
      return;
    }

    if (
      confirm(
        "Are you sure you want to delete this entire category and its syllabus items?",
      )
    ) {
      try {
        await notify.promise(deleteSyllabusCategory(form.id), {
          loading: "Deleting...",
          success: "Deleted successfully!",
          error: "Failed to delete.",
        });
        setActiveId(null);
        setForm(null);
        loadData();
      } catch (error) {
        console.error(error);
      }
    }
  }

  if (isLoading && !form) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-text-muted">
        <Loader2 className="animate-spin text-primary mb-4" size={40} />
        <p className="font-headline font-bold animate-pulse">
          Loading Syllabus Data...
        </p>
      </div>
    );
  }

  return (
    <div className="pb-12 flex flex-col lg:flex-row gap-8 items-start">
      {/* ==========================================
          LEFT SIDEBAR: CATEGORY LIST
      ========================================== */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-headline font-extrabold text-text">
              Syllabus
            </h2>
            <p className="text-sm font-body text-text-muted">
              Manage exam structures
            </p>
          </div>
          <button
            onClick={() => handleCreateNew()}
            className="p-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl transition-all shadow-md shadow-primary/20 hover:shadow-primary/40 flex items-center gap-2 text-sm font-bold"
          >
            <Plus size={18} /> <span className="hidden sm:inline">New</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {syllabuses.map((cat) => (
            <button
              key={cat.id}
              onClick={() => selectCategory(cat)}
              className={`text-left p-4 rounded-2xl border transition-all duration-300 group ${
                activeId === cat.id
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                  : "bg-surface border-gray-200 dark:border-white/5 hover:border-primary/30 text-text"
              }`}
            >
              <div className="font-headline font-bold text-lg truncate mb-2">
                {cat.category}
              </div>
              <div
                className={`text-xs font-body flex justify-between items-center ${activeId === cat.id ? "text-white/80" : "text-text-muted"}`}
              >
                <span className="flex items-center gap-1.5">
                  <FileText size={14} />
                  {Array.isArray(cat.items) ? cat.items.length : 0} Documents
                </span>
                {cat.isPublished ? (
                  <span
                    className={`font-bold flex items-center gap-1 ${activeId === cat.id ? "text-white" : "text-emerald-500"}`}
                  >
                    <BadgeCheck size={14} /> Published
                  </span>
                ) : (
                  <span
                    className={`font-bold ${activeId === cat.id ? "text-white/70" : "text-amber-500"}`}
                  >
                    Draft
                  </span>
                )}
              </div>
            </button>
          ))}

          {syllabuses.length === 0 && activeId !== "new" && (
            <div className="text-center py-12 px-6 border-2 border-dashed rounded-2xl border-gray-200 dark:border-white/10 text-text-muted">
              <FolderOpen size={40} className="mx-auto mb-3 opacity-20" />
              <p className="font-headline font-bold text-lg mb-1 text-text">
                No Syllabus Found
              </p>
              <p className="text-sm">
                Click the New button to create your first structure.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ==========================================
          RIGHT CONTENT AREA: EDITOR
      ========================================== */}
      <div className="w-full lg:w-2/3">
        {form ? (
          <div className="bg-surface border border-gray-200 dark:border-white/5 shadow-xl shadow-gray-200/20 dark:shadow-none rounded-[2rem] overflow-hidden flex flex-col transition-all duration-300">
            {/* --- Editor Header --- */}
            <div className="p-6 md:p-8 border-b border-gray-200 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-background">
              <div>
                <h2 className="text-2xl font-headline font-extrabold text-text">
                  {form.id === "new" ? "Create Structure" : "Edit Structure"}
                </h2>
                <p className="text-sm font-body text-text-muted mt-1">
                  Configure documents and visibility
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {form.id !== "new" && (
                  <button
                    onClick={handleDelete}
                    className="w-full sm:w-auto px-5 py-2.5 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-xl font-bold text-sm transition-colors"
                  >
                    Delete
                  </button>
                )}
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-dark disabled:opacity-70 transition-all shadow-md shadow-primary/20"
                >
                  {isSaving ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  Save Changes
                </button>
              </div>
            </div>

            {/* --- Editor Body --- */}
            <div className="p-6 md:p-8 space-y-10">
              {/* Top Settings Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category Select */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-headline font-bold text-text-muted ml-1 flex justify-between items-center">
                    <span>Parent Category</span>
                    {categories.length === 0 && (
                      <span className="text-xs text-amber-500 font-normal flex items-center gap-1">
                        <Settings size={12} /> Configure categories in settings
                      </span>
                    )}
                  </label>

                  {categories.length > 0 ? (
                    <div className="relative">
                      <select
                        className={`${inputClass} appearance-none cursor-pointer`}
                        value={form.category}
                        onChange={(e) =>
                          setForm({ ...form, category: e.target.value })
                        }
                      >
                        <option value="" disabled>
                          -- Select a Category --
                        </option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-muted">
                        <ArrowDown size={16} />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-sm font-medium">
                      No categories found. Please add categories in the System
                      Configuration first.
                    </div>
                  )}
                </div>

                {/* Visibility Toggle */}
                <div className="space-y-2">
                  <label className="text-sm font-headline font-bold text-text-muted ml-1">
                    Visibility Status
                  </label>
                  <button
                    onClick={() =>
                      setForm({ ...form, isPublished: !form.isPublished })
                    }
                    className={`w-full flex items-center justify-between px-5 py-3 rounded-xl border transition-all duration-300 ${
                      form.isPublished
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400"
                        : "bg-background border-gray-200 dark:border-white/10 text-text-muted hover:border-gray-300"
                    }`}
                  >
                    <span className="font-headline font-bold text-sm">
                      {form.isPublished ? "Published" : "Draft Mode"}
                    </span>
                    <BadgeCheck
                      size={20}
                      className={`transition-all ${form.isPublished ? "text-emerald-500 scale-110" : "opacity-30 grayscale"}`}
                    />
                  </button>
                </div>
              </div>

              <div className="h-px bg-gray-200 dark:bg-white/5 w-full"></div>

              {/* Items List Manager */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-headline font-bold text-text">
                      Documents & Resources
                    </h3>
                    <p className="text-sm font-body text-text-muted mt-1">
                      Add PDF links and descriptions below.
                    </p>
                  </div>
                  <span className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-full font-bold">
                    {form.items.length} Items
                  </span>
                </div>

                <div className="space-y-5">
                  {form.items.map((item: any, index: number) => {
                    const SelectedIcon =
                      AVAILABLE_ICONS[item.icon as IconName] || FileText;

                    return (
                      <div
                        key={index}
                        className="p-5 bg-background border border-gray-200 dark:border-white/5 rounded-2xl relative group transition-all hover:border-primary/30 hover:shadow-md"
                      >
                        {/* Reorder & Delete Controls */}
                        <div className="absolute right-4 top-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-surface p-1 rounded-lg border border-gray-200 dark:border-white/5">
                          <button
                            onClick={() => moveItem(index, "up")}
                            disabled={index === 0}
                            className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text rounded-md disabled:opacity-30 transition-colors"
                          >
                            <ArrowUp size={16} />
                          </button>
                          <button
                            onClick={() => moveItem(index, "down")}
                            disabled={index === form.items.length - 1}
                            className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text rounded-md disabled:opacity-30 transition-colors"
                          >
                            <ArrowDown size={16} />
                          </button>
                          <div className="w-[1px] h-4 bg-gray-200 dark:bg-white/10 mx-1"></div>
                          <button
                            onClick={() => {
                              const newItems = form.items.filter(
                                (_: any, i: number) => i !== index,
                              );
                              setForm({ ...form, items: newItems });
                            }}
                            className="p-1.5 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 rounded-md text-text-muted transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mr-0 md:mr-24 mt-8 md:mt-0">
                          {/* Left: Icon & Name */}
                          <div className="md:col-span-5 space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                                <SelectedIcon
                                  size={20}
                                  className="text-primary"
                                />
                              </div>
                              <div className="relative w-full">
                                <select
                                  className={`${inputClass} appearance-none pr-10`}
                                  value={item.icon || "FileText"}
                                  onChange={(e) => {
                                    const arr = [...form.items];
                                    arr[index].icon = e.target.value;
                                    setForm({ ...form, items: arr });
                                  }}
                                >
                                  {Object.keys(AVAILABLE_ICONS).map((icon) => (
                                    <option key={icon} value={icon}>
                                      {icon} Icon
                                    </option>
                                  ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-muted">
                                  <ArrowDown size={14} />
                                </div>
                              </div>
                            </div>
                            <input
                              className={inputClass}
                              placeholder="Subject Name (e.g. Complete Quant)"
                              value={item.name || ""}
                              onChange={(e) => {
                                const arr = [...form.items];
                                arr[index].name = e.target.value;
                                setForm({ ...form, items: arr });
                              }}
                            />
                          </div>

                          {/* Right: Description & Link */}
                          <div className="md:col-span-7 space-y-4">
                            <input
                              className={inputClass}
                              placeholder="PDF Link (https://...)"
                              value={item.pdfLink || ""}
                              onChange={(e) => {
                                const arr = [...form.items];
                                arr[index].pdfLink = e.target.value;
                                setForm({ ...form, items: arr });
                              }}
                            />
                            <textarea
                              className={`${inputClass} min-h-[80px] resize-y`}
                              placeholder="Short description of what this syllabus covers..."
                              value={item.description || ""}
                              onChange={(e) => {
                                const arr = [...form.items];
                                arr[index].description = e.target.value;
                                setForm({ ...form, items: arr });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {form.items.length === 0 && (
                    <div className="text-center py-12 px-6 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl bg-background">
                      <FileText
                        size={32}
                        className="mx-auto mb-3 text-text-muted opacity-50"
                      />
                      <p className="text-text font-headline font-bold mb-1">
                        No Documents Added
                      </p>
                      <p className="text-sm text-text-muted">
                        Click below to add your first syllabus document.
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() =>
                      setForm({
                        ...form,
                        items: [
                          ...form.items,
                          {
                            name: "",
                            description: "",
                            icon: "FileText",
                            pdfLink: "",
                          },
                        ],
                      })
                    }
                    className="w-full py-4 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl font-headline font-bold text-text-muted hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={20} /> Add Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-text-muted border-2 border-dashed border-gray-200 dark:border-white/5 rounded-[2rem] bg-surface/50">
            <BookOpen size={64} className="mb-6 opacity-20 text-primary" />
            <p className="text-2xl font-headline font-bold text-text mb-2">
              Select a structure
            </p>
            <p className="text-base text-text-muted max-w-sm text-center">
              Choose an existing structure from the sidebar or create a new one
              to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
