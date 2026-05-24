"use client";

import { useEffect, useState } from "react";
import {
  Trash2,
  Copy,
  Plus,
  X,
  Check,
  FileText,
  Link as LinkIcon,
  Upload,
} from "lucide-react";
import { uploadPdfToGoogleDrive } from "@/lib/actions/gdrive";
import { addPdf, getAllPdfs } from "@/lib/actions/pdf";

type Pdf = {
  id: string;
  name: string;
  src: string; // Updated from 'url' to 'src'
  createdAt: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string | null;
};

type UploadMode = "file" | "url";

const PdfPage = () => {
  const [pdfs, setPdfs] = useState<Pdf[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal & Upload State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadMode, setUploadMode] = useState<UploadMode>("file");
  const [uploadName, setUploadName] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Track which specific field is copied (e.g., 'id-123' or 'src-123')
  const [copiedFieldId, setCopiedFieldId] = useState<string | null>(null);

  const loadPdfs = async () => {
    try {
      const data = await getAllPdfs();
      setPdfs(data as Pdf[]);
    } catch (error) {
      console.error("Failed to load PDFs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPdfs();
  }, []);

  const handleCreatePdf = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!uploadName) return;
    if (uploadMode === "file" && !uploadFile) return;
    if (uploadMode === "url" && !uploadUrl) return;

    setIsUploading(true);
    try {
      if (uploadMode === "file" && uploadFile) {
        // Upload to Drive, then add to DB
        const { fileId, publicUrl } = await uploadPdfToGoogleDrive(
          uploadName,
          uploadFile,
        );
        await addPdf(uploadName, publicUrl);
      } else if (uploadMode === "url" && uploadUrl) {
        // Bypass Drive upload, add direct link to DB
        await addPdf(uploadName, uploadUrl);
      }

      await loadPdfs(); // Refresh the list

      // Reset and close modal
      setUploadName("");
      setUploadFile(null);
      setUploadUrl("");
      setUploadMode("file");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add PDF:", error);
      alert("Failed to add PDF. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this PDF?")) {
      console.log("Delete PDF clicked for ID:", id);
      // await deletePdf(id);
      // await loadPdfs();
    }
  };

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFieldId(fieldId);
    setTimeout(() => setCopiedFieldId(null), 2000);
  };

  const formatDate = (dateString: Date | string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-gray-500">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
          <p>Loading PDFs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">PDF Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          Add PDF
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th
                  scope="col"
                  className="border-b border-gray-200 px-6 py-4 font-semibold"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="border-b border-gray-200 px-6 py-4 font-semibold"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="border-b border-gray-200 px-6 py-4 font-semibold"
                >
                  Source Link
                </th>
                <th
                  scope="col"
                  className="border-b border-gray-200 px-6 py-4 font-semibold"
                >
                  Created At
                </th>
                <th
                  scope="col"
                  className="border-b border-gray-200 px-6 py-4 text-right font-semibold"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {pdfs.length > 0 ? (
                pdfs.map((pdf) => (
                  <tr
                    key={pdf.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    {/* ID Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="max-w-[100px] truncate font-mono text-xs text-gray-500"
                          title={pdf.id}
                        >
                          {pdf.id}
                        </span>
                        <button
                          onClick={() => handleCopy(pdf.id, `id-${pdf.id}`)}
                          className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                          title="Copy ID"
                        >
                          {copiedFieldId === `id-${pdf.id}` ? (
                            <Check className="h-3.5 w-3.5 text-green-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Name Column */}
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        {pdf.name}
                      </div>
                    </td>

                    {/* Source Link Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <a
                          href={pdf.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="max-w-[150px] truncate text-blue-600 hover:underline sm:max-w-[200px]"
                          title={pdf.src}
                        >
                          {pdf.src}
                        </a>
                        <button
                          onClick={() => handleCopy(pdf.src, `src-${pdf.id}`)}
                          className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                          title="Copy Link"
                        >
                          {copiedFieldId === `src-${pdf.id}` ? (
                            <Check className="h-3.5 w-3.5 text-green-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Created At Column */}
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                      {formatDate(pdf.createdAt)}
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(pdf.id)}
                        className="inline-flex cursor-pointer items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileText className="h-8 w-8 text-gray-300" />
                      <p>No PDFs found in the system.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add PDF Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Add New PDF</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePdf} className="space-y-5">
              {/* Document Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Document Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  placeholder="e.g., Q3 Financial Report"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Mode Toggle */}
              <div className="flex rounded-lg bg-gray-100 p-1">
                <button
                  type="button"
                  onClick={() => setUploadMode("file")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-all ${
                    uploadMode === "file"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Upload className="h-4 w-4" />
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode("url")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-all ${
                    uploadMode === "url"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <LinkIcon className="h-4 w-4" />
                  Direct URL
                </button>
              </div>

              {/* Dynamic Input based on Mode */}
              <div className="min-h-[70px]">
                {uploadMode === "file" ? (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <label
                      htmlFor="file"
                      className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      PDF File
                    </label>
                    <input
                      type="file"
                      id="file"
                      accept=".pdf"
                      onChange={(e) =>
                        setUploadFile(e.target.files?.[0] || null)
                      }
                      required={uploadMode === "file"}
                      className="w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:outline-none"
                    />
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <label
                      htmlFor="url"
                      className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      PDF URL
                    </label>
                    <input
                      type="url"
                      id="url"
                      value={uploadUrl}
                      onChange={(e) => setUploadUrl(e.target.value)}
                      placeholder="https://example.com/document.pdf"
                      required={uploadMode === "url"}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>

              {/* Footer Buttons */}
              <div className="mt-6 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none"
                  disabled={isUploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    isUploading ||
                    !uploadName ||
                    (uploadMode === "file" && !uploadFile) ||
                    (uploadMode === "url" && !uploadUrl)
                  }
                  className="inline-flex min-w-[100px] items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isUploading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  ) : (
                    "Save PDF"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfPage;
