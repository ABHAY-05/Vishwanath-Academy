"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ApplyAdmission() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const branches = [
    {
      name: "Aashiana Campus",
      url: "https://forms.edunexttechnologies.com/forms/val/application/",
    },
    {
      name: "Dhawapur Campus",
      url: "https://forms.edunexttechnologies.com/forms/vna/application/",
    },
  ];

  return (
    <>
      <section className="bg-blue-50/30 dark:bg-gray-800 py-16 lg:py-24 relative overflow-hidden">
        {/* Decorative Blob */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:bg-secondary/10 dark:text-secondary font-semibold text-sm mb-6">
                Join Our Family
              </div>
              <h2 className="text-3xl lg:text-5xl mb-6 text-gray-900 dark:text-white font-display font-bold leading-tight">
                Apply for{" "}
                <span className="text-primary dark:text-secondary">
                  Admission
                </span>
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8 font-body">
                We don&apos;t just give students an education and experiences
                that set them up for success in a career. We help them succeed
                in their career—to discover a field they&apos;re passionate
                about and dare to lead it.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-sans font-semibold text-white hover:bg-secondary hover:text-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Start Application
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group"
            >
              <Image
                src="/admission.jpg"
                alt="Apply for Admission at Vishwanath Academy"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ADMISSION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-gray-100 dark:border-gray-800"
              >
                {/* Modal Header */}
                <div className="relative p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                    Select Campus
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Please upload your application for the specific campus you
                    wish to apply to to proceed with your admission enquiry.
                  </p>
                  {branches.map((branch) => (
                    <a
                      key={branch.name}
                      href={branch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-secondary hover:bg-blue-50/50 dark:hover:bg-gray-800 transition-all group"
                    >
                      <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-secondary">
                        {branch.name}
                      </span>
                      <ExternalLink
                        size={18}
                        className="text-gray-400 group-hover:text-primary dark:group-hover:text-secondary transition-colors"
                      />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
