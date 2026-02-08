"use client";

import { competitiveExams } from "@/data/academics-data";
import {
  Search,
  GraduationCap,
  MapPin,
  Globe,
  CheckCircle2,
  Award,
  BookOpen,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface ExamDetailItem {
  name: string;
  purpose?: string;
  eligibility?: string;
  description?: string;
  applicationMode?: string;
  website?: string;
  list?: string[];
  linkList?: { label: string; url: string }[];
}

export default function CompetitiveContent() {
  const { title, intro, table, details, footer } = competitiveExams;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTable = table
    .map((group) => {
      const isStreamMatch = group.stream
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (isStreamMatch) {
        return group;
      }

      return {
        ...group,
        exams: group.exams.filter((exam) =>
          exam.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      };
    })
    .filter((group) => group.exams.length > 0);

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
              Career Guidance
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto font-light leading-relaxed">
              Mapping your future beyond school
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 space-y-20 relative z-10">
        {/* INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-6 text-center"
        >
          {intro.map((para, idx) => (
            <p
              key={idx}
              className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
            >
              {para}
            </p>
          ))}
        </motion.div>

        {/* SEARCH & TABLE SECTION */}
        <section>
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="p-8 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display">
                  Exam Directory
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Quick lookup by exam name (e.g., JEE, NEET)
                </p>
              </div>
              <div className="relative w-full md:w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search exams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-primary/5 dark:bg-primary/10 border-b border-primary/10">
                    <th className="p-6 font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-sm w-1/3">
                      Stream / Category
                    </th>
                    <th className="p-6 font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-sm w-2/3">
                      Available Exams
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredTable.length > 0 ? (
                    filteredTable.map((group, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-blue-50/20 dark:hover:bg-gray-800/30 transition-colors"
                      >
                        <td className="p-6 align-top">
                          <span className="font-bold text-primary dark:text-white bg-primary/10 dark:bg-primary/20 px-4 py-1.5 rounded-full text-sm inline-block">
                            {group.stream}
                          </span>
                        </td>
                        <td className="p-6">
                          <div className="flex flex-wrap gap-2">
                            {group.exams.map((exam, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300"
                              >
                                {exam}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={2}
                        className="p-12 text-center text-gray-500 italic"
                      >
                        No exams found matching "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* DETAILS SECTION */}
        <section className="space-y-20">
          {details.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100 dark:border-gray-800 relative overflow-hidden"
            >
              {/* Decorative Background Icon */}
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                <Award size={200} />
              </div>

              <div className="flex items-center gap-6 mb-10 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center flex-shrink-0 text-secondary">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-display text-gray-900 dark:text-white">
                  {category.category}
                </h2>
              </div>

              <div className="grid gap-8 md:grid-cols-2 relative z-10">
                {category.items.map((rawItem, i) => {
                  const item = rawItem as ExamDetailItem;
                  return (
                    <div
                      key={i}
                      className="bg-gray-50 dark:bg-gray-950 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-colors group flex flex-col h-full"
                    >
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary dark:group-hover:text-blue-300 transition-colors">
                        {item.name}
                      </h3>

                      <div className="space-y-4 flex-grow">
                        {item.purpose && (
                          <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                              Purpose
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                              {item.purpose}
                            </p>
                          </div>
                        )}
                        {item.eligibility && (
                          <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                              Eligibility
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                              {item.eligibility}
                            </p>
                          </div>
                        )}
                        {item.description && (
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        )}

                        {(item.list || item.linkList) && (
                          <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 text-sm space-y-2">
                            {item.list?.map((li, liIdx) => (
                              <div key={liIdx} className="flex gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-400">
                                  {li}
                                </span>
                              </div>
                            ))}
                            {item.linkList?.map((link, lkIdx) => (
                              <div key={lkIdx} className="flex flex-wrap gap-1">
                                <span className="font-semibold text-gray-700 dark:text-gray-300">
                                  {link.label}:
                                </span>
                                <a
                                  href={`https://${link.url}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary dark:text-blue-400 hover:underline"
                                >
                                  {link.url}
                                </a>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4">
                        {item.applicationMode && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-200/50 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-400">
                            <CheckCircle2 size={12} /> {item.applicationMode}
                          </span>
                        )}
                        {item.website && (
                          <a
                            href={`https://${item.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-bold text-primary dark:text-blue-400 hover:text-secondary dark:hover:text-blue-300 transition-colors flex items-center gap-1 ml-auto"
                          >
                            <Globe size={14} /> Visit Website
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </section>

        {/* FOOTER ADVICE SECTIONS */}
        <section className="space-y-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/10 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-8 md:p-12 text-center"
          >
            <p className="text-xl md:text-2xl font-serif italic text-primary dark:text-white leading-relaxed max-w-4xl mx-auto">
              "{footer.text}"
            </p>
          </motion.div>

          {footer.mainSections.map((section, idx) => (
            <div key={idx} className="space-y-8">
              <div className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl">
                <h3 className="text-2xl md:text-3xl font-bold font-display text-gray-900 dark:text-white mb-6">
                  {section.title}
                </h3>
                {section.content && (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap mb-10 text-lg">
                    {section.content}
                  </p>
                )}

                {section.subSections && (
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {section.subSections.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-gray-50 dark:bg-gray-950 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
                      >
                        <h4 className="text-lg font-bold text-primary dark:text-white mb-4 flex items-start gap-2">
                          <BookOpen className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-75" />
                          {sub.title}
                        </h4>
                        {sub.content && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                            {sub.content}
                          </p>
                        )}
                        {sub.list && (
                          <div className="flex flex-wrap gap-2">
                            {sub.list.map((tag, t) => (
                              <span
                                key={t}
                                className="px-2.5 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md text-xs font-bold text-gray-600 dark:text-gray-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {footer.finalNote && (
            <div className="bg-primary text-white rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-10" />
              <p className="text-lg md:text-xl font-medium leading-relaxed whitespace-pre-wrap relative z-10 max-w-4xl mx-auto">
                {footer.finalNote}
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
