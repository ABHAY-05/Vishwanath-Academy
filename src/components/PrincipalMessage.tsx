"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

type PrincipalData = {
  name: string;
  role: string;
  image: string;
  message: string;
};

const principals: Record<string, PrincipalData> = {
  aashiana: {
    name: "Ms. (Dr.) Charu Khare",
    role: "Sr. Principal",
    image: "/management/charu-khare.jpg",
    message:
      "Education is a shared commitment between dedicated teachers, motivated students, and enthusiastic parents with high expectations. At Vishwanath Academy Aashiana, we strive to provide an environment where every child is encouraged to explore their potential and achieve their dreams.",
  },
  dhawapur: {
    name: "Ms. Chhaya Joshi",
    role: "Principal",
    image: "/management/chhaya-joshi.jpg",
    message:
      "Our mission at Dhawapur branch is to empower students with knowledge and character. We believe in nurturing not just academic excellence but also the moral and social values that will guide our students to become responsible global citizens.",
  },
};

export default function PrincipalMessage({ branch }: { branch: string }) {
  const isAashiana = branch.includes("aashiana");
  const key = isAashiana ? "aashiana" : "dhawapur";
  const data = principals[key] || principals["aashiana"];

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800">
              <Image
                src={data.image}
                alt={data.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-0.5 w-12 bg-secondary" />
              <span className="text-secondary font-bold uppercase tracking-wider text-sm">
                Leadership
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Principal's{" "}
              <span className="text-primary dark:text-secondary">Message</span>
            </h2>

            <div className="relative">
              <Quote className="absolute -top-6 -left-4 text-primary/10 dark:text-white/5 w-24 h-24 transform -scale-x-100" />
              <blockquote className="relative z-10 text-lg text-gray-600 dark:text-gray-300 italic font-body leading-relaxed mb-8">
                "{data.message}"
              </blockquote>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white font-display">
                {data.name}
              </h3>
              <p className="text-primary dark:text-secondary font-medium">
                {data.role}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
