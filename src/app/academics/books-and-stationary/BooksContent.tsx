"use client";

import { booksAndStationary } from "@/data/academics-data";
import { BookOpen, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function BooksContent() {
  const { title, subtitle, intro, classes } = booksAndStationary;

  return (
    <main className="bg-white dark:bg-gray-950 pb-20">
      {/* HERO SECTION */}
      <section className="relative h-[250px] md:h-[300px] flex items-center justify-center bg-[#FDF6E4] dark:bg-[#2A1B3D]">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className="text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold text-primary dark:text-white bg-white dark:bg-primary/20 px-8 py-3 rounded-full shadow-sm"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xl text-primary/80 dark:text-gray-300 font-semibold"
          >
            {subtitle}
          </motion.p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10 py-12 space-y-12">
        {/* INTRO */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-gray-800 dark:text-white mb-4"
          >
            {intro}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400"
          >
            Select a class below to view or download the detailed book list.
          </motion.p>
        </div>

        {/* CLASS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {classes.map((className, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/5 dark:bg-primary/10 group-hover:bg-primary group-hover:text-white text-primary flex items-center justify-center mb-4 transition-colors duration-300">
                <BookOpen className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold font-display text-gray-800 dark:text-white mb-2">
                Class {className}
              </h3>

              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline">
                  <Download className="w-4 h-4" />
                  Download List
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
