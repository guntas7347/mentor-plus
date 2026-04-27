"use client";

import Link from "next/link";
import { FileStack, Plus, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createSyllabus,
  deleteSyllabus,
  getAllSyllabus,
} from "@/lib/actions/syllabus";

type SyllabusStatus = "active" | "draft" | "archived";

interface SyllabusCategory {
  id: string;
  categoryTitle: string;
  categoryId: string;
  createdAt: string;
  status: SyllabusStatus;
  items?: any[];
}

const statusStyles: Record<SyllabusStatus, string> = {
  active:
    "bg-primary-container text-on-primary-container dark:bg-primary/20 dark:text-primary",
  draft:
    "bg-secondary-container text-on-secondary-container dark:bg-secondary/20 dark:text-secondary-fixed",
  archived:
    "bg-surface-variant text-on-surface-variant dark:bg-outline/20 dark:text-outline",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function SyllabusListPage() {
  const router = useRouter();
  const [syllabusList, setSyllabusList] = useState<SyllabusCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const data: any = await getAllSyllabus();
        setSyllabusList(data as SyllabusCategory[]);
      } finally {
        setLoading(false);
      }
    };
    fetchSyllabus();
  }, []);

  const handleDelete = async (id: string) => {
    if (
      !window.confirm("Are you sure you want to delete this syllabus category?")
    )
      return;
    await deleteSyllabus(id);
    setSyllabusList((prev) => prev.filter((s) => s.id !== id));
  };

  const handleCreate = async () => {
    const newDoc = await createSyllabus();
    router.push(`/dashboard/syllabus/${newDoc.id}`);
  };

  if (loading)
    return (
      <div className="p-6 text-sm text-on-surface-variant">
        Loading syllabus data...
      </div>
    );

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-headline font-bold text-on-surface dark:text-inverse-primary mb-1">
            Syllabus Manager
          </h1>
          <p className="font-body text-sm text-on-surface-variant dark:text-outline">
            Manage exam categories and their downloadable PDF resources.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label font-semibold text-sm hover:opacity-90 active:scale-95 transition-all duration-150 shadow-md"
        >
          <Plus size={18} />
          Create Category
        </button>
      </div>

      <div className="bg-surface-container-lowest dark:bg-[#1f2937] rounded-2xl ambient-shadow border border-outline-variant/20 overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-outline-variant/15 dark:border-white/5">
          <FileStack
            size={18}
            className="text-primary dark:text-inverse-primary"
          />
          <span className="font-label text-sm font-semibold text-on-surface dark:text-inverse-on-surface">
            {syllabusList.length} Categories Total
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-outline-variant/15 dark:border-white/5 bg-surface-container-low dark:bg-[#182030]">
                <th className="text-left px-6 py-3 font-label font-semibold text-on-surface-variant dark:text-outline text-xs uppercase tracking-wide">
                  Category Title
                </th>
                <th className="text-left px-6 py-3 font-label font-semibold text-on-surface-variant dark:text-outline text-xs uppercase tracking-wide">
                  Category ID (Anchor)
                </th>
                <th className="text-center px-6 py-3 font-label font-semibold text-on-surface-variant dark:text-outline text-xs uppercase tracking-wide">
                  PDFs Attached
                </th>
                <th className="text-left px-6 py-3 font-label font-semibold text-on-surface-variant dark:text-outline text-xs uppercase tracking-wide">
                  Status
                </th>
                <th className="text-right px-6 py-3 font-label font-semibold text-on-surface-variant dark:text-outline text-xs uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 dark:divide-white/5">
              {syllabusList.map((syllabus) => (
                <tr
                  key={syllabus.id}
                  className="hover:bg-surface-container-low dark:hover:bg-[#182030] transition-colors duration-150 group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-container dark:bg-primary/20 flex items-center justify-center shrink-0">
                        <FileStack
                          size={15}
                          className="text-primary dark:text-inverse-primary"
                        />
                      </div>
                      <span className="font-semibold text-on-surface dark:text-inverse-on-surface">
                        {syllabus.categoryTitle || "Untitled Category"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant dark:text-outline font-mono text-xs">
                    #{syllabus.categoryId}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-on-surface dark:text-white">
                    {syllabus.items?.length || 0}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[syllabus.status]}`}
                    >
                      {syllabus.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/dashboard/syllabus/${syllabus.id}`}
                        className="p-2 rounded-lg hover:bg-surface-container dark:hover:bg-outline/20 text-on-surface-variant dark:text-outline hover:text-secondary dark:hover:text-secondary-fixed transition-colors"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(syllabus.id)}
                        className="p-2 rounded-lg hover:bg-error-container/40 text-on-surface-variant dark:text-outline hover:text-error transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {syllabusList.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-on-surface-variant"
                  >
                    No syllabus categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
