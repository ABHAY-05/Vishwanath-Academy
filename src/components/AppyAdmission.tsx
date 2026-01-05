"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ApplyAdmission() {
  return (
    <section className="bg-[#EDE8E5] dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 max-lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl lg:text-4xl mb-4 text-gray-900 dark:text-white font-semibold">
              Apply for Admission
            </h2>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 font-body">
              We don&apos;t just give students an education and experiences that
              set them up for success in a career. We help them succeed in their
              career—to discover a field they&apos;re passionate about and dare
              to lead it.
            </p>

            <Link
              href="/admissions"
              className="inline-block rounded-md bg-[#6B2C5E] px-6 py-3 text-sm font-sans font-semibold text-white hover:bg-[#5a244f] transition"
            >
              Apply Now
            </Link>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative h-70 sm:h-85 lg:h-100 overflow-hidden"
          >
            <Image
              src="/admission.jpg"
              alt="Apply for Admission at Vishwanath Academy"
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
