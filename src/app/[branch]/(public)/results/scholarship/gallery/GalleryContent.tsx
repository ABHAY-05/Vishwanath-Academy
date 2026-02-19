"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Masonry from "react-masonry-css";
import ImageModal from "@/components/ImageModal";

interface GalleryImage {
  _id: string;
  url: string;
  caption?: string;
}

interface Props {
  images: GalleryImage[];
  branch: string;
}

export default function ScholarshipGalleryContent({ images, branch }: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen pb-20">
      {/* Header */}
      <section className="bg-primary/5 dark:bg-primary/10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Link
            href={`/${branch}/results/scholarship`}
            className="inline-flex items-center gap-2 text-primary dark:text-secondary font-bold mb-6 hover:underline"
          >
            <ArrowLeft size={20} /> Back to Results
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Felicitation Gallery
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Moments of pride and joy from the Shri Markandey Tewari Bright
              Child Scholarship distribution ceremony.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {images.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-4 md:-ml-8"
            columnClassName="pl-4 md:pl-8 bg-clip-padding"
          >
            {images.map((img, idx) => (
              <motion.div
                key={img._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="mb-4 md:mb-8 group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-gray-100 dark:bg-gray-900 break-inside-avoid"
                onClick={() => setSelectedImageIndex(idx)}
              >
                <div className="relative">
                  <Image
                    src={img.url}
                    alt={img.caption || "Gallery Image"}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                      <Eye size={32} />
                    </div>
                  </div>
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                      <p className="font-medium text-sm md:text-base">
                        {img.caption}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </Masonry>
        ) : (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No images found in the gallery.
            </p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
        images={images.map((img) => img.url)}
        currentIndex={selectedImageIndex || 0}
        onNext={() =>
          setSelectedImageIndex((prev) =>
            prev === null || prev === images.length - 1 ? prev : prev + 1,
          )
        }
        onPrev={() =>
          setSelectedImageIndex((prev) =>
            prev === null || prev === 0 ? prev : prev - 1,
          )
        }
      />
    </main>
  );
}
