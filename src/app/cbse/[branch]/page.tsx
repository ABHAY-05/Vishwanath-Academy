"use client";

import { motion } from "framer-motion";
import { Search, FileText, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useParams, notFound } from "next/navigation";
import { useState, useMemo } from "react";
import { cbseData, SectionData, LinkCell } from "@/data/cbse-data";

// Helper to check if a cell is a LinkCell
const isLinkCell = (cell: unknown): cell is LinkCell => {
  return (
    typeof cell === "object" &&
    cell !== null &&
    (cell as LinkCell).type === "link"
  );
};

// --- Disclosure Table Component ---
function DisclosureTable({ section }: { section: SectionData }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filter rows based on search
  const filteredRows = useMemo(() => {
    if (!searchQuery) return section.rows;
    return section.rows.filter((row) =>
      row.data.some((val) => {
        const textToSearch = isLinkCell(val) ? val.label : String(val);
        return textToSearch.toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [section.rows, searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page on search
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 mb-12"
    >
      {/* Header & Search */}
      <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800 bg-primary text-white flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl md:text-2xl font-display font-bold">
          {section.title}
        </h2>
        <div className="relative w-full md:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary/50 shadow-inner"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              {section.headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider font-san whitespace-nowrap"
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
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  {row.data.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 font-body first:font-medium first:text-gray-900 first:dark:text-gray-100"
                    >
                      {isLinkCell(cell) ? (
                        <a
                          href={cell.url}
                          // Open in new tab if it's external, or standard navigation if internal.
                          // For dummy hash links, typical behavior.
                          target={
                            cell.url.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            cell.url.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors group"
                        >
                          {cell.label === "View" ? (
                            <Eye size={16} />
                          ) : (
                            <FileText size={16} />
                          )}
                          <span className="group-hover:underline">
                            {cell.label}
                          </span>
                        </a>
                      ) : (
                        <div className="whitespace-pre-line">
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
        <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-t border-yellow-100 dark:border-yellow-800/50 text-sm text-yellow-800 dark:text-yellow-200">
          <p className="font-bold mb-2">NOTE:</p>
          <p className="opacity-90 leading-relaxed">
            THE SCHOOLS NEEDS TO UPLOAD THE SELF ATTESTED COPIES OF ABOVE LISTED
            DOCUMENTS BY CHAIRMAN/MANAGER/SECRETARY AND PRINCIPAL. IN CASE, IT
            IS NOTICED AT LATER STAGE THAT UPLOADED DOCUMENTS ARE NOT GENUINE
            THEN SCHOOL SHALL BE LIABLE FOR ACTION AS PER NORMS.
          </p>
        </div>
      )}
    </motion.div>
  );
}

// --- Main Page Component ---
export default function CBSEDisclosurePage() {
  const params = useParams();
  const branchKey = params.branch as string;

  // Validate branch
  const sections =
    branchKey === "asiana"
      ? cbseData.asiana
      : branchKey === "dhawapur"
      ? cbseData.dhawapur
      : null;

  if (!sections) {
    notFound();
  }

  const branchName = branchKey === "asiana" ? "Aashiana" : "Dhawapur";

  return (
    <main className="bg-white dark:bg-gray-950 pb-20">
      {/* Hero */}
      <section className="relative h-[250px] flex items-center justify-center bg-[#FDF6E4] dark:bg-[#2A1B3D] mb-16">
        <div className="text-center relative z-10">
          <div className="inline-block px-4 py-1 mb-4 rounded-full bg-secondary/20 text-secondary-foreground font-bold text-sm tracking-wider uppercase">
            Mandatory Public Disclosure
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-display font-bold text-primary dark:text-white bg-white dark:bg-primary/20 px-8 py-4 rounded-full shadow-sm"
          >
            CBSE Disclosure{" "}
            <span className="text-secondary text-2xl md:text-4xl">
              ({branchName})
            </span>
          </motion.h1>
        </div>
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {sections.map((section, idx) => (
          <DisclosureTable key={idx} section={section} />
        ))}
      </div>
    </main>
  );
}
