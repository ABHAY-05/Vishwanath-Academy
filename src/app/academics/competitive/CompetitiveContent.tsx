"use client";

import { competitiveExams } from "@/data/academics-data";
import { Search, GraduationCap } from "lucide-react";
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
          exam.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      };
    })
    .filter((group) => group.exams.length > 0);

  return (
    <main className="bg-white dark:bg-gray-950 pb-20">
      {/* HERO SECTION */}
      <section className="relative h-[300px] md:h-[350px] flex items-center justify-center bg-[#FDF6E4] dark:bg-[#2A1B3D] overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className="text-center relative z-10 max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary dark:text-secondary text-sm font-semibold mb-4">
              Career Guidance
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-primary dark:text-white mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose your path wisely. Explore the best competitive exams to
              shape your future.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        {/* INTRO */}
        <div className="max-w-4xl mx-auto mb-16 space-y-4 text-justify">
          {intro.map((para, idx) => (
            <p
              key={idx}
              className="text-gray-700 dark:text-gray-300 leading-relaxed md:text-lg"
            >
              {para}
            </p>
          ))}
        </div>

        {/* SEARCH & TABLE SECTION */}
        <section className="mb-20">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display">
                  Exam Directory
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Search by exam name (e.g., JEE, NEET, NIFT)
                </p>
              </div>
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                    <th className="p-6 font-bold text-primary dark:text-secondary w-1/3">
                      STREAM
                    </th>
                    <th className="p-6 font-bold text-primary dark:text-secondary w-2/3">
                      EXAM
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredTable.length > 0 ? (
                    filteredTable.map((group, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                      >
                        <td className="p-6 align-top">
                          <span className="font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg text-sm inline-block">
                            {group.stream}
                          </span>
                        </td>
                        <td className="p-6">
                          <ul className="space-y-3">
                            {group.exams.map((exam, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                              >
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                <span>{exam}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={2}
                        className="p-12 text-center text-gray-500"
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
        <section className="mb-20 space-y-12">
          {details.map((category, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-display text-gray-900 dark:text-white">
                  {category.category}
                </h2>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {category.items.map((rawItem, i) => {
                  const item = rawItem as ExamDetailItem;
                  return (
                    <div
                      key={i}
                      className="bg-gray-50 dark:bg-gray-950 p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary/30 transition-colors"
                    >
                      <h3 className="text-xl font-bold text-primary dark:text-secondary mb-3">
                        {item.name}
                      </h3>
                      {item.purpose && (
                        <div className="mb-3">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Purpose
                          </span>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-1">
                            {item.purpose}
                          </p>
                        </div>
                      )}
                      {item.eligibility && (
                        <div className="mb-3">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Eligibility
                          </span>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-1">
                            {item.eligibility}
                          </p>
                        </div>
                      )}
                      {item.description && (
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                          {item.description}
                        </p>
                      )}
                      {item.list && (
                        <ul className="mb-4 space-y-1">
                          {item.list.map((li, lil) => (
                            <li
                              key={lil}
                              className="text-sm text-gray-600 dark:text-gray-400 pl-3 border-l-2 border-primary/20"
                            >
                              {li}
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.linkList && (
                        <ul className="mb-4 space-y-2">
                          {item.linkList.map((link, lkIdx) => (
                            <li
                              key={lkIdx}
                              className="text-sm pl-3 border-l-2 border-primary/20"
                            >
                              <span className="text-gray-600 dark:text-gray-400 font-medium">
                                {link.label}:{" "}
                              </span>
                              <a
                                href={`https://${link.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-secondary underline decoration-primary/30 hover:decoration-secondary transition-colors"
                              >
                                {link.url}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                        {item.applicationMode && (
                          <div>
                            <span className="text-xs text-gray-400 block mb-0.5">
                              Mode
                            </span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.applicationMode}
                            </span>
                          </div>
                        )}
                        {item.website && (
                          <div className="ml-auto">
                            <a
                              href={`https://${item.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm font-bold text-primary hover:text-secondary transition-colors"
                            >
                              {item.website}
                              <span className="ml-1">→</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* FOOTER ADVICE SECTIONS */}
        <section className="mx-auto space-y-12">
          <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 md:p-12 text-center">
            <p className="text-lg md:text-xl font-medium text-primary dark:text-white leading-relaxed">
              {footer.text}
            </p>
          </div>

          <div className="space-y-16">
            {footer.mainSections.map((section, idx) => (
              <div key={idx} className="space-y-8">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-primary dark:text-white mb-6">
                    {section.title}
                  </h3>
                  {section.content && (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap mb-8">
                      {section.content}
                    </p>
                  )}

                  {section.subSections && (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {section.subSections.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-gray-50 dark:bg-gray-950 p-6 rounded-xl border border-gray-200 dark:border-gray-800"
                        >
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                            {sub.title}
                          </h4>
                          {sub.content && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed overflow-hidden">
                              {sub.content}
                            </p>
                          )}
                          {sub.list && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {sub.list.map((tag, t) => (
                                <span
                                  key={t}
                                  className="px-2 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-xs font-medium text-primary dark:text-gray-300"
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
              <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 md:p-12 text-center border border-primary/10">
                <p className="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {footer.finalNote}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
