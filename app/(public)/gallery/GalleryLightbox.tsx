"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryLightboxProps {
  images: string[];
}

export default function GalleryLightbox({ images }: GalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null,
    );
  }, [images.length]);

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null,
    );
  }, [images.length]);

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, showNext, showPrev]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image, idx) => (
          <div
            key={idx}
            onClick={() => openModal(idx)}
            className="group relative overflow-hidden rounded-xl bg-gray-900 aspect-square shadow-sm hover:shadow-xl transition-all duration-500 cursor-zoom-in"
          >
            <img
              src={image}
              alt={`Gallery Image ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-75"
            />
            {/* Hover Indicator */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-sm font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                View Image
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Backdrop */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-all duration-300"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 p-3 text-white/70 hover:text-white transition-colors z-[60]"
            onClick={closeModal}
          >
            <X size={32} />
          </button>

          {/* Navigation Buttons */}
          <button
            className="absolute left-4 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[60]"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
          >
            <ChevronLeft size={40} />
          </button>

          <button
            className="absolute right-4 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[60]"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            <ChevronRight size={40} />
          </button>

          {/* Main Image */}
          <div className="relative w-full h-full p-4 md:p-12 flex items-center justify-center">
            <img
              src={images[selectedIndex]}
              alt="Expanded view"
              className="max-w-full max-h-full object-contain select-none shadow-2xl animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Counter */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 font-mono text-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
