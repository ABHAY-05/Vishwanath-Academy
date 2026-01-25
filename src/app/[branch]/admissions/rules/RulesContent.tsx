"use client";

import { schoolRules } from "@/data/admissions-data";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Scale,
  Info,
  Clock,
  AlertTriangle,
  Wallet,
  BookOpen,
} from "lucide-react";

export default function RulesContent() {
  const { title, image, sections } = schoolRules;

  // Icon mapping helper
  const getIcon = (title: string) => {
    if (title.includes("House")) return BookOpen;
    if (title.includes("Diary")) return Info;
    if (title.includes("Attendance") || title.includes("Arrival")) return Clock;
    if (title.includes("Withdrawals") || title.includes("Instructions"))
      return AlertTriangle;
    if (title.includes("Fee")) return Wallet;
    return Scale;
  };

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
              Code of Conduct
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              {title}
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 md:px-6 relative z-10 py-12 space-y-16">
        {/* FEATURED IMAGE with Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full aspect-video md:aspect-[2.5/1] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
            <p className="text-white/90 text-lg font-light max-w-2xl italic">
              "Discipline is the bridge between goals and accomplishment."
            </p>
          </div>
        </motion.div>

        {/* CONTENT SECTIONS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => {
            const Icon = getIcon(section.title);
            return (
              <motion.section
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow ${index === sections.length - 1 ? "md:col-span-2" : ""}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-primary/5 dark:bg-gray-800 text-primary dark:text-secondary">
                    <Icon size={24} />
                  </div>
                  <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>

                <ul className="space-y-4">
                  {section.content.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-600 dark:text-gray-300 font-body leading-relaxed text-justify group"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 group-hover:scale-150 transition-transform" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
