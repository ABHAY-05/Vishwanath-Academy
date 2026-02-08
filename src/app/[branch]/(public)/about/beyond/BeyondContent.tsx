"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Activity,
  Smartphone,
  Trophy,
  Lightbulb,
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { aboutData } from "@/data/about-data";

// Slider Images
const { sportsImages, balancingImage, digitalImage, motivationalImage } =
  aboutData.beyondClassroom;

export default function LearningBeyondClassroom() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentLightboxIndex((prev) => (prev + 1) % sportsImages.length);
  };

  const prevLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentLightboxIndex(
      (prev) => (prev - 1 + sportsImages.length) % sportsImages.length,
    );
  };

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
              Holistic Development
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              Learning Beyond Classroom
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto font-light leading-relaxed">
              Education is not just about books; it's about experiences, sports,
              and technology.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-[95%] xl:max-w-[1400px] px-4 md:px-6 relative z-10 py-16 space-y-32">
        {/* SECTION 1: Balancing Body, Mind & Soul */}
        <section className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary dark:text-secondary">
                  <Activity size={32} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
                  Balancing Body, <br />
                  Mind & Soul
                </h2>
              </div>

              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 font-body leading-relaxed text-justify">
                <p>
                  Taking care of our body is a responsibility, as it's the key
                  to keeping the lamp of wisdom glowing and young minds strong
                  and clear. At Vishwanath Academy, we believe in the essential
                  balance between physical health and mental development.
                </p>
                <p>
                  Our goal is to prepare students for future challenges while
                  safeguarding their childhood. To foster the full development
                  of a child's personality, we place significant emphasis on
                  both intra-mural and extra-curricular activities.
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 relative"
            >
              {/* Decorative blob behind */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl -z-10" />

              <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src={balancingImage}
                  alt="Balancing Body, Mind & Soul"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: Digital Technology */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tl from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -z-10" />

              <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 -rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src={digitalImage}
                  alt="Digital Technology"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-secondary/10 text-secondary">
                  <Smartphone size={32} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
                  Use of Digital Technology
                </h2>
              </div>

              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 font-body leading-relaxed text-justify">
                <p>
                  Digital learning encompasses instructional practices that
                  leverage technology to enhance a student's learning
                  experience. At Vishwanath Academy, we firmly believe in the
                  synergy of technology and teaching.
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border-l-4 border-secondary text-sm">
                  Our school features two advanced computer labs where students
                  across all classes engage in computer-aided learning. Each lab
                  is equipped with 35 personal computers, multimedia kits, and
                  broadband internet.
                </div>
                <p>
                  Beyond computer science, our school embraces various
                  technologies including smart classes and a state-of-the-art
                  ERP software for efficient management and communication.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: Sports Slider */}
        <section className="bg-gray-50 dark:bg-gray-900/50 -mx-4 md:-mx-6 px-4 md:px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary dark:text-secondary mb-4">
                <Trophy size={24} />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Outdoor & Sports Activities
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                Cultivating team spirit, resilience, and physical fitness
                through a robust sports program.
              </p>
            </div>

            <div className="mb-16">
              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className="w-full !pb-12"
              >
                {sportsImages.map((src, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                      onClick={() => openLightbox(index)}
                    >
                      <Image
                        src={src}
                        alt={`Sports Activity ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="text-white w-12 h-12" />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl">
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed text-center">
                With a playground spanning 60 meters, two Volleyball courts, and
                a dedicated room for Table Tennis, we offer top-tier facilities.
                Our students have consistently brought pride to the institution
                by winning various competitions at local, state, and national
                levels.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Motivation */}
        <section>
          <div className="relative rounded-3xl overflow-hidden bg-primary dark:bg-gray-900 shadow-2xl">
            <div className="absolute inset-0 opacity-10 bg-[url('/pattern-grid.svg')]" />
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-video lg:aspect-auto">
                <Image
                  src={motivationalImage}
                  alt="Motivational Session"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/80 lg:to-primary dark:to-gray-900" />
              </div>

              <div className="p-8 lg:p-16 flex flex-col justify-center relative z-10">
                <div className="flex items-center gap-3 mb-6 text-secondary">
                  <Lightbulb size={28} />
                  <span className="font-bold uppercase tracking-widest text-sm">
                    Expert Guidance
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                  Motivational & Knowledge Sessions
                </h2>
                <p className="text-blue-100 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  We organize sessions by industry experts to enhance student
                  outcomes. Motivational counseling helps minimize risky
                  behavior and boosts academic achievements.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
            >
              <X size={48} />
            </button>

            <div
              className="relative w-full max-w-6xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLightboxIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full rounded-lg overflow-hidden"
                >
                  <Image
                    src={sportsImages[currentLightboxIndex]}
                    alt={`Fullscreen Image ${currentLightboxIndex + 1}`}
                    fill
                    sizes="(max-width: 1152px) 100vw, 1152px"
                    className="object-contain"
                    priority
                    quality={100}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <button
                onClick={prevLightboxImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <ChevronLeft size={40} />
              </button>
              <button
                onClick={nextLightboxImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <ChevronRight size={40} />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 bg-black/50 px-6 py-2 rounded-full text-base font-medium">
                {currentLightboxIndex + 1} / {sportsImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
