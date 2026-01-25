"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useParams } from "next/navigation";

import { aboutData } from "@/data/about-data";

// Facility Data
const facilities = aboutData.facilities;

export default function FacilitiesPage() {
  const [selectedFacility, setSelectedFacility] = useState<null | number>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const params = useParams();
  const branch = (params?.branch as string) || "aashiana"; // Default to aashiana if undefined

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

  // Branch specific content
  const isDhawapur = branch === "dhawapur";
  const campusTitle = isDhawapur ? "Dhawapur Campus" : "Aashiana Campus";
  const campusImage = isDhawapur
    ? "/facilities/Dhawapur-Facilities.webp"
    : "/facilities/Aashiana-Facilities.webp";
  const campusDesc = isDhawapur
    ? "Experience our serene and spacious Dhawapur campus, designed to provide an optimal environment for learning and growth away from the city noise."
    : "Discover our vibrant Aashiana campus, equipped with modern amenities and centrally located to provide accessible world-class education.";

  return (
    <main className="bg-white dark:bg-gray-950 pb-20 overflow-hidden">
      {/* 1. HERO SECTION - Modern Gradient */}
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
              Infrastructure
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
              Our Facilities
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto font-light leading-relaxed">
              State-of-the-art infrastructure designed to foster holistic
              development and learning.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10 py-16 space-y-24">
        {/* BRANCH FACILITIES - BROCHURE STYLE */}
        <div className="space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Campus Overview
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {campusDesc}
            </p>
          </div>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-800 w-full max-w-4xl"
            >
              <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-500 -z-10" />
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={campusImage}
                  alt={`${campusTitle} Facility Brochure`}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-contain bg-gray-50 dark:bg-gray-800"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {campusTitle}
                </h3>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />

        {/* FACILITIES GRID */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
              World-Class Highlights
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Explore the specific amenities that make our school stand out
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => openGallery(index)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg">
                  {/* Image */}
                  <div className="relative h-full w-full">
                    <Image
                      src={facility.thumbnail}
                      alt={facility.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white font-display mb-1">
                      {facility.title}
                    </h3>
                    <p className="text-white/80 text-sm font-medium">
                      View Gallery
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedFacility !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={closeGallery}
          >
            <button
              onClick={closeGallery}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
            >
              <X size={40} />
            </button>

            <div
              className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={facilities[selectedFacility].images[currentImageIndex]}
                    alt={`${facilities[selectedFacility].title} Image ${
                      currentImageIndex + 1
                    }`}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1280px"
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md border border-white/10"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md border border-white/10"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}

              {/* Image Counter & Title */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-white text-2xl font-bold font-display mb-1">
                  {facilities[selectedFacility].title}
                </h3>
                <div className="text-white/70 text-sm font-medium">
                  Image {currentImageIndex + 1} of{" "}
                  {facilities[selectedFacility].images.length}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
