"use client";

import { schoolUniform } from "@/data/admissions-data";
import { motion } from "framer-motion";

export default function UniformContent() {
  const { title, subtitle, columns, rows } = schoolUniform;

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
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-primary text-white text-lg">
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      className={`p-6 font-bold font-display uppercase tracking-wider ${
                        index === 0 ? "w-1/4" : "w-auto"
                      } border-b-4 border-yellow-400`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {rows.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    {/* Class Column */}
                    <td className="p-6 align-top bg-gray-50 dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800">
                      <span className="inline-block px-4 py-2 rounded-full bg-white dark:bg-gray-800 border-2 border-primary/20 text-primary dark:text-white font-bold text-center w-full shadow-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                        {row.class}
                      </span>
                    </td>

                    {/* Boys Column */}
                    <td className="p-6 align-top border-r border-gray-100 dark:border-gray-800">
                      {row.boys ? (
                        Array.isArray(row.boys) ? (
                          <ul className="space-y-3">
                            {row.boys.map((item, i) => (
                              <li
                                key={i}
                                className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed"
                              >
                                {item.startsWith("P.T. Uniform") ? (
                                  <span className="block mt-2 pt-2 border-t border-dashed border-gray-300 dark:border-gray-700 text-primary dark:text-secondary font-bold">
                                    {item}
                                  </span>
                                ) : (
                                  item
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                            {row.boys}
                          </p>
                        )
                      ) : (
                        <span className="text-gray-400 italic">
                          No specific update
                        </span>
                      )}
                    </td>

                    {/* Girls Column */}
                    <td className="p-6 align-top">
                      {row.girls ? (
                        Array.isArray(row.girls) ? (
                          <ul className="space-y-3">
                            {row.girls.map((item, i) => (
                              <li
                                key={i}
                                className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed"
                              >
                                {item.startsWith("P.T. Uniform") ? (
                                  <span className="block mt-2 pt-2 border-t border-dashed border-gray-300 dark:border-gray-700 text-primary dark:text-secondary font-bold">
                                    {item}
                                  </span>
                                ) : (
                                  item
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                            {row.girls}
                          </p>
                        )
                      ) : (
                        <span className="text-gray-400 italic">
                          No specific update
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* NOTE SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-400 p-4 rounded-r-lg"
        >
          <p className="text-sm text-yellow-800 dark:text-yellow-200 italic font-semibold">
            Note: Parents are requested to ensure their ward is always in proper
            uniform. Uniforms should be clean and ironed.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
