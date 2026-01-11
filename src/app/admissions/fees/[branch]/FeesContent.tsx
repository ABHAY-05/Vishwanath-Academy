"use client";

import { BranchFeeData } from "@/data/admissions-data";
import { motion } from "framer-motion";

type Props = {
  data: BranchFeeData;
};

export default function FeesContent({ data }: Props) {
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
            className="text-3xl md:text-5xl font-display font-bold text-primary dark:text-white bg-white dark:bg-primary/20 px-8 py-3 rounded-full shadow-sm"
          >
            Fees Structure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-primary/80 dark:text-gray-300 font-semibold"
          >
            {data.title}
          </motion.p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 md:px-6 relative z-10 py-12 space-y-12">
        {/* ACTION BUTTONS */}
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
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              <span>Direct Fees Payment Link</span>
            </a>
          </motion.div>
        )}

        {/* FEE TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
        >
          <div className="bg-yellow-400 text-black py-4 text-center">
            <h2 className="text-xl md:text-2xl font-bold font-display uppercase">
              {data.title}
            </h2>
            <p className="text-sm md:text-base font-semibold opacity-90">
              STUDENT FEE PLAN ({data.session})
            </p>
            <p className="text-[10px] md:text-xs mt-1 max-w-3xl mx-auto px-2 leading-tight opacity-80">
              (School Fee Structure as per U.P. Govt. notification of U.P.
              Private Aided, Non-aided Independent School (Fee Regulation)
              Ordinance -2018 No.1891/79-B-1-18-1(K)10/18 Dated 12th Sept. 2018)
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-yellow-300 text-black text-sm uppercase tracking-wider">
                  <th className="p-4 border-b border-yellow-400 font-bold text-center">
                    Class
                  </th>
                  <th className="p-4 border-b border-yellow-400 font-bold text-center">
                    Admission Fee
                    <br />
                    <span className="text-[10px] normal-case text-red-600 font-extrabold">
                      (ONLY FROM NEW ADMISSIONS)
                    </span>
                  </th>
                  <th className="p-4 border-b border-yellow-400 font-bold text-center">
                    Exam Fee
                    <br />
                    <span className="text-[10px] normal-case">[Jul/Nov]</span>
                  </th>
                  <th className="p-4 border-b border-yellow-400 font-bold text-center">
                    Monthly Fee
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-medium text-gray-800 dark:text-gray-200">
                {data.feeRows.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
                  >
                    <td className="p-4 text-center border-r border-gray-100 dark:border-gray-800 font-bold text-primary dark:text-white">
                      {row.class}
                    </td>
                    <td className="p-4 text-center border-r border-gray-100 dark:border-gray-800">
                      {row.admissionFee}
                    </td>
                    <td className="p-4 text-center border-r border-gray-100 dark:border-gray-800">
                      {row.examFee}
                    </td>
                    <td className="p-4 text-center font-bold">
                      {row.monthlyFee}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* EXTRA CHARGES & NOTES */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800"
          >
            <h3 className="text-lg font-bold text-primary dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-secondary rounded-full"></span>
              Additional Charges
            </h3>
            <ul className="space-y-3">
              {data.extraFees.map((fee, idx) => (
                <li
                  key={idx}
                  className="text-gray-700 dark:text-gray-300 text-sm flex items-start gap-2"
                >
                  <span className="text-secondary mt-1">●</span>
                  {fee}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800"
          >
            <h3 className="text-lg font-bold text-primary dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-secondary rounded-full"></span>
              Important Notes
            </h3>
            <ul className="space-y-3">
              {data.notes.map((note, idx) => (
                <li
                  key={idx}
                  className="text-gray-700 dark:text-gray-300 text-sm flex items-start gap-2"
                >
                  <span className="font-bold min-w-4 text-primary">
                    {idx + 1}.
                  </span>
                  {note}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
