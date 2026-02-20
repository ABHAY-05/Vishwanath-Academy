"use client";

import { Search, FileText, Calendar, Filter, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, notFound } from "next/navigation";
import { getActivityCalendarSections } from "@/actions/activityCalendar";

interface CalendarEventData {
  month: string;
  activity: string;
  pdfUrl: string | null;
  pdfPublicId: string | null;
}

interface ActivityCalendarSectionData {
  _id: string;
  className: string;
  events: CalendarEventData[];
}

type CalendarGroupProps = {
  section: ActivityCalendarSectionData;
  index: number;
};

const CalendarGroup = ({ section, index }: CalendarGroupProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = section.events.filter(
    (event) =>
      event.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.activity.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden mb-16"
    >
      {/* HEADER & SEARCH */}
      <div className="p-8 md:p-10 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-6 justify-between items-center bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-blue-500/20 text-primary dark:text-blue-300 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
              Class: {section.className}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Academic Year Plan
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search month or activity..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-sm transition-all shadow-sm group-hover:shadow-md"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-primary/5 dark:bg-primary/10 border-b border-primary/10">
              <th className="p-6 font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-sm w-1/4 pl-10">
                Month
              </th>
              <th className="p-6 font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-sm w-2/4">
                Activities & Events
              </th>
              <th className="p-6 font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center text-sm w-1/4 pr-10">
                Resource
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            <AnimatePresence>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-blue-50/30 dark:hover:bg-gray-800/30 transition-colors group"
                  >
                    <td className="p-6 pl-10 align-top">
                      <span className="inline-block px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm border border-gray-200 dark:border-gray-700">
                        {event.month}
                      </span>
                    </td>
                    <td className="p-6 align-middle text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                      {event.activity}
                    </td>
                    <td className="p-6 pr-10 text-center align-middle">
                      {event.pdfUrl ? (
                        <a
                          href={event.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 transition-all text-sm font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        >
                          <FileText className="w-4 h-4" />
                          Download
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-gray-400 dark:bg-gray-800/50 dark:text-gray-600 cursor-not-allowed text-sm font-bold border border-gray-100 dark:border-gray-800">
                          <FileText className="w-4 h-4" />
                          N/A
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="p-12 text-center text-gray-400 italic"
                  >
                    No activities found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default function CalendarContent() {
  const params = useParams();
  const branchKey = params.branch as "aashiana" | "dhawapur";

  const [sections, setSections] = useState<ActivityCalendarSectionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  if (!branchKey) {
    notFound();
  }

  useEffect(() => {
    async function fetchDocs() {
      setIsLoading(true);
      const res = await getActivityCalendarSections();
      if (res.success && res.data) {
        setSections(res.data);
      }
      setIsLoading(false);
    }
    fetchDocs();
  }, []);

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
              Yearly Schedule
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              Activity Calendar
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto font-light leading-relaxed">
              Explore the monthly activities & events schedule
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 md:px-6 relative z-10 py-12">
        {isLoading ? (
          <div className="flex justify-center py-32">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : sections.length > 0 ? (
          sections.map((section, index) => (
            <CalendarGroup key={section._id} section={section} index={index} />
          ))
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm mt-8">
            <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-2">
              No Calendar Data Available
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              The administration has not yet published the activity calendar for
              this branch. Please check back later.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
