"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

import { aboutData } from "@/data/about-data";

// Facility Data
const facilities = aboutData.facilities;

export default function FacilitiesPage() {
  const [selectedFacility, setSelectedFacility] = useState<null | number>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (index: number) => {
    setSelectedFacility(index);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedFacility(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedFacility === null) return;
    const images = facilities[selectedFacility].images;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (selectedFacility === null) return;
    const images = facilities[selectedFacility].images;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <main className="bg-white dark:bg-gray-950 pb-20">
      {/* HERO SECTION */}
      <section className="relative h-[250px] md:h-[300px] flex items-center justify-center bg-[#FDF6E4] dark:bg-[#2A1B3D]">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-primary dark:text-white bg-white dark:bg-primary/20 px-8 py-3 rounded-full shadow-sm"
          >
            Facilities
          </motion.h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10 py-16 space-y-24">
        {/* BRANCH FACILITIES - BROCHURE STYLE */}
        <div className="space-y-12">
          {/* AASHIANA BRANCH */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
              <Image
                src="/facilities/Aashiana-Facilities.webp"
                alt="Aashiana Branch Facility Brochure"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain" // object-contain to ensure the brochure is fully visible
              />
            </div>
          </motion.div>

          {/* DHAWAPUR BRANCH */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
              <Image
                src="/facilities/Dhawapur-Facilities.webp"
                alt="Dhawapur Branch Facility Brochure"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>

        <div className="my-12 flex items-center justify-center">
          <div className="h-px bg-gray-200, dark:bg-gray-800 w-full max-w-3xl" />
        </div>

        {/* FACILITIES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className="text-center group cursor-pointer"
                onClick={() => openGallery(index)}
              >
                <div className="bg-primary text-white py-2 px-6 rounded-full font-display font-bold text-lg inline-block mb-4 shadow-md group-hover:scale-105 transition-transform">
                  {facility.title}
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-transparent group-hover:border-primary transition-colors shadow-lg">
                  <Image
                    src={facility.thumbnail}
                    alt={facility.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <ZoomIn size={32} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedFacility !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={closeGallery}
          >
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-50"
            >
              <X size={40} />
            </button>

            <div
              className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={facilities[selectedFacility].images[currentImageIndex]}
                    alt={`${facilities[selectedFacility].title} Image ${
                      currentImageIndex + 1
                    }`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-contain"
                    priority
                    quality={100}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              {facilities[selectedFacility].images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 bg-black/50 px-4 py-1 rounded-full text-sm">
                {currentImageIndex + 1} /{" "}
                {facilities[selectedFacility].images.length}
              </div>
            </div>

            <h3 className="absolute bottom-8 left-8 text-white text-2xl font-bold font-display drop-shadow-md">
              {facilities[selectedFacility].title}
            </h3>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
