"use client";

import { admissionProcedure } from "@/data/admissions-data";
import { motion } from "framer-motion";

export default function ProcedureContent() {
  const { title, subtitle, intro, sections } = admissionProcedure;

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

      <div className="mx-auto max-w-5xl px-4 md:px-6 relative z-10 py-12 space-y-12">
        {/* INTRO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary/5 dark:bg-primary/10 p-6 rounded-xl border border-primary/20"
        >
          <p className="text-lg text-gray-800 dark:text-gray-200 font-medium text-center">
            {intro}
          </p>
        </motion.div>

        {/* SECTIONS */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold font-display text-primary dark:text-white border-b-2 border-secondary inline-block pr-6 pb-2">
                {section.title}
              </h2>

              {section.description && (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {section.description}
                </p>
              )}

              {/* List Items */}
              {section.items && (
                <ul className="space-y-4">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Subsections */}
              {section.subsections && (
                <div className="space-y-8 pl-4 border-l-2 border-gray-200 dark:border-gray-800 ml-2">
                  {section.subsections.map((sub, sIndex) => (
                    <div key={sIndex} className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        {sub.heading}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                        {sub.content}
                      </p>
                      {sub.details && (
                        <ul className="space-y-3 mt-3">
                          {sub.details.map((detail, dIndex) => (
                            <li
                              key={dIndex}
                              className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                            >
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/50 flex-shrink-0" />
                              <span className="text-justify">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Simple Content */}
              {section.content && !section.subsections && (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {section.content}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
