"use client";

import { schoolUniform } from "@/data/admissions-data";
import { motion } from "framer-motion";
import { Shirt, Ruler, Scissors, AlertCircle } from "lucide-react";

export default function UniformContent() {
  const { title, subtitle, columns, rows } = schoolUniform;

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
              Discipline & Identity
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
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800"
        >
          {/* Table Header */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 border-b border-gray-100 dark:border-gray-800 hidden md:grid grid-cols-12 gap-4">
            <div className="col-span-3 font-bold text-gray-400 uppercase tracking-wider text-sm">
              Class
            </div>
            <div className="col-span-9 grid grid-cols-2 gap-8">
              <div className="font-bold text-gray-400 uppercase tracking-wider text-sm flex items-center gap-2">
                <Shirt size={16} /> Boys
              </div>
              <div className="font-bold text-gray-400 uppercase tracking-wider text-sm flex items-center gap-2">
                <Scissors size={16} /> Girls
              </div>
            </div>
          </div>

          {/* Mobile View / Table Body */}
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {rows.map((row, index) => (
              <div
                key={index}
                className="group p-6 md:grid md:grid-cols-12 md:gap-4 hover:bg-blue-50/20 dark:hover:bg-gray-800/30 transition-colors"
              >
                {/* Class (Mobile Header) */}
                <div className="col-span-3 mb-4 md:mb-0">
                  <span className="inline-block px-4 py-2 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-300 font-bold border border-primary/10">
                    {row.class}
                  </span>
                </div>

                {/* Content Columns */}
                <div className="col-span-9 grid md:grid-cols-2 gap-8">
                  {/* Boys */}
                  <div className="space-y-2">
                    <h4 className="md:hidden font-bold text-gray-500 text-xs uppercase mb-2 flex items-center gap-2">
                      <Shirt size={14} /> Boys
                    </h4>
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed font-body">
                      {Array.isArray(row.boys) ? (
                        <ul className="space-y-3">
                          {row.boys.map((item, i) => (
                            <li
                              key={i}
                              className={`
                                                   ${item.includes("P.T.") ? "text-primary dark:text-secondary font-semibold bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700" : ""}
                                               `}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>{row.boys}</p>
                      )}
                    </div>
                  </div>

                  {/* Girls */}
                  <div className="space-y-2">
                    <h4 className="md:hidden font-bold text-gray-500 text-xs uppercase mb-2 mt-4 md:mt-0 flex items-center gap-2">
                      <Scissors size={14} /> Girls
                    </h4>
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed font-body">
                      {Array.isArray(row.girls) ? (
                        <ul className="space-y-3">
                          {row.girls.map((item, i) => (
                            <li
                              key={i}
                              className={`
                                                   ${item.includes("P.T.") ? "text-primary dark:text-secondary font-semibold bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700" : ""}
                                               `}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>{row.girls}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/30 flex items-start gap-4"
        >
          <AlertCircle className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-1">
              Important Note
            </h4>
            <p className="text-blue-800 dark:text-blue-200/80 text-sm leading-relaxed">
              Parents are requested to ensure their ward is always in proper
              uniform. Uniforms should be clean and ironed. Any deviation from
              the prescribed uniform will be viewed seriously.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
