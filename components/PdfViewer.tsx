"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { addWatermark } from "@/lib/waterMark";
import Link from "next/link";
// Assuming you have 'lucide-react' for icons. If not, you can replace these with standard SVGs.
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Moon,
  Sun,
} from "lucide-react";
const Document = dynamic(
  () => import("react-pdf").then((mod) => mod.Document),
  { ssr: false },
);

const Page = dynamic(() => import("react-pdf").then((mod) => mod.Page), {
  ssr: false,
});

function PdfContent({ id }: { id: string }) {
  const [pdfBlob, setPdfBlob] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // New states for UI/UX features
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    import("react-pdf").then(({ pdfjs }) => {
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
    });
  }, []);

  useEffect(() => {
    async function loadPdf() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/proxy-pdf/${id}`);

        if (!response.ok)
          throw new Error("Failed to load", { cause: response.status });

        const buffer = await response.arrayBuffer();
        const email = response.headers.get("x-user-email");

        const watermarkedBlob = await addWatermark(
          buffer,
          email || "MENTOR PLUS",
        );

        const url = URL.createObjectURL(watermarkedBlob);
        setPdfBlob(url);
      } catch (err: any) {
        if (err?.cause === 403) {
          setError("You are not authorized to view this PDF.");
        } else {
          setError("Failed to load PDF.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (id) loadPdf();

    return () => {
      if (pdfBlob) URL.revokeObjectURL(pdfBlob);
    };
  }, [id]);

  // Document load handler
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  // Pagination handlers
  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setPageNumber((prev) => Math.min(prev + 1, numPages || 1));

  // Zoom handlers
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6));

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-10 text-center gap-4 bg-red-50 rounded-lg border border-red-100">
        <p className="text-red-600 font-medium">{error}</p>
        <Link
          href="/dashboard/my-purchases"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go Back to My Purchases
        </Link>
      </div>
    );
  }

  if (isLoading || !pdfBlob) {
    return (
      <div className="flex items-center justify-center min-h-[600px] bg-gray-50 rounded-lg border animate-pulse">
        <p className="text-gray-500 font-medium">
          Decrypting and loading document...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col border rounded-lg overflow-hidden bg-gray-100 shadow-md">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between p-3 bg-white border-b sticky top-0 z-10 gap-4">
        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Previous Page"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-medium text-gray-700 min-w-[80px] text-center">
            Page {pageNumber} of {numPages || "--"}
          </span>
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= (numPages || 1)}
            className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Next Page"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 border-r pr-4">
            <button
              onClick={zoomOut}
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-sm font-medium text-gray-600 w-12 text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={zoomIn}
              className="p-1.5 rounded hover:bg-gray-100 text-gray-700 transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={18} />
            </button>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-colors flex items-center gap-2 text-sm font-medium ${
              isDarkMode
                ? "bg-gray-800 text-yellow-400"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
            <span className="hidden sm:inline">
              {isDarkMode ? "Dark" : "Light"}
            </span>
          </button>
        </div>
      </div>

      {/* PDF Viewer Canvas */}
      <div
        className={`flex-1 overflow-auto p-4 flex justify-center ${isDarkMode ? "bg-gray-900" : "bg-gray-100"} transition-colors duration-300`}
        style={{ minHeight: "600px" }}
        onContextMenu={(e) => e.preventDefault()} // Basic right-click protection
      >
        <Document
          file={pdfBlob}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="text-gray-500 mt-10">Rendering pages...</div>
          }
        >
          <div
            className="shadow-lg transition-transform"
            style={{
              // The hue-rotate prevents images and colored text from looking completely alien
              // while inverting the black text to white and white background to black.
              filter: isDarkMode ? "invert(1) hue-rotate(180deg)" : "none",
              transition: "filter 0.3s ease",
            }}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              scale={scale}
              className="bg-white"
            />
          </div>
        </Document>
      </div>
    </div>
  );
}

// --- The Combined Export ---
export default dynamic(() => Promise.resolve(PdfContent), {
  ssr: false,
  loading: () => (
    <div className="min-h-[600px] flex flex-col items-center justify-center bg-white rounded-lg animate-pulse border shadow-sm">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 font-medium">Initializing Secure Viewer...</p>
    </div>
  ),
});
