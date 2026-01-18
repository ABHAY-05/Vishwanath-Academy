"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about-section"
      className="bg-white dark:bg-gray-900 overflow-hidden relative"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* IMAGE - Now on Left with decorations */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/vishwanath-img2.jpg"
                alt="Why Vishwanath Academy"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority={false}
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary rounded-xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-xl -z-10" />
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <span className="text-primary dark:text-secondary font-semibold tracking-wider uppercase text-sm mb-2 block">
              About The Academy
            </span>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Why Choose <br />
              <span className="text-primary dark:text-secondary">
                Vishwanath Academy?
              </span>
            </h2>

            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed font-body">
              <p>
                We at Vishwanath Academy, focus our dedication towards evoking a
                passion for learning and developing the requisite set of
                attitudes, skills and knowledge that enable our learners to
                maximize their potential.
              </p>

              <blockquote className="border-l-4 border-primary dark:border-secondary pl-6 italic text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-r-xl">
                “We aspire to walk our learners down the road which leads them
                to develop a thirst for knowledge such that its discovery leads
                to the enrichment of life.”
              </blockquote>

              <p>
                We work towards developing an environment which fosters social
                accountability, national pride and a curiosity to trigger the
                mood for self-learning.
              </p>
            </div>

            <div className="pt-6">
              <a
                href="/about"
                className="text-primary dark:text-secondary font-semibold hover:text-secondary dark:hover:text-white transition-colors inline-flex items-center gap-2 group"
              >
                Learn More About Us
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
