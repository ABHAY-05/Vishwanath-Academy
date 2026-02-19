"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trophy, Eye } from "lucide-react";
import { useState } from "react";
import ImageModal from "@/components/ImageModal";

interface Student {
  _id: string;
  name: string;
  session: string;
  percentage: string;
  amount: string;
}

interface GalleryImage {
  _id: string;
  url: string;
  caption?: string;
}

interface Props {
  students: Student[];
  images: GalleryImage[];
  branch: string;
}

export default function ScholarshipContent({
  students,
  images,
  branch,
}: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  const sortedStudents = [...students].sort((a, b) => {
    const sessionDiff = b.session.localeCompare(a.session);
    if (sessionDiff !== 0) return sessionDiff;

    const pctA = parseFloat(a.percentage.replace("%", ""));
    const pctB = parseFloat(b.percentage.replace("%", ""));
    const pctDiff = pctB - pctA;
    if (pctDiff !== 0) return pctDiff;

    return a.name.localeCompare(b.name);
  });

  return (
    <main className="bg-white dark:bg-gray-950 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
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
              <Trophy size={14} className="inline mr-2" />
              Meritorious Students
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              Bright Child Scholarship
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto font-light leading-relaxed">
              Celebrating the academic excellence and dedication of our
              brightest young minds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Content & Wide Image */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 space-y-16">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
            Shri Markandey Tewari{" "}
            <span className="text-primary dark:text-secondary">
              {" "}
              Bright Child Scholarship
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            We believe in recognizing and nurturing talent. This scholarship is
            awarded to students who demonstrate exceptional academic performance
            and exemplary conduct.
          </p>
        </div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-800 w-full max-w-5xl"
          >
            <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-2xl transform group-hover:scale-[1.01] transition-transform duration-500 -z-10" />
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/scholarship.png"
                alt="Shri Markandey Tewari Bright Child Scholarship"
                fill
                className="object-contain bg-gray-50"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 space-y-20">
        {/* 2. Students Table */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                Award Recipients
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                List of students honoured for their outstanding performance.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                      Academic Session
                    </th>
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                      Percentage
                    </th>
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-right">
                      Scholarship Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {sortedStudents.length > 0 ? (
                    sortedStudents.map((student, idx) => {
                      const showSession =
                        idx === 0 ||
                        student.session !== sortedStudents[idx - 1].session;

                      return (
                        <motion.tr
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          key={student._id}
                          className="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                            {showSession ? student.session : ""}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 font-bold">
                            {student.name}
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-primary dark:text-secondary">
                            {student.percentage}
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-green-600 dark:text-green-400 text-right">
                            ₹{student.amount}
                          </td>
                        </motion.tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 3. Felicitation Ceremony (Latest 2 Images) */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                Felicitation Ceremony
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Glimpses of the award distribution ceremony.
              </p>
            </div>
            {images.length > 2 && (
              <Link
                href={`/${branch}/results/scholarship/gallery`}
                className="hidden md:flex items-center gap-2 px-6 py-2 bg-primary/10 text-primary dark:text-secondary rounded-full font-bold hover:bg-primary hover:text-white transition-all"
              >
                View Full Gallery <ArrowRight size={18} />
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {images.slice(0, 2).map((img, idx) => (
              <motion.div
                key={img._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-gray-100 dark:bg-gray-900"
                onClick={() => setSelectedImageIndex(idx)}
              >
                <Image
                  src={img.url}
                  alt={img.caption || "Felicitation Ceremony"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                    <Eye size={32} />
                  </div>
                </div>
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <p className="font-medium text-lg">{img.caption}</p>
                  </div>
                )}
              </motion.div>
            ))}

            {images.length === 0 && (
              <div className="col-span-2 py-12 text-center text-gray-500 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                No ceremony images uploaded yet.
              </div>
            )}
          </div>

          {images.length > 2 && (
            <div className="mt-8 flex justify-center md:hidden">
              <Link
                href={`/${branch}/results/scholarship/gallery`}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/30 hover:shadow-xl active:scale-95 transition-all w-full justify-center"
              >
                View Full Gallery <ArrowRight size={18} />
              </Link>
            </div>
          )}
        </section>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
        images={images.slice(0, 2).map((img) => img.url)}
        currentIndex={selectedImageIndex || 0}
        onNext={() =>
          setSelectedImageIndex((prev) =>
            prev === null ||
            prev === (images.length > 2 ? 1 : images.length - 1) // Limit to displayed images
              ? prev
              : prev + 1,
          )
        }
        onPrev={() =>
          setSelectedImageIndex((prev) =>
            prev === null || prev === 0 ? prev : prev - 1,
          )
        }
      />
    </main>
  );
}
