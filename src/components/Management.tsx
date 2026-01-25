"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const managementData = [
  {
    name: "Shri. Markandey Tewari",
    role: "Founder & Chairman",
    image: "/management/markandey-tewari.jpg",
    id: "markandey-tewari",
    branch: "all",
  },
  {
    name: "Shri. Siddhartha Tewari",
    role: "Director",
    image: "/management/siddhartha-tewari.jpg",
    id: "siddhartha-tewari",
    branch: "all",
  },
  {
    name: "Ms. (Dr.) Charu Khare",
    role: "Sr. Principal",
    image: "/management/charu-khare.jpg",
    id: "charu-khare",
    branch: "aashiana",
  },
  {
    name: "Ms. Chhaya Joshi",
    role: "Principal",
    image: "/management/chhaya-joshi.jpg",
    id: "chhaya-joshi",
    branch: "dhawapur",
  },
];

export default function OurManagement({ branch }: { branch?: string }) {
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredManagement = managementData.filter(
    (person) =>
      person.branch === "all" ||
      (branch && person.branch === branch) ||
      (!branch && true),
  );

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl text-gray-900 dark:text-white font-display mb-4">
            Our{" "}
            <span className="text-primary dark:text-secondary">Management</span>
          </h2>

          <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 italic font-body text-lg">
            <span className="text-primary dark:text-secondary text-2xl mr-2">
              “
            </span>
            Art of Teaching is the Art of Assisting Discovery.
            <span className="text-primary dark:text-secondary text-2xl ml-2">
              ”
            </span>
          </p>
        </div>

        {/* MOBILE & TABLET SLIDER (< 1280px) */}
        <div className="block xl:hidden">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={slidesPerView}
            className="pb-4"
          >
            {[...filteredManagement, ...filteredManagement].map(
              (person, index) => (
                <SwiperSlide key={`${person.name}-${index}`}>
                  <Link
                    href={`/${branch || "aashiana"}/about/team#${person.id}`}
                    className="block h-full"
                  >
                    <div className="text-center h-full">
                      <div className="relative w-full aspect-4/5 mb-4 overflow-hidden rounded-lg border bg-white shadow-md">
                        <Image
                          src={person.image}
                          alt={person.name}
                          fill
                          sizes="(max-width: 1280px) 100vw"
                          className="object-cover object-top"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">
                        {person.name}
                      </h3>
                      <p className="text-primary dark:text-secondary font-medium text-sm font-body">
                        {person.role}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ),
            )}
          </Swiper>
        </div>

        {/* DESKTOP GRID (>= 1280px) */}
        <div className="hidden xl:grid grid-cols-3 md:grid-cols-3 gap-8 justify-center">
          {filteredManagement.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="relative w-full aspect-4/5 mb-6 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <Link
                    href={`/${branch || "aashiana"}/about/team#${person.id}`}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white hover:text-primary transition-all font-medium transform translate-y-4 group-hover:translate-y-0 duration-300"
                  >
                    View Profile <ExternalLink size={16} />
                  </Link>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white font-display mb-1 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                {person.name}
              </h3>
              <p className="text-secondary font-medium text-sm font-sans tracking-wide uppercase">
                {person.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
