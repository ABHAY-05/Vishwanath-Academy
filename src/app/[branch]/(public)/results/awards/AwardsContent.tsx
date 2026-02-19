"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Eye } from "lucide-react";
import { useState } from "react";
import ImageModal from "@/components/ImageModal";

interface SchoolAward {
  _id: string;
  image: { url: string; publicId: string };
  description: string;
}

interface Props {
  awards: SchoolAward[];
}

export default function AwardsContent({ awards }: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  return (
    <main className="bg-white dark:bg-gray-950 pb-20">
      {/* HERO SECTION */}
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
        </div>

        <div className="text-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 font-semibold text-sm mb-4">
              <Award size={14} className="inline mr-2" />
              Recognitions & Achievements
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              School Awards
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto font-light leading-relaxed">
              Celebrating the prestigious awards and recognitions earned by our
              school community.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        {awards.length > 0 ? (
          <div className="space-y-12">
            {awards.map((award, index) => (
              <motion.div
                key={award._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800"
              >
                {/* Image on the left */}
                <div className="w-full md:w-1/3 lg:w-2/5 shrink-0">
                  <div
                    className="group relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-md cursor-pointer bg-gray-100 dark:bg-gray-800"
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={award.image.url}
                      alt="School Award"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                        <Eye size={32} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description on the right */}
                <div className="w-full md:w-2/3 lg:w-3/5 flex flex-col justify-center">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-base md:text-lg leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-500">
            <Award
              size={64}
              className="mx-auto text-gray-300 dark:text-gray-700 mb-6"
            />
            <p className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No Awards Yet
            </p>
            <p>New awards and recognitions will appear here.</p>
          </div>
        )}
      </section>

      <ImageModal
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
        images={awards.map((a) => a.image.url)}
        currentIndex={selectedImageIndex || 0}
        onNext={() =>
          setSelectedImageIndex((prev) =>
            prev === null || prev === awards.length - 1 ? prev : prev + 1,
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
