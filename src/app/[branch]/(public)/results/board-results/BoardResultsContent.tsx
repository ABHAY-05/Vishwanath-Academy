"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Eye, Trophy } from "lucide-react";
import ImageModal from "@/components/ImageModal";

interface BoardResult {
  _id: string;
  year: string;
  classX?: { url: string; publicId: string };
  classXII?: { url: string; publicId: string };
}

interface Props {
  highlightImage: { url: string; publicId: string } | null;
  results: BoardResult[];
  branch: string;
}

export default function BoardResultsContent({
  highlightImage,
  results,
  branch,
}: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImage = (url: string) => {
    setSelectedImage(url);
  };

  return (
    <main className="bg-white dark:bg-gray-950 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-blue-900 dark:bg-gray-900">
          <div className="absolute inset-0 opacity-20 bg-[url('/pattern-grid.svg')] bg-repeat" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-black/80 dark:from-black/90 dark:to-blue-950/50" />

          {/* Animated Blobs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -left-32 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, -60, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl"
          />
        </div>

        <div className="text-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 font-semibold text-sm mb-4">
              <Trophy size={14} className="inline mr-2" />
              Academic Excellence
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              Board Exam Results
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto font-light leading-relaxed">
              Celebrating the outstanding achievements of our students in CBSE
              Board Examinations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 space-y-16">
        {/* Highlight Image */}
        {highlightImage && (
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-800 w-full max-w-5xl"
            >
              <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-2xl transform group-hover:scale-[1.01] transition-transform duration-500 -z-10" />
              <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={highlightImage.url}
                  alt="Board Result Highlight"
                  fill
                  className="object-contain bg-gray-50 dark:bg-gray-800"
                  priority
                />
              </div>
            </motion.div>
          </div>
        )}

        {/* Results Table */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-primary/5 dark:bg-primary/20">
                  <tr>
                    <th className="px-6 py-5 text-sm font-bold text-primary dark:text-white uppercase tracking-wider text-center border-b border-primary/10 dark:border-primary/20">
                      S.No.
                    </th>
                    <th className="px-6 py-5 text-sm font-bold text-primary dark:text-white uppercase tracking-wider text-center border-b border-primary/10 dark:border-primary/20">
                      Academic Year
                    </th>
                    <th className="px-6 py-5 text-sm font-bold text-primary dark:text-white uppercase tracking-wider text-center border-b border-primary/10 dark:border-primary/20">
                      Class X Result
                    </th>
                    <th className="px-6 py-5 text-sm font-bold text-primary dark:text-white uppercase tracking-wider text-center border-b border-primary/10 dark:border-primary/20">
                      Class XII Result
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-950">
                  {results.length > 0 ? (
                    results.map((result, idx) => (
                      <motion.tr
                        key={result._id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group"
                      >
                        <td className="px-6 py-5 text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
                          {idx + 1}.
                        </td>
                        <td className="px-6 py-5 text-base font-bold text-gray-900 dark:text-white text-center">
                          {result.year}
                        </td>
                        <td className="px-6 py-5 text-center">
                          {result.classX ? (
                            <button
                              onClick={() => openImage(result.classX!.url)}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white text-sm font-bold transition-all transform hover:scale-105 active:scale-95"
                            >
                              <Eye size={16} />
                              View Result
                            </button>
                          ) : (
                            <span className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 text-xs font-medium">
                              Not Available
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-5 text-center">
                          {result.classXII ? (
                            <button
                              onClick={() => openImage(result.classXII!.url)}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white text-sm font-bold transition-all transform hover:scale-105 active:scale-95"
                            >
                              <Eye size={16} />
                              View Result
                            </button>
                          ) : (
                            <span className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 text-xs font-medium">
                              Not Available
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-16 text-center text-gray-500 text-lg"
                      >
                        No board results found for this branch yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        images={selectedImage ? [selectedImage] : []}
        currentIndex={0}
      />
    </main>
  );
}
