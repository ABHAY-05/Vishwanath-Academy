"use client";

import { activityCalendar } from "@/data/academics-data";
import { Search, FileText } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

type CalendarEvent = {
  month: string;
  activity: string;
  pdfUrl?: string;
};

type CalendarGroupProps = {
  group: {
    className: string;
    events: CalendarEvent[];
  };
  index: number;
};

const CalendarGroup = ({ group, index }: CalendarGroupProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = group.events.filter(
    (event) =>
      event.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.activity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mb-12"
    >
      {/* HEADER & SEARCH */}
      <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50 dark:bg-gray-800/50">
        <h2 className="text-2xl font-bold font-display text-primary dark:text-white">
          Class: {group.className}
        </h2>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 dark:bg-primary/10 border-b border-primary/10">
              <th className="p-4 md:p-6 font-semibold text-primary dark:text-secondary w-1/4">
                MONTH
              </th>
              <th className="p-4 md:p-6 font-semibold text-primary dark:text-secondary w-2/4">
                ACTIVITIES
              </th>
              <th className="p-4 md:p-6 font-semibold text-primary dark:text-secondary w-1/4 text-center">
                DOWNLOAD
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                >
                  <td className="p-4 md:p-6 text-gray-800 dark:text-gray-200 font-medium">
                    {event.month}
                  </td>
                  <td className="p-4 md:p-6 text-gray-600 dark:text-gray-400">
                    {event.activity}
                  </td>
                  <td className="p-4 md:p-6 text-center">
                    {event.pdfUrl ? (
                      <a
                        href={event.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 transition-colors text-sm font-medium group-hover:shadow-sm"
                      >
                        <FileText className="w-4 h-4" />
                        PDF
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed text-sm font-medium">
                        <FileText className="w-4 h-4" />
                        PDF
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-400">
                  No activities found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default function CalendarContent() {
  const { title, subtitle, groups } = activityCalendar;

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

      <div className="mx-auto max-w-5xl px-4 md:px-6 relative z-10 py-12">
        {groups.map((group, index) => (
          <CalendarGroup key={index} group={group} index={index} />
        ))}
      </div>
    </main>
  );
}
