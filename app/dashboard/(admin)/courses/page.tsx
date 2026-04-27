"use client";
import Link from "next/link";
import { BookOpen, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
} from "@/lib/actions/courses";
import { useRouter } from "next/navigation";

type CourseStatus = "active" | "draft" | "archived";

interface Course {
  id: string;
  title: string;
  createdAt: string;
  status: CourseStatus;
  enrollments: number;
}

const statusStyles: Record<CourseStatus, string> = {
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

export default function CoursesPage() {
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data: any = await getAllCourses();
        setCourses(data);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDeleteCourse = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?",
    );
    if (!confirmDelete) return;

    await deleteCourse(id);

    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  if (loading) {
    return <div className="p-6 text-sm">Loading...</div>;
  }

  const handleCreateCourse = async () => {
    const course = await createCourse();
    router.push(`/dashboard/courses/${course.id}`);
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-headline font-bold text-on-surface dark:text-inverse-primary mb-1">
            Courses
          </h1>
          <p className="font-body text-sm text-on-surface-variant dark:text-outline">
            Manage all your coaching courses in one place.
          </p>
        </div>

        <button
          onClick={handleCreateCourse}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label font-semibold text-sm hover:opacity-90 active:scale-95 transition-all duration-150 shadow-md"
        >
          <Plus size={18} />
          Create New Course
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-surface-container-lowest dark:bg-[#1f2937] rounded-2xl ambient-shadow border border-outline-variant/20 overflow-hidden">
        {/* Summary bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-outline-variant/15 dark:border-white/5">
          <BookOpen
            size={18}
            className="text-primary dark:text-inverse-primary"
          />
          <span className="font-label text-sm font-semibold text-on-surface dark:text-inverse-on-surface">
            {courses.length} courses total
          </span>
        </div>

        {/* Scrollable table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-outline-variant/15 dark:border-white/5 bg-surface-container-low dark:bg-[#182030]">
                <th className="text-left px-6 py-3 font-label font-semibold text-on-surface-variant dark:text-outline text-xs uppercase tracking-wide">
                  Course Name
                </th>
                <th className="text-left px-6 py-3 font-label font-semibold text-on-surface-variant dark:text-outline text-xs uppercase tracking-wide">
                  Date Created
                </th>
                <th className="text-left px-6 py-3 font-label font-semibold text-on-surface-variant dark:text-outline text-xs uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-6 py-3 font-label font-semibold text-on-surface-variant dark:text-outline text-xs uppercase tracking-wide">
                  Enrollments
                </th>
                <th className="text-right px-6 py-3 font-label font-semibold text-on-surface-variant dark:text-outline text-xs uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 dark:divide-white/5">
              {courses.map((course) => (
                <tr
                  key={course.id}
                  className="hover:bg-surface-container-low dark:hover:bg-[#182030] transition-colors duration-150 group"
                >
                  {/* Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-container dark:bg-primary/20 flex items-center justify-center shrink-0">
                        <BookOpen
                          size={15}
                          className="text-primary dark:text-inverse-primary"
                        />
                      </div>
                      <span className="font-semibold text-on-surface dark:text-inverse-on-surface group-hover:text-primary dark:group-hover:text-inverse-primary transition-colors">
                        {course.title}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-on-surface-variant dark:text-outline">
                    {formatDate(course.createdAt)}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[course.status]}`}
                    >
                      {course.status}
                    </span>
                  </td>

                  {/* Enrollments */}
                  <td className="px-6 py-4">
                    <span className="font-semibold text-on-surface dark:text-inverse-on-surface">
                      {course.enrollments}
                    </span>
                    <span className="ml-1 text-xs text-on-surface-variant dark:text-outline">
                      students
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/dashboard/courses/${course.id}`}
                        className="p-2 rounded-lg hover:bg-surface-container dark:hover:bg-outline/20 text-on-surface-variant dark:text-outline hover:text-secondary dark:hover:text-secondary-fixed transition-colors"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="p-2 rounded-lg hover:bg-error-container/40 text-on-surface-variant dark:text-outline hover:text-error transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-outline-variant/15 dark:border-white/5 bg-surface-container-low dark:bg-[#182030]">
          <p className="text-xs text-on-surface-variant dark:text-outline font-body">
            Showing {courses.length} of {courses.length} courses
          </p>
        </div>
      </div>
    </>
  );
}
