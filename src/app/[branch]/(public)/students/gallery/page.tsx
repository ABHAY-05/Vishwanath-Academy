"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { getGalleryImages } from "@/actions/gallery";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import ImageModal from "@/components/ImageModal";

const categories = [
  { value: "all", label: "All Photos" },
  { value: "class_group", label: "Class Group" },
  { value: "school_memories", label: "School Memories" },
  { value: "gallery", label: "General Gallery" },
  { value: "art_craft", label: "Art & Craft" },
];

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default function GalleryPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const [branch, setBranch] = useState<string>("");
  const [images, setImages] = useState<any[]>([]);
  const [filteredImages, setFilteredImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [zoom, setZoom] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    params.then((p) => {
      setBranch(p.branch);
      fetchImages(p.branch);
    });
  }, [params]);

  const fetchImages = async (branchName: string) => {
    try {
      const res = await getGalleryImages(branchName);
      if (res.success) {
        setImages(res.data);
        setFilteredImages(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch images", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredImages(images);
    } else {
      setFilteredImages(
        images.filter((img) => img.category === activeCategory),
      );
    }
  }, [activeCategory, images]);

  // Sync currentIndex when selectedImage changes or opens
  useEffect(() => {
    if (selectedImage) {
      const index = filteredImages.findIndex(
        (img) => img._id === selectedImage._id,
      );
      setCurrentIndex(index !== -1 ? index : 0);
      setZoom(1); // Reset zoom
    }
  }, [selectedImage, filteredImages]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const nextIndex = (prev + 1) % filteredImages.length;
      setSelectedImage(filteredImages[nextIndex]);
      return nextIndex;
    });
    setZoom(1);
  }, [filteredImages]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const prevIndex =
        (prev - 1 + filteredImages.length) % filteredImages.length;
      setSelectedImage(filteredImages[prevIndex]);
      return prevIndex;
    });
    setZoom(1);
  }, [filteredImages]);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.5, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.5, 1));

  // Keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, handleNext, handlePrev]);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-50 dark:bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-neutral-900 dark:text-white mb-4">
            Our <span className="text-blue-600">Gallery</span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Explore the vibrant life at Vishwanath Academy {branch} branch
            through our lens.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-30 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-center gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.value
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={40} />
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No images found in this category.
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {filteredImages.map((img) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={img._id}
                className="mb-4 relative group rounded-xl overflow-hidden cursor-pointer break-inside-avoid"
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img.url}
                  alt={img.title || "Gallery Image"}
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  {img.title && (
                    <p className="text-white font-medium truncate">
                      {img.title}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </Masonry>
        )}
      </section>

      <ImageModal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        images={filteredImages.map((img) => img.url)}
        currentIndex={currentIndex}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </main>
  );
}
