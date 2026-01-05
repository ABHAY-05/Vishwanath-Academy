"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const management = [
  {
    name: "Shri. Markandey Tewari",
    role: "Founder & Chairman",
    image: "/management/markandey-tewari.webp",
    id: "markandey-tewari",
  },
  {
    name: "Shri. Siddhartha Tewari",
    role: "Director",
    image: "/management/siddhartha-tewari.webp",
    id: "siddhartha-tewari",
  },
  {
    name: "Ms. (Dr.) Charu Khare",
    role: "Sr. Principal - Aashiana Branch",
    image: "/management/charu-khare.webp",
    id: "charu-khare",
  },
  {
    name: "Ms. Chhaya Joshi",
    role: "Principal - Dhawapur Branch",
    image: "/management/chhaya-joshi.webp",
    id: "chhaya-joshi",
  },
];

export default function OurManagement() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl text-gray-900 dark:text-white font-display mb-4">
            Our <span className="text-primary">Management</span>
          </h2>

          <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 italic font-body text-lg">
            <span className="text-primary text-2xl mr-2">“</span>
            Art of Teaching is the Art of Assisting Discovery.
            <span className="text-primary text-2xl ml-2">”</span>
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {management.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="relative w-full aspect-4/5 mb-4 overflow-hidden rounded-lg border bg-white group shadow-sm hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {/* View Profile Overlay */}
                <Link
                  href={`/about/team#${person.id}`}
                  className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <div className="text-white flex items-center gap-2 font-display font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Profile <ExternalLink size={18} />
                  </div>
                </Link>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">
                {person.name}
              </h3>
              <p className="text-primary font-medium text-sm font-body">
                {person.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
