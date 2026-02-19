"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Facebook, Linkedin, User } from "lucide-react";

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

export default function TeamPage({ branch }: { branch: string }) {
  const filteredMembers = teamMembers
    .filter((member) => {
      if (
        member.title.includes("Founder") ||
        member.title.includes("Director")
      ) {
        return true;
      }

      const titleLower = member.title.toLowerCase();
      const branchLower = branch.toLowerCase();

      if (titleLower.includes("principal")) {
        const otherBranch =
          branchLower === "aashiana" ? "dhawapur" : "aashiana";
        if (titleLower.includes(otherBranch)) {
          return false;
        }
        return true;
      }

      return true;
    })
    .map((member) => ({
      ...member,
      title: member.title.replace(/\s*\(.*?\)\s*/g, "").trim(),
    }));

  return (
    <main className="bg-white dark:bg-gray-950 pb-20 overflow-hidden">
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-blue-900 dark:bg-gray-900">
          <div className="absolute inset-0 opacity-20 bg-[url('/pattern-grid.svg')] bg-repeat" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-black/80 dark:from-black/90 dark:to-blue-950/50" />

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
              Dedication & Excellence
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
              Our Team
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto font-light leading-relaxed">
              Meet the visionaries and educators guiding Vishwanath Academy
              towards excellence.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10 py-16 space-y-32">
        {filteredMembers.map((member, index) => (
          <div key={member.id} id={member.id} className="scroll-mt-32">
            <div
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Column */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className={`lg:col-span-5 flex flex-col items-center ${
                  index % 2 !== 0 ? "lg:order-last" : ""
                }`}
              >
                <div className="relative group w-full max-w-sm">
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 z-10">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  </div>

                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -z-10" />
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10" />
                </div>

                <div className="mt-8 text-center relative z-20 -mt-12 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 max-w-[85%] mx-auto">
                  <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h2>
                  <p className="text-sm font-bold text-primary dark:text-secondary uppercase tracking-wider mb-4">
                    {member.title}
                  </p>

                  <div className="flex items-center justify-center gap-3">
                    {member.socials.map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-black transition-all duration-300"
                        aria-label={social.label}
                      >
                        {social.type === "facebook" && <Facebook size={18} />}
                        {social.type === "x" && <XLogo className="w-4 h-4" />}
                        {social.type === "linkedin" && <Linkedin size={18} />}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Content Column */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-7 space-y-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
                  <span className="text-lg font-semibold text-gray-400 uppercase tracking-widest">
                    Biography
                  </span>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  {member.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-gray-600 dark:text-gray-300 font-body leading-relaxed text-lg text-justify"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>
            {index !== filteredMembers.length - 1 && (
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent mt-32" />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
