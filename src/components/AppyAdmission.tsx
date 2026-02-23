"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function ApplyAdmission() {
  const pathname = usePathname();

  const getAdmissionUrl = () => {
    if (pathname.includes("dhawapur")) {
      return "https://forms.edunexttechnologies.com/forms/vna/application/";
    }
    return "https://forms.edunexttechnologies.com/forms/val/application/";
  };

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
        <div className="absolute top-0 right-0 w-[450px] md:w-[600px] h-[450px] md:h-[600px] bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />

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
              <h2 className="text-2xl lg:text-5xl mb-6 text-gray-900 dark:text-white font-display font-bold leading-tight">
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

              <a
                href={getAdmissionUrl()}
                target="_blank"
                rel="noopener noreferrer"
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
              </a>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="relative h-[300px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group"
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
    </>
  );
}
