"use client";

import { motion } from "framer-motion";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  ShieldCheck,
  Download,
} from "lucide-react";
import { useParams, notFound } from "next/navigation";
import { useState, useMemo } from "react";
import { cbseData, SectionData, LinkCell } from "@/data/cbse-data";

const isLinkCell = (cell: unknown): cell is LinkCell => {
  return (
    typeof cell === "object" &&
    cell !== null &&
    (cell as LinkCell).type === "link"
  );
};

function DisclosureTable({ section }: { section: SectionData }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const filteredRows = useMemo(() => {
    if (!searchQuery) return section.rows;
    return section.rows.filter((row) =>
      row.data.some((val) => {
        const textToSearch = isLinkCell(val) ? val.label : String(val);
        return textToSearch.toLowerCase().includes(searchQuery.toLowerCase());
      }),
    );
  }, [section.rows, searchQuery]);

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 mb-12"
    >
      {/* Header & Search */}
      <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="text-primary hidden md:block" />
            {section.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Official disclosure documents and data
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full text-gray-900 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 dark:bg-primary/10 border-b border-primary/10">
              {section.headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-6 py-5 text-xs font-bold text-primary dark:text-secondary uppercase tracking-wider font-san whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors group"
                >
                  {row.data.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 font-body first:font-medium first:text-gray-900 first:dark:text-gray-100"
                    >
                      {isLinkCell(cell) ? (
                        <a
                          href={cell.url}
                          target={
                            cell.url.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            cell.url.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 dark:bg-blue-900/30 text-primary dark:text-blue-300 font-bold hover:bg-primary hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all text-xs uppercase tracking-wide"
                        >
                          {cell.label === "View" ? (
                            <Eye size={14} />
                          ) : (
                            <Download size={14} />
                          )}
                          <span>{cell.label}</span>
                        </a>
                      ) : (
                        <div className="whitespace-pre-line leading-relaxed">
                          {String(cell)}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={section.headers.length}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No results found matching "{searchQuery}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full font-bold text-sm transition-all ${
                  currentPage === page
                    ? "bg-primary text-white shadow-lg scale-110"
                    : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary/20"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Conditional Note Rendering */}
      {section.showNote && (
        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-100 dark:border-blue-800/50 text-sm text-blue-800 dark:text-blue-200">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 mt-0.5">
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className="font-bold mb-1">Important Compliance Note:</p>
              <p className="opacity-90 leading-relaxed text-justify">
                THE SCHOOLS NEEDS TO UPLOAD THE SELF ATTESTED COPIES OF ABOVE
                LISTED DOCUMENTS BY CHAIRMAN/MANAGER/SECRETARY AND PRINCIPAL. IN
                CASE, IT IS NOTICED AT LATER STAGE THAT UPLOADED DOCUMENTS ARE
                NOT GENUINE THEN SCHOOL SHALL BE LIABLE FOR ACTION AS PER NORMS.
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// --- Main Client Component ---
export default function CBSEContent() {
  const params = useParams();
  const branchKey = params.branch as string;

  // Validate branch
  const isAashiana = branchKey === "aashiana";

  const sections = isAashiana
    ? cbseData.aashiana
    : branchKey === "dhawapur"
      ? cbseData.dhawapur
      : null;

  if (!sections) {
    notFound();
  }

  const branchName = isAashiana ? "Aashiana" : "Dhawapur";

  return (
    <main className="bg-white dark:bg-gray-950 pb-20 overflow-hidden">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden mb-16">
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

        <div className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 mb-6 rounded-full bg-white/10 backdrop-blur border border-white/20 text-blue-100 font-bold text-sm tracking-wider uppercase">
              Transparency & Accountability
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
              CBSE Disclosure
            </h1>
            <p className="text-xl md:text-2xl text-secondary font-light">
              {branchName} Campus
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        {sections.map((section, idx) => (
          <DisclosureTable key={idx} section={section} />
        ))}
      </div>
    </main>
  );
}
