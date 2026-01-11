"use client";

import { schoolRules } from "@/data/admissions-data";
import { motion } from "framer-motion";
import Image from "next/image";

export default function RulesContent() {
  const { title, image, sections } = schoolRules;

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
            className="text-3xl md:text-5xl font-display font-bold text-primary dark:text-white bg-white dark:bg-primary/20 px-8 py-3 rounded-full shadow-sm"
          >
            {title}
          </motion.h1>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 md:px-6 relative z-10 py-12 space-y-12">
        {/* FEATURED IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full aspect-video md:aspect-[2/1] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
            priority
          />
        </motion.div>

        {/* CONTENT SECTIONS */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold font-display text-primary dark:text-white border-b-2 border-secondary inline-block pr-6 pb-2">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.content.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 + idx * 0.02 }}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300 font-body leading-relaxed text-justify"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>
      </div>
    </main>
  );
}
