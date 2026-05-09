import React, { useState, useRef } from "react";
import { Loader2, Upload, FileCheck, X } from "lucide-react";

interface PdfUploaderProps {
  onUploadSuccess: (id: string) => void;
}

const PdfUploader = ({ onUploadSuccess }: PdfUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please select a valid PDF file.");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed. Please try again.");

      const data = await response.json();

      // Send the ID to the parent component
      if (data.id) {
        onUploadSuccess(data.id);
        setFile(null); // Reset after success
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleUpload} className="space-y-4">
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl p-8 
            flex flex-col items-center justify-center transition-all cursor-pointer
            ${file ? "border-primary/50 bg-primary/5" : "border-gray-200/50 hover:border-primary/30"}
            ${isUploading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf"
          />

          {!file ? (
            <>
              <Upload className="w-8 h-8 text-text-muted mb-2" />
              <p className="text-sm font-medium text-text">
                Click to select PDF
              </p>
              <p className="text-xs text-text-muted mt-1">
                Maximum file size: 10MB
              </p>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <FileCheck className="w-6 h-6 text-green-500" />
              <span className="text-sm font-medium truncate max-w-[200px]">
                {file.name}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                className="p-1 hover:bg-red-100 rounded-full text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

        <button
          type="submit"
          disabled={!file || isUploading}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-primary text-white rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Upload Document"
          )}
        </button>
      </form>
    </div>
  );
};

export default PdfUploader;
