"use client";

import { subjectCombination } from "@/data/admissions-data";
import { motion } from "framer-motion";

export default function SubjectsContent() {
  const { title, subtitle, streams } = subjectCombination;

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

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10 py-12">
        <div className="grid gap-12">
          {streams.map((stream, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800"
            >
              <div className="bg-primary px-6 py-4 border-b-4 border-yellow-400">
                <h2 className="text-2xl font-bold font-display text-white uppercase tracking-wider">
                  {stream.name}
                </h2>
              </div>

              <div className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50 text-sm uppercase text-gray-500 dark:text-gray-400">
                        <th className="p-4 font-bold border-b border-gray-100 dark:border-gray-800 w-1/4">
                          Group
                        </th>
                        <th className="p-4 font-bold border-b border-gray-100 dark:border-gray-800 w-1/3">
                          Compulsory Subjects
                        </th>
                        <th className="p-4 font-bold border-b border-gray-100 dark:border-gray-800">
                          Elective Subjects (Select One)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {stream.groups.map((group, gIndex) => (
                        <tr
                          key={gIndex}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                        >
                          <td className="p-6 font-bold text-primary dark:text-secondary border-r border-gray-100 dark:border-gray-800">
                            {group.name ? (
                              <span className="inline-block px-3 py-1 rounded-md bg-primary/10 dark:bg-primary/20">
                                {group.name}
                              </span>
                            ) : (
                              <span className="text-gray-400 italic">
                                General
                              </span>
                            )}
                          </td>
                          <td className="p-6 border-r border-gray-100 dark:border-gray-800">
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
                                      className="px-3 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-sm font-semibold rounded-full border border-yellow-100 dark:border-yellow-800"
                                    >
                                      {sub.trim()}
                                    </span>
                                  ))}
                              </div>
                            ) : (
                              <p className="text-gray-800 dark:text-gray-200 font-medium p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg inline-block">
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
