"use client";

import { useState, useRef, useEffect, DragEvent } from "react";
import {
  UploadCloud,
  Loader2,
  CheckCircle2,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_PRESET_NAME } from "@/lib/configs";
import Link from "next/link";

interface CloudinaryUploaderProps {
  onUpload?: (url: string) => void;
  showPreview?: boolean;
  sizeLimit?: number;
  defaultImage?: string | null;
}

const CloudinaryUploader = ({
  onUpload,
  sizeLimit = 2, // in MB
  showPreview = true,
  defaultImage = null,
}: CloudinaryUploaderProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultImage || null,
  );
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with defaultImage if it changes externally (and we aren't mid-upload/success)
  useEffect(() => {
    if (!image && !success) {
      setPreviewUrl(defaultImage || null);
    }
  }, [defaultImage, image, success]);

  // Generate and cleanup the local image preview URL for pending files
  useEffect(() => {
    if (!image || !showPreview) return;

    const objectUrl = URL.createObjectURL(image);
    setPreviewUrl(objectUrl);

    // Free memory whenever the component is unmounted or the image changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [image, showPreview]);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleFileValidation(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileValidation(file);
    }
  };

  const handleFileValidation = (file: File) => {
    if (file.size > sizeLimit * 1024 * 1024) {
      return alert(`File size must be less than ${sizeLimit}MB`);
    }
    setImage(file);
    setSuccess(false);
  };

  const uploadImage = async () => {
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_PRESET_NAME);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      // Pass the URL to the parent component
      onUpload?.(data.secure_url);

      // Lock in the newly uploaded image as the preview
      setPreviewUrl(data.secure_url);
      setSuccess(true);
      setImage(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-md">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />

      <div
        onClick={() => !loading && !image && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-all duration-200 ${
          isDragging
            ? "border-blue-500 bg-blue-50/50"
            : image
              ? "border-slate-300 bg-slate-50"
              : success
                ? "border-green-400 bg-green-50/50"
                : "border-slate-300 hover:border-slate-400 hover:bg-slate-50 cursor-pointer"
        }`}
      >
        {loading ? (
          // 1. LOADING STATE
          <div className="flex flex-col items-center gap-3 py-4 text-blue-600">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="text-sm font-medium">Uploading to cloud...</p>
          </div>
        ) : success ? (
          // 2. SUCCESS STATE (Now shows the uploaded image preview)
          <div className="flex flex-col items-center gap-3 py-2 w-full">
            {showPreview && previewUrl && (
              <div className="relative shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-white border border-slate-200 shadow-sm mb-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-col items-center gap-1 text-green-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <p className="text-sm font-medium">Upload complete!</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSuccess(false);
                }}
                className="text-xs underline hover:text-green-700 mt-1"
              >
                Upload another
              </button>
            </div>
          </div>
        ) : image ? (
          // 3. PENDING UPLOAD STATE (File selected)
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex items-center justify-between w-full p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 overflow-hidden">
                {showPreview && previewUrl ? (
                  <Link
                    href={previewUrl}
                    target="_blank"
                    className="relative shrink-0 w-12 h-12 rounded-md overflow-hidden bg-slate-100 border border-slate-200 shadow-sm"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </Link>
                ) : (
                  <div className="p-2.5 bg-blue-100 text-blue-600 rounded-md shrink-0">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                )}

                <div className="flex flex-col truncate">
                  <span className="text-sm font-medium text-slate-700 truncate pr-4">
                    {image.name}
                  </span>
                  <span className="text-xs text-slate-500">
                    {(image.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              </div>
              <button
                onClick={clearSelection}
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors shrink-0"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                uploadImage();
              }}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors"
            >
              Confirm Upload
            </button>
          </div>
        ) : (
          // 4. IDLE STATE (Now cleanly shows defaultImage if it exists)
          <div className="flex flex-col items-center gap-3 w-full text-slate-500">
            {showPreview && previewUrl ? (
              <div className="flex items-center gap-4 p-3 bg-white border border-slate-200 rounded-lg shadow-sm w-full transition-colors hover:border-blue-400">
                <div className="relative shrink-0 w-12 h-12 rounded-md overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Current"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-medium text-slate-700">
                    Current Image
                  </span>
                  <span className="text-xs text-slate-500 hover:text-blue-600 transition-colors">
                    Click or drag to replace
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="p-3 bg-slate-100 rounded-full text-slate-600">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-700">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs mt-1">
                    SVG, PNG, JPG or GIF (Max {sizeLimit}MB)
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CloudinaryUploader;
