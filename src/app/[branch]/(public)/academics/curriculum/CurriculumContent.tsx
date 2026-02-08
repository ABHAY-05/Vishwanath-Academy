"use client";

import { academicsData } from "@/data/academics-data";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function CurriculumContent() {
  const { title, intro, objectives, levels } = academicsData.curriculum;

  return (
    <main className="bg-white dark:bg-gray-950 pb-20 overflow-hidden">
      {/* 1. HERO SECTION - Modern Gradient */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
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
              Academic Excellence
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              {title}
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10 py-16 space-y-24">
        {/* INTRO SECTION */}
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7 space-y-6"
          >
            <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-3xl border border-primary/10">
              <p className="text-xl text-gray-800 dark:text-gray-200 font-medium leading-relaxed italic">
                "{intro[0]}"
              </p>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
              {intro[1]}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-5 bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-secondary rounded-full" />
              {intro[2]}
            </h3>
            <ul className="space-y-4">
              {objectives.map((obj, index) => (
                <li key={index} className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                    {obj}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* LEVELS (Primary, Junior, Senior) */}
        <div className="space-y-32">
          {levels.map((level, index) => {
            const isImageLeft = index % 2 === 0;

            return (
              <div
                key={level.id}
                className={`relative flex flex-col gap-12 items-center ${
                  isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Decorative blob behind text/image pair */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl -z-10 ${isImageLeft ? "right-0" : "left-0"}`}
                />

                {/* IMAGE */}
                <motion.div
                  initial={{ opacity: 0, x: isImageLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-full md:w-1/2 flex justify-center"
                >
                  <div
                    className={`relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white dark:border-gray-800 group ${isImageLeft ? "rotate-2" : "-rotate-2"} hover:rotate-0 transition-all duration-500 ease-in-out`}
                  >
                    <Image
                      src={level.image}
                      alt={level.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>

                {/* TEXT */}
                <motion.div
                  initial={{ opacity: 0, x: isImageLeft ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full md:w-1/2 space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-primary dark:text-white">
                      {level.title}
                    </h2>
                  </div>

                  <div className="h-1 w-20 bg-secondary rounded-full" />

                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                    {level.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
