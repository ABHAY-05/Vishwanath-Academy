"use client";

import { admissionProcedure } from "@/data/admissions-data";
import { motion } from "framer-motion";
import {
  FileText,
  ClipboardList,
  CheckCircle,
  GraduationCap,
} from "lucide-react";

export default function ProcedureContent() {
  const { title, subtitle, intro, sections } = admissionProcedure;

  // Icons map for sections as decoration
  const icons = [FileText, ClipboardList, GraduationCap];

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
              Join Our Family
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

      <div className="mx-auto max-w-5xl px-4 md:px-6 relative z-10 py-12 space-y-12">
        {/* INTRO Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
          <p className="text-xl text-gray-700 dark:text-gray-200 font-medium leading-relaxed max-w-3xl mx-auto">
            {intro}
          </p>
        </motion.div>

        {/* SECTIONS */}
        <div className="space-y-16">
          {sections.map((section, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-gray-50 dark:bg-gray-800/20 rounded-3xl p-8 md:p-10 border border-gray-100 dark:border-gray-800 relative transition-colors hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg"
              >
                {/* Decorative Number */}
                <div className="absolute -top-6 -right-6 text-[120px] font-bold text-gray-900/[0.03] dark:text-white/[0.03] font-display select-none">
                  {index + 1}
                </div>

                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm text-primary dark:text-secondary">
                    <Icon size={32} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold font-display text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>

                <div className="relative z-10 space-y-6 pl-2 md:pl-16">
                  {section.description && (
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                      {section.description}
                    </p>
                  )}

                  {/* List Items (Criteria) */}
                  {section.items && (
                    <ul className="space-y-4">
                      {section.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700/50 hover:border-primary/30 transition-colors"
                        >
                          <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                          <span className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Subsections (Evaluation) */}
                  {section.subsections && (
                    <div className="grid gap-6">
                      {section.subsections.map((sub, sIndex) => (
                        <div
                          key={sIndex}
                          className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm"
                        >
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            {sub.heading}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify mb-4">
                            {sub.content}
                          </p>
                          {sub.details && (
                            <ul className="space-y-3 mt-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                              {sub.details.map((detail, dIndex) => (
                                <li
                                  key={dIndex}
                                  className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                                  <span className="text-justify">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Simple Content (Session) */}
                  {section.content && !section.subsections && (
                    <p className="text-xl font-medium text-primary dark:text-blue-300 leading-relaxed">
                      {section.content}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
