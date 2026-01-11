"use client";

import { academicsData } from "@/data/academics-data";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CurriculumContent() {
  const { title, intro, objectives, levels } = academicsData.curriculum;

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
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10 py-12 space-y-20">
        {/* INTRO SECTION */}
        {/* MAIN TEXT CONTENT */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Intro Paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed text-justify"
          >
            <p>{intro[0]}</p>
            <p>{intro[1]}</p>
          </motion.div>

          {/* Lead-in & Objectives List */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl font-display font-bold text-primary dark:text-secondary"
            >
              {intro[2]}
            </motion.h3>

            <ul className="space-y-4">
              {objectives.map((obj, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 items-start group"
                >
                  {/* Custom Bullet */}
                  <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-secondary ring-4 ring-secondary/20 group-hover:bg-primary transition-colors" />

                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                    {obj}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* LEVELS (Primary, Junior, Senior) */}
        <div className="space-y-24">
          {levels.map((level, index) => {
            const isImageLeft = index % 2 === 0; // Even index (0, 2) -> Image Left (Primary, Senior)
            // Odd index (1) -> Image Right (Junior) of the text (so text is left)

            return (
              <div
                key={level.id}
                className={`flex flex-col gap-12 items-center ${
                  isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* IMAGE */}
                <motion.div
                  initial={{ opacity: 0, x: isImageLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-full md:w-1/2 flex justify-center"
                >
                  <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white dark:border-gray-800">
                    <Image
                      src={level.image}
                      alt={level.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
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
                  <div
                    className={`inline-block px-6 py-2 rounded-full bg-primary text-white font-display font-bold text-xl shadow-md ${
                      !isImageLeft ? "md:mr-auto" : ""
                    }`}
                  >
                    {level.title}
                  </div>
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
