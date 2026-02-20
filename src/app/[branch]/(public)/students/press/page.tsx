"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { getPressReleases } from "@/actions/pressRelease";
import { Loader2, Newspaper } from "lucide-react";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import ImageModal from "@/components/ImageModal";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

interface PressRelease {
  _id: string;
  image: { url: string; publicId: string };
  title: string;
}

export default function PressReleasePage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const [branch, setBranch] = useState<string>("");
  const [releases, setReleases] = useState<PressRelease[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedImage, setSelectedImage] = useState<PressRelease | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    params.then((p) => {
      setBranch(p.branch);
      fetchReleases();
    });
  }, [params]);

  const fetchReleases = async () => {
    try {
      const res = await getPressReleases();
      if (res.success) {
        setReleases(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch press releases", error);
    } finally {
      setLoading(false);
    }
  };

  // Sync currentIndex when selectedImage changes
  useEffect(() => {
    if (selectedImage) {
      const index = releases.findIndex((img) => img._id === selectedImage._id);
      setCurrentIndex(index !== -1 ? index : 0);
    }
  }, [selectedImage, releases]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const nextIndex = (prev + 1) % releases.length;
      setSelectedImage(releases[nextIndex]);
      return nextIndex;
    });
  }, [releases]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const prevIndex = (prev - 1 + releases.length) % releases.length;
      setSelectedImage(releases[prevIndex]);
      return prevIndex;
    });
  }, [releases]);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedImage(null);
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
            Press <span className="text-blue-600">Release</span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Discover Vishwanath Academy's presence in the news through our
            featured media and press releases.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={40} />
          </div>
        ) : releases.length === 0 ? (
          <div className="text-center py-20 text-gray-500 flex flex-col items-center">
            <Newspaper size={48} className="mb-4 text-gray-400 opacity-50" />
            <p>No press releases found at the moment.</p>
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {releases.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item._id}
                className="mb-4 relative group rounded-xl overflow-hidden cursor-pointer shadow-sm border border-gray-100 dark:border-gray-800"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative">
                  <Image
                    src={item.image.url}
                    alt={item.title}
                    width={600}
                    height={800} // Masonry naturally adjusts height anyway
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-medium line-clamp-2">
                      {item.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        )}
      </section>

      <ImageModal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        images={releases.map((item) => item.image.url)}
        currentIndex={currentIndex}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </main>
  );
}
