"use client";

import { useState, useEffect } from "react";
import { Trash2, Save, ImagePlus, Loader2 } from "lucide-react";
import CloudinaryUploader from "@/components/CloudinaryUploader";
import { createMeta, getMeta } from "@/lib/actions/meta";

const GALLERY_KEY = "gallery_images";

const GalleryPage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load existing images on mount
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const data = await getMeta(GALLERY_KEY);
      if (data?.value && Array.isArray(data.value)) {
        setImages(data.value as string[]);
      }
      setLoading(false);
    };
    fetchImages();
  }, []);

  const handleUpload = (url: string) => {
    setImages((prev) => [...prev, url]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await createMeta(GALLERY_KEY, images, true);
      alert("Gallery updated successfully!");
    } catch (error) {
      console.error("Failed to save gallery:", error);
      alert("Error saving gallery.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Gallery Manager</h1>
          <p className="text-gray-500 text-sm">Manage your public images</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Upload Trigger */}
        <CloudinaryUploader onUpload={handleUpload} />

        {/* Image Grid */}
        {images.map((url, index) => (
          <div
            key={index}
            className="group relative rounded-xl overflow-hidden aspect-square bg-gray-100 border"
          >
            <img
              src={url}
              alt={`Gallery item ${index}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => removeImage(index)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
