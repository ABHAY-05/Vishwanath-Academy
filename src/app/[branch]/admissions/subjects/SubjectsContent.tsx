"use client";

import { subjectCombination } from "@/data/admissions-data";
import { motion } from "framer-motion";
import { BookOpen, Layers, Check } from "lucide-react";

export default function SubjectsContent() {
  const { title, subtitle, streams } = subjectCombination;

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
              Curriculum Choices
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

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10 py-12 space-y-16">
        <div className="grid gap-12">
          {streams.map((stream, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800"
            >
              <div className="bg-gradient-to-r from-primary to-blue-800 px-8 py-6 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
                <h2 className="text-2xl md:text-3xl font-bold font-display text-white uppercase tracking-wider relative z-10 flex items-center gap-3">
                  <BookOpen className="text-secondary opacity-80" />
                  {stream.name}
                </h2>
              </div>

              <div className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50 text-sm uppercase text-gray-500 dark:text-gray-400">
                        <th className="p-6 font-bold border-b border-gray-100 dark:border-gray-800 w-1/4">
                          Group
                        </th>
                        <th className="p-6 font-bold border-b border-gray-100 dark:border-gray-800 w-1/3">
                          Compulsory Subjects
                        </th>
                        <th className="p-6 font-bold border-b border-gray-100 dark:border-gray-800">
                          Elective Subjects (Select One)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {stream.groups.map((group, gIndex) => (
                        <tr
                          key={gIndex}
                          className="hover:bg-blue-50/20 dark:hover:bg-gray-800/30 transition-colors group"
                        >
                          <td className="p-6 font-bold text-primary dark:text-secondary border-r border-gray-100 dark:border-gray-800/50">
                            {group.name ? (
                              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary border border-primary/10">
                                <Layers size={16} />
                                {group.name}
                              </span>
                            ) : (
                              <span className="text-gray-400 italic font-medium px-4">
                                General
                              </span>
                            )}
                          </td>
                          <td className="p-6 border-r border-gray-100 dark:border-gray-800/50">
                            <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                              {group.compulsory}
                            </p>
                          </td>
                          <td className="p-6">
                            {group.elective.includes("/") ? (
                              <div className="flex flex-wrap gap-2">
                                {group.elective
                                  .split("/")
                                  .map((sub, sIndex) => (
                                    <span
                                      key={sIndex}
                                      className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded-full border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-1"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                      {sub.trim()}
                                    </span>
                                  ))}
                              </div>
                            ) : (
                              <p className="text-gray-800 dark:text-gray-200 font-medium p-3 bg-gray-50 dark:bg-gray-800 rounded-xl inline-block border border-gray-100 dark:border-gray-700">
                                {group.elective}
                              </p>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
