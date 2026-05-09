import { getMeta } from "@/lib/actions/meta";
import GalleryLightbox from "./GalleryLightbox";

export default async function Gallery() {
  const galleryMeta = await getMeta("gallery_images");
  const galleryImagesArray = (galleryMeta?.value as string[]) || [];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <header className="mb-20 text-center">
        <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-widest text-xs uppercase mb-4 block">
          Visual Journey
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
          Our Academic Sanctuary
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Explore the environment where future civil servants are forged. From
          intensive classroom sessions to celebratory result moments.
        </p>
      </header>

      <GalleryLightbox images={galleryImagesArray} />
    </main>
  );
}
