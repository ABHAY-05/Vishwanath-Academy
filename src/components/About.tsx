"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about-section" className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative h-80 sm:h-95 lg:h-105 rounded-lg overflow-hidden shadow-lg border-2 border-primary/20"
          >
            <Image
              src="/vishwanath-img2.jpg"
              alt="Why Vishwanath Academy"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority={false}
            />
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
              Why Vishwanath Academy?
            </h2>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
              We at Vishwanath Academy, focus our dedication towards evoking a
              passion for learning and developing the requisite set of
              attitudes, skills and knowledge that enable our learners to
              maximize their potential towards becoming positive, responsible
              and well informed participants in our democratic and rapidly
              progressing global community.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
              It is with this ambition that we work towards developing an
              environment which fosters social accountability, national pride
              and a curiosity to trigger the mood for self-learning through
              self-initiation.
            </p>

            <blockquote className="border-l-4 border-primary pl-4 italic text-gray-800 dark:text-gray-200 bg-primary/5 p-4 rounded-r-lg">
              “We aspire to walk our learners down the road which leads them to
              develop a thirst for knowledge such that its discovery leads to
              the enrichment of life for them as individuals and the community
              at large.”
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
