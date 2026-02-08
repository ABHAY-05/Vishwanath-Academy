"use client";

import { BranchFeeData } from "@/data/admissions-data";
import { motion } from "framer-motion";
import {
  CreditCard,
  CheckCircle,
  Info,
  Calculator,
  FileText,
} from "lucide-react";

type Props = {
  data: BranchFeeData;
};

export default function FeesContent({ data }: Props) {
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
              Transparent & Affordable
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              Fee Structure
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto font-light leading-relaxed">
              {data.title} • {data.session}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 md:px-6 relative z-10 py-12 space-y-12">
        {/* PAYMENT ACTION */}
        {data.paymentLink && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <a
              href={data.paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-primary hover:from-blue-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Pay Fees Online</span>
              <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />
            </a>
          </motion.div>
        )}

        {/* FEE TABLE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-8 border-b border-gray-100 dark:border-gray-800 text-center">
            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-2">
              Student Fee Plan
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-3xl mx-auto">
              (School Fee Structure as per U.P. Govt. notification of U.P.
              Private Aided, Non-aided Independent School Fee Regulation
              Ordinance 2018)
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-blue-50/50 dark:bg-blue-900/10">
                  <th className="p-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider pl-8">
                    Class
                  </th>
                  <th className="p-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
                    Admission Fee
                    <div className="text-[10px] text-red-500 font-extrabold mt-1">
                      (New Admissions Only)
                    </div>
                  </th>
                  <th className="p-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
                    Exam Fee
                    <div className="text-[10px] font-normal mt-1">
                      [Jul/Nov]
                    </div>
                  </th>
                  <th className="p-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center pr-8">
                    Monthly Fee
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {data.feeRows.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-blue-50/30 dark:hover:bg-gray-800/30 transition-colors group"
                  >
                    <td className="p-5 pl-8 font-bold text-primary dark:text-blue-300 border-r border-gray-50 dark:border-gray-800/50">
                      {row.class}
                    </td>
                    <td className="p-5 text-center text-gray-700 dark:text-gray-300 font-medium border-r border-gray-50 dark:border-gray-800/50">
                      ₹ {row.admissionFee}
                    </td>
                    <td className="p-5 text-center text-gray-700 dark:text-gray-300 font-medium border-r border-gray-50 dark:border-gray-800/50">
                      ₹ {row.examFee}
                    </td>
                    <td className="p-5 pr-8 text-center font-bold text-gray-900 dark:text-white">
                      ₹ {row.monthlyFee}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* INFO GRIDS */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Extra Charges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
                <Calculator size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Additional Charges
              </h3>
            </div>
            <ul className="space-y-4">
              {data.extraFees.map((fee, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-gray-600 dark:text-gray-300 group"
                >
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                  <span>{fee}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Important Notes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-blue-50/50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-800/30"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-800/50 text-blue-600 dark:text-blue-300 rounded-xl">
                <Info size={24} />
              </div>
              <h3 className="text-xl font-bold text-blue-900 dark:text-white">
                Important Notes
              </h3>
            </div>
            <ul className="space-y-4">
              {data.notes.map((note, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-blue-800 dark:text-blue-200/80 text-sm leading-relaxed"
                >
                  <span className="font-bold min-w-[20px]">{idx + 1}.</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
