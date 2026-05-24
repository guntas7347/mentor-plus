"use client";

import { useEffect, useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  FileText,
  Folder,
  Calendar,
  CreditCard,
  Clock,
  Loader2,
  PlayCircle,
} from "lucide-react";
import { getFullGoogleDriveTree } from "@/lib/actions/gdrive";
import { useRouter } from "next/navigation";
import { encrypt } from "@/lib/encrypt";

export type DriveNode = {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  isFolder: boolean;
  children?: DriveNode[];
};

// --- Mock Central Data Fetcher ---
const getCourseDetails = async () => {
  return {
    title: "Punjab Police Constable Test Series",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    purchased: "23 May 2026",
    amountPaid: "₹480",
    expiresOn: "Lifetime Access",
  };
};

// --- Recursive Tree Node Component ---
const TreeNode = ({ node, level = 0 }: { node: DriveNode; level?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleFile = async (id: string, name: string) => {
    const encryptedId = await encrypt(id);
    router.push(`/dashboard/tree/play/${encryptedId}`);
  };

  const hasChildren =
    node.isFolder && node.children && node.children.length > 0;

  return (
    <div className="w-full">
      <div
        className={`group flex items-center justify-between rounded-lg py-3 pr-4 transition-colors ${
          node.isFolder
            ? "cursor-pointer hover:bg-surface/50"
            : "hover:bg-surface/30"
        }`}
        style={{ paddingLeft: `${level * 1.5 + 1}rem` }}
        onClick={() => node.isFolder && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {/* Collapse/Expand Icon */}
          {node.isFolder ? (
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-surface text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          ) : (
            <div className="flex h-7 w-7 items-center justify-center text-text-muted">
              <FileText className="h-4 w-4" />
            </div>
          )}

          {/* Name and Icon */}
          <div className="flex items-center gap-2.5">
            {node.isFolder && <Folder className="h-4 w-4 text-secondary" />}
            <span
              className={`text-sm md:text-base ${
                node.isFolder
                  ? "font-semibold text-text"
                  : "font-medium text-text"
              }`}
            >
              {node.name}
            </span>
          </div>
        </div>

        {/* Action Button for Files */}
        {!node.isFolder && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleFile(node.id, node.name);
            }}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:shadow md:px-4 md:py-2 md:text-sm"
          >
            <PlayCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Access</span>
          </button>
        )}
      </div>

      {/* Render Children Recursively */}
      {hasChildren && isOpen && (
        <div className="mt-1 w-full animate-in fade-in slide-in-from-top-1 duration-200">
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

// --- Main Page Component ---
export default function TestSeriesDirectoryPage({
  rootFolderId,
}: {
  rootFolderId: string;
}) {
  const [treeData, setTreeData] = useState<DriveNode[]>([]);
  const [courseDetails, setCourseDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const details = await getCourseDetails();
        setCourseDetails(details);

        const treeResponse = await getFullGoogleDriveTree(rootFolderId);

        // Logic to skip the root folder and directly show children
        let childrenData: DriveNode[] = [];
        if (Array.isArray(treeResponse)) {
          // If the API returns an array containing the root
          childrenData = treeResponse[0]?.children || [];
        } else if (treeResponse && typeof treeResponse === "object") {
          // If the API returns the root object directly
          childrenData = treeResponse.children || [];
        }

        setTreeData(childrenData);
      } catch (error) {
        console.error("Failed to fetch curriculum data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || !courseDetails) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-background text-text">
        <Loader2 className="h-10 w-10 animate-spin text-secondary" />
        <p className="text-sm font-medium text-text-muted">
          Loading your test series...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-5xl bg-background p-4 text-text font-body md:p-8">
      {/* --- Course Header Card --- */}
      <div className="mb-8 overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-black/5 dark:ring-white/5">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative h-56 w-full md:h-auto md:w-1/3 lg:w-2/5">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
            <img
              src={courseDetails.image}
              alt={courseDetails.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
            <h1 className="mb-6 font-headline text-2xl font-bold tracking-tight text-text md:text-3xl lg:text-4xl">
              {courseDetails.title}
            </h1>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="flex items-start gap-3 text-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-black/5 dark:ring-white/5">
                  <Calendar className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex flex-col pt-0.5">
                  <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                    Purchased
                  </span>
                  <span className="font-semibold text-text">
                    {courseDetails.purchased}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-black/5 dark:ring-white/5">
                  <CreditCard className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex flex-col pt-0.5">
                  <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                    Amount Paid
                  </span>
                  <span className="font-semibold text-text">
                    {courseDetails.amountPaid}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-black/5 dark:ring-white/5">
                  <Clock className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex flex-col pt-0.5">
                  <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                    Expires On
                  </span>
                  <span className="font-semibold text-text">
                    {courseDetails.expiresOn}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Curriculum Tree Section --- */}
      <div className="rounded-2xl bg-surface shadow-sm ring-1 ring-black/5 dark:ring-white/5">
        <div className="border-b border-black/5 px-6 py-5 dark:border-white/5">
          <h2 className="font-headline text-xl font-bold text-text">
            Course Curriculum
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Select a module below to access your mock tests and study material.
          </p>
        </div>

        <div className="flex flex-col p-2">
          {treeData.length > 0 ? (
            treeData.map((node) => <TreeNode key={node.id} node={node} />)
          ) : (
            <div className="py-16 text-center text-text-muted">
              <Folder className="mx-auto mb-4 h-12 w-12 opacity-20" />
              <p className="font-medium">No test series content found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
