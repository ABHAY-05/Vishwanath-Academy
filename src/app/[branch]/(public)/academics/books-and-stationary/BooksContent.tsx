"use client";

import { booksAndStationary } from "@/data/academics-data";
import { BookOpen, Download, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getBookLists } from "@/actions/bookList";

interface BookListData {
  _id: string;
  className: string;
  file: { url: string; publicId: string };
}

export default function BooksContent() {
  const { title, subtitle, intro, classes } = booksAndStationary;
  const [bookLists, setBookLists] = useState<BookListData[]>([]);

  useEffect(() => {
    async function fetchLists() {
      const res = await getBookLists();
      if (res.success && res.data) {
        setBookLists(res.data);
      }
    }
    fetchLists();
  }, []);

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
              Essential Resources
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto font-light leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10 py-12 space-y-12">
        {/* INTRO */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-4"
          >
            {intro}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Select a class below to view or download the detailed book list
            (PDF).
          </motion.p>
        </div>

        {/* CLASS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {classes.map((className, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-800 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-50 text-gray-200 dark:text-gray-800 pointer-events-none transform translate-x-1/2 -translate-y-1/2">
                <FileText size={100} />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-50 dark:from-gray-800 dark:to-gray-800 text-primary dark:text-blue-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-primary/5">
                  <BookOpen className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                  Class {className}
                </h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">
                  Academic Session 2025-26
                </p>

                {(() => {
                  const match = bookLists.find(
                    (doc) => doc.className === className,
                  );
                  if (match) {
                    return (
                      <a
                        href={match.file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-primary dark:text-white font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm border border-primary/20 group-hover:border-transparent"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </a>
                    );
                  }
                  return (
                    <button
                      disabled
                      className="w-full py-3 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed border border-gray-100 dark:border-gray-800"
                    >
                      Unavailable
                    </button>
                  );
                })()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
