"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import dynamic from "next/dynamic";
import { addWatermark } from "@/lib/waterMark";
import Link from "next/link";

// 5.4.296 version of pdf.worker.min.js
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

// --- The Actual Content Component ---
function PdfContent({ id }: { id: string }) {
  const [pdfBlob, setPdfBlob] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPdf() {
      try {
        const response = await fetch(`/api/pdf/${id}`);
        if (!response.ok)
          throw new Error("Failed to load", { cause: response.status });

        const buffer = await response.arrayBuffer();
        const email = response.headers.get("x-user-email");

        const watermarkedBlob = await addWatermark(buffer, email!);

        const url = URL.createObjectURL(watermarkedBlob);
        setPdfBlob(url);
      } catch (err: any) {
        if (err?.cause === 403) {
          setError("You are not authorized to view this PDF");
        } else {
          setError("Failed to load PDF");
        }
      }
    }

    if (id) loadPdf();

    return () => {
      if (pdfBlob) URL.revokeObjectURL(pdfBlob);
    };
  }, [id]);

  if (error) {
    return (
      <div className="p-10 text-center flex flex-col gap-2">
        {error}

        <Link
          href="/dashboard/my-purchases"
          className="text-blue-500 underline text-blue-500"
        >
          Go Back to My Purchases
        </Link>
      </div>
    );
  }

  if (!pdfBlob) {
    return (
      <div className="p-10 text-center text-gray-500">Loading document...</div>
    );
  }

  return (
    <div
      className="flex flex-col items-center border rounded-lg p-4 bg-gray-50 shadow-sm"
      onContextMenu={(e) => e.preventDefault()} // Basic right-click protection
    >
      <Document file={pdfBlob}>
        <Page
          pageNumber={1}
          renderTextLayer={false} // Prevents easy text highlighting/copying
          renderAnnotationLayer={false}
          scale={1.2}
        />
      </Document>
    </div>
  );
}

// --- The Combined Export ---
// We wrap the component above in a dynamic loader with SSR disabled.
export default dynamic(() => Promise.resolve(PdfContent), {
  ssr: false,
  loading: () => (
    <div className="h-96 flex items-center justify-center bg-white rounded-lg animate-pulse border">
      <p className="text-gray-400">Initializing Secure Viewer...</p>
    </div>
  ),
});
