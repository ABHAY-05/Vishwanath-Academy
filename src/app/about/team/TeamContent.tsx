"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Facebook, Linkedin, Twitter } from "lucide-react";

// Custom X Logo Component (Reuse)
const XLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

import { aboutData } from "@/data/about-data";

const teamMembers = aboutData.team;

export default function TeamPage() {
  return (
    <main className="bg-white dark:bg-gray-950 pb-20">
      {/* HERO SECTION */}
      <section className="relative h-[250px] md:h-[300px] flex items-center justify-center bg-[#FDF6E4] dark:bg-[#2A1B3D]">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-primary dark:text-white bg-white dark:bg-primary/20 px-8 py-3 rounded-full shadow-sm"
          >
            Our Team
          </motion.h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10 py-16 space-y-24">
        {teamMembers.map((member, index) => (
          <div key={member.id} id={member.id} className="scroll-mt-32">
            <div
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Column */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5 flex flex-col items-center"
              >
                <div className="relative w-full aspect-4/3 rounded-sm overflow-hidden shadow-lg border-8 border-white dark:border-gray-800 bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </div>

                <div className="mt-6 text-center">
                  <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white">
                    {member.name}
                  </h2>
                  <p className="text-sm font-body font-semibold text-gray-600 dark:text-gray-400 mt-1">
                    {member.title}
                  </p>

                  <div className="flex items-center justify-center gap-3 mt-4">
                    {member.socials.map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-white p-2 rounded hover:bg-primary/80 transition-colors"
                        aria-label={social.label}
                      >
                        {social.type === "facebook" && <Facebook size={20} />}
                        {social.type === "x" && <XLogo className="w-5 h-5" />}
                        {social.type === "linkedin" && <Linkedin size={20} />}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Content Column */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-7 space-y-6"
              >
                {member.content.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-gray-700 dark:text-gray-300 font-body leading-relaxed text-justify"
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            </div>
            {index !== teamMembers.length - 1 && (
              <div className="border-b border-gray-200 dark:border-gray-800 border-dashed mt-24" />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
