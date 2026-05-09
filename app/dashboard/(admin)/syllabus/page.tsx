// "use client";

// import Link from "next/link";
// import { FileStack, Plus, Pencil, Trash2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   createSyllabus,
//   deleteSyllabus,
//   getAllSyllabus,
// } from "@/lib/actions/syllabus";

// type SyllabusStatus = "active" | "draft" | "archived";

// interface SyllabusCategory {
//   id: string;
//   categoryTitle: string;
//   categoryId: string;
//   createdAt: string;
//   status: SyllabusStatus;
//   items?: any[];
// }

// const statusStyles: Record<SyllabusStatus, string> = {
//   active:
//     "bg-primary-dark text-primary-dark dark:bg-primary/20 dark:text-primary",
//   draft:
//     "bg-secondary-dark text-secondary-dark dark:bg-secondary/20 dark:text-secondary-fixed",
//   archived:
//     "bg-surface text-text-muted dark:bg-outline/20 dark:text-text-muted",
// };

// function formatDate(dateStr: string) {
//   return new Date(dateStr).toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// export default function SyllabusListPage() {
//   const router = useRouter();
//   const [syllabusList, setSyllabusList] = useState<SyllabusCategory[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSyllabus = async () => {
//       try {
//         const data: any = await getAllSyllabus();
//         setSyllabusList(data as SyllabusCategory[]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSyllabus();
//   }, []);

//   const handleDelete = async (id: string) => {
//     if (
//       !window.confirm("Are you sure you want to delete this syllabus category?")
//     )
//       return;
//     await deleteSyllabus(id);
//     setSyllabusList((prev) => prev.filter((s) => s.id !== id));
//   };

//   const handleCreate = async () => {
//     const newDoc = await createSyllabus();
//     router.push(`/dashboard/syllabus/${newDoc.id}`);
//   };

//   if (loading)
//     return (
//       <div className="p-6 text-sm text-text-muted">
//         Loading syllabus data...
//       </div>
//     );

//   return (
//     <>
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-headline font-bold text-text dark:text-inverse-primary mb-1">
//             Syllabus Manager
//           </h1>
//           <p className="font-body text-sm text-text-muted dark:text-text-muted">
//             Manage exam categories and their downloadable PDF resources.
//           </p>
//         </div>

//         <button
//           onClick={handleCreate}
//           className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-body font-semibold text-sm hover:opacity-90 active:scale-95 transition-all duration-150 shadow-md"
//         >
//           <Plus size={18} />
//           Create Category
//         </button>
//       </div>

//       <div className="bg-background dark:bg-[#1f2937] rounded-2xl ambient-shadow border border-gray-200/20 overflow-hidden">
//         <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200/15 dark:border-white/5">
//           <FileStack
//             size={18}
//             className="text-primary dark:text-inverse-primary"
//           />
//           <span className="font-body text-sm font-semibold text-text dark:text-gray-100">
//             {syllabusList.length} Categories Total
//           </span>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-sm font-body">
//             <thead>
//               <tr className="border-b border-gray-200/15 dark:border-white/5 bg-surface dark:bg-[#182030]">
//                 <th className="text-left px-6 py-3 font-body font-semibold text-text-muted dark:text-text-muted text-xs uppercase tracking-wide">
//                   Category Title
//                 </th>
//                 <th className="text-left px-6 py-3 font-body font-semibold text-text-muted dark:text-text-muted text-xs uppercase tracking-wide">
//                   Category ID (Anchor)
//                 </th>
//                 <th className="text-center px-6 py-3 font-body font-semibold text-text-muted dark:text-text-muted text-xs uppercase tracking-wide">
//                   PDFs Attached
//                 </th>
//                 <th className="text-left px-6 py-3 font-body font-semibold text-text-muted dark:text-text-muted text-xs uppercase tracking-wide">
//                   Status
//                 </th>
//                 <th className="text-right px-6 py-3 font-body font-semibold text-text-muted dark:text-text-muted text-xs uppercase tracking-wide">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-outline-variant/10 dark:divide-white/5">
//               {syllabusList.map((syllabus) => (
//                 <tr
//                   key={syllabus.id}
//                   className="hover:bg-surface dark:hover:bg-[#182030] transition-colors duration-150 group"
//                 >
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-lg bg-primary-dark dark:bg-primary/20 flex items-center justify-center shrink-0">
//                         <FileStack
//                           size={15}
//                           className="text-primary dark:text-inverse-primary"
//                         />
//                       </div>
//                       <span className="font-semibold text-text dark:text-gray-100">
//                         {syllabus.categoryTitle || "Untitled Category"}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-text-muted dark:text-text-muted font-mono text-xs">
//                     #{syllabus.categoryId}
//                   </td>
//                   <td className="px-6 py-4 text-center font-bold text-text dark:text-white">
//                     {syllabus.items?.length || 0}
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[syllabus.status]}`}
//                     >
//                       {syllabus.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center justify-end gap-1">
//                       <Link
//                         href={`/dashboard/syllabus/${syllabus.id}`}
//                         className="p-2 rounded-lg hover:bg-surface dark:hover:bg-outline/20 text-text-muted dark:text-text-muted hover:text-secondary dark:hover:text-secondary-fixed transition-colors"
//                       >
//                         <Pencil size={16} />
//                       </Link>
//                       <button
//                         onClick={() => handleDelete(syllabus.id)}
//                         className="p-2 rounded-lg hover:bg-red-100/40 text-text-muted dark:text-text-muted hover:text-error transition-colors"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//               {syllabusList.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan={5}
//                     className="px-6 py-8 text-center text-text-muted"
//                   >
//                     No syllabus categories found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

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
} from "lucide-react";
import { notify } from "@/lib/toast";
// Note: Update these imports to match your actual server actions location
import {
  getAllSyllabus,
  deleteSyllabusCategory,
  updateSyllabus,
} from "@/lib/actions/syllabus";

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
  "w-full px-3.5 py-2.5 rounded-xl border border-gray-200/50 bg-surface dark:bg-[#374151] text-text dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

export default function SyllabusDashboard() {
  const [syllabuses, setSyllabuses] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [form, setForm] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load all categories on mount
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      // Assuming this returns an array of Syllabus objects
      const data = await getAllSyllabus();
      setSyllabuses(data || []);

      // If we have data and no active selection, select the first one
      if (data && data.length > 0 && !activeId) {
        selectCategory(data[0]);
      } else if (!data || data.length === 0) {
        handleCreateNew();
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

  function handleCreateNew() {
    setActiveId("new");
    setForm({
      id: "new",
      category: "New Exam Category",
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
      notify.error("Category name is required.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        category: form.category,
        isPublished: form.isPublished,
        items: form.items,
      };

      // If id is "new", your server action should create it, otherwise update.
      await notify.promise(
        updateSyllabus(form.id === "new" ? null : form.id, payload),
        {
          loading: "Saving category...",
          success: "Saved successfully!",
          error: "Failed to save.",
        },
      );

      // Reload the list to get fresh DB IDs
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-12 flex flex-col lg:flex-row gap-8 items-start">
      {/* Left Sidebar: List of Categories */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-text dark:text-white">
            Categories
          </h2>
          <button
            onClick={handleCreateNew}
            className="p-2 bg-primary/10 text-primary hover:bg-primary hover:text-white dark:bg-[#1a56db]/20 dark:text-[#b5c4ff] dark:hover:bg-[#1a56db] dark:hover:text-white rounded-lg transition-colors flex items-center gap-1 text-sm font-bold"
          >
            <Plus size={16} /> New
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {syllabuses.map((cat) => (
            <button
              key={cat.id}
              onClick={() => selectCategory(cat)}
              className={`text-left px-4 py-3 rounded-xl border transition-all ${
                activeId === cat.id
                  ? "bg-primary text-white border-primary shadow-md"
                  : "bg-background dark:bg-[#121c28] border-gray-200 dark:border-white/5 hover:border-primary/50 text-text dark:text-gray-300"
              }`}
            >
              <div className="font-bold truncate">{cat.category}</div>
              <div className="text-xs opacity-70 mt-1 flex justify-between items-center">
                <span>
                  {Array.isArray(cat.items) ? cat.items.length : 0} items
                </span>
                {cat.isPublished ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <BadgeCheck size={12} /> Published
                  </span>
                ) : (
                  <span className="text-amber-400 font-semibold">Draft</span>
                )}
              </div>
            </button>
          ))}
          {syllabuses.length === 0 && activeId !== "new" && (
            <div className="text-center py-8 text-sm text-gray-500 border-2 border-dashed rounded-xl border-gray-300 dark:border-gray-700">
              No categories found.
            </div>
          )}
        </div>
      </div>

      {/* Right Content Area: Editor */}
      <div className="w-full lg:w-2/3">
        {form ? (
          <div className="bg-background dark:bg-[#1f2937] border border-gray-200/20 shadow-sm rounded-3xl overflow-hidden flex flex-col">
            {/* Editor Header */}
            <div className="p-6 border-b border-gray-200/20 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface dark:bg-gray-800/50">
              <h2 className="text-2xl font-bold dark:text-white">
                {form.id === "new" ? "Create Category" : "Edit Category"}
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-semibold text-sm transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2 bg-primary text-white rounded-xl font-semibold text-sm flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity shadow-md"
                >
                  {isSaving ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  Save Changes
                </button>
              </div>
            </div>

            {/* Editor Body */}
            <div className="p-6 space-y-8">
              {/* Category Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400">
                    Category Name
                  </label>
                  <input
                    className={inputClass}
                    value={form.category}
                    placeholder="e.g. SSC & Central Govt"
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400">
                    Visibility
                  </label>
                  <button
                    onClick={() =>
                      setForm({ ...form, isPublished: !form.isPublished })
                    }
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all ${
                      form.isPublished
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400"
                        : "bg-gray-50 border-gray-200 text-gray-600 dark:bg-[#374151] dark:border-gray-600 dark:text-gray-300"
                    }`}
                  >
                    <span className="font-semibold text-sm">
                      {form.isPublished ? "Published" : "Draft"}
                    </span>
                    <BadgeCheck
                      size={18}
                      className={
                        form.isPublished ? "text-emerald-500" : "opacity-40"
                      }
                    />
                  </button>
                </div>
              </div>

              {/* Items List Manager */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold dark:text-white">
                    Syllabus Documents
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full font-medium">
                    {form.items.length} Items
                  </span>
                </div>

                <div className="space-y-4">
                  {form.items.map((item: any, index: number) => {
                    const SelectedIcon =
                      AVAILABLE_ICONS[item.icon as IconName] || FileText;

                    return (
                      <div
                        key={index}
                        className="p-4 bg-surface dark:bg-[#374151]/30 border border-gray-200 dark:border-gray-700 rounded-2xl relative group"
                      >
                        {/* Reorder & Delete Controls */}
                        <div className="absolute right-3 top-3 flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity bg-surface dark:bg-gray-800 p-1 rounded-lg shadow-sm border border-gray-200/20 dark:border-gray-600">
                          <button
                            onClick={() => moveItem(index, "up")}
                            disabled={index === 0}
                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-30"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            onClick={() => moveItem(index, "down")}
                            disabled={index === form.items.length - 1}
                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-30"
                          >
                            <ArrowDown size={14} />
                          </button>
                          <div className="w-[1px] h-4 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                          <button
                            onClick={() => {
                              const newItems = form.items.filter(
                                (_: any, i: number) => i !== index,
                              );
                              setForm({ ...form, items: newItems });
                            }}
                            className="p-1.5 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/30 rounded text-gray-500"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mr-24">
                          {/* Left: Icon & Name */}
                          <div className="md:col-span-5 space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0">
                                <SelectedIcon
                                  size={18}
                                  className="text-primary dark:text-[#b5c4ff]"
                                />
                              </div>
                              <select
                                className={`${inputClass} !py-2`}
                                value={item.icon || "FileText"}
                                onChange={(e) => {
                                  const arr = [...form.items];
                                  arr[index].icon = e.target.value;
                                  setForm({ ...form, items: arr });
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
                          <div className="md:col-span-7 space-y-3">
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
                              className={`${inputClass} min-h-[60px] text-xs leading-relaxed`}
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
                    <div className="text-center py-10 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl text-gray-500 dark:text-gray-400">
                      No syllabus documents added to this category yet.
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
                    className="w-full py-4 border-2 border-dashed border-gray-200/50 dark:border-gray-600 rounded-xl font-bold text-gray-500 hover:text-primary hover:bg-primary/5 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={18} /> Add Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl">
            <BookOpen size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">Select a category to edit</p>
            <p className="text-sm opacity-70">
              or create a new one from the sidebar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
