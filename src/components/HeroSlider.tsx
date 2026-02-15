"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";

const images = [
  {
    src: "/slider/slider-1.jpg",
    title: "Creating Learners for Life",
  },
  {
    src: "/slider/slider-2.jpg",
    title: "Excellence in Education",
  },
  {
    src: "/slider/slider-3.jpg",
    title: "Nurturing Future Leaders",
  },
  {
    src: "/slider/slider-4.jpg",
    title: "Nurturing Future Leaders",
  },
  {
    src: "/slider/slider-5.jpg",
    title: "Nurturing Future Leaders",
  },
  {
    src: "/slider/slider-6.jpg",
    title: "Nurturing Future Leaders",
  },
];

import { useParams } from "next/navigation";

export default function HeroSlider() {
  const params = useParams();
  const branch = params?.branch as string | undefined;
  const prefix = branch ? `/${branch}` : "";

  return (
    <section className="relative w-full h-[calc(100vh-5rem)] overflow-hidden">
      {/* BACKGROUND SLIDER */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectCreative, Pagination]}
          effect="creative"
          creativeEffect={{
            prev: {
              translate: ["-20%", 0, -1],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          loop
          pagination={{
            clickable: true,
            bulletActiveClass:
              "swiper-pagination-bullet-active !bg-secondary !w-8 rounded-full transition-all",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={1500}
          className="h-full w-full"
        >
          {images.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  priority={index === 0}
                  className="object-cover will-change-transform transform-gpu animate-kenburns"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* STATIC CONTENT OVERLAY */}
      <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
        <div className="mx-auto max-w-7xl w-full px-6">
          <div className="max-w-3xl space-y-6 pointer-events-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl lg:text-7xl font-sans font-bold text-white leading-tight"
            >
              Empowering Minds, <br />
              Shaping{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                Futures
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg lg:text-xl text-gray-200 font-body max-w-2xl leading-relaxed"
            >
              Where academic brilliance meets holistic development, empowering
              students to lead with confidence and character.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href={`${prefix}/admissions`}
                className="group relative px-8 py-4 bg-primary text-white font-semibold rounded-none overflow-hidden transition-all hover:bg-blue-900"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Admissions Open
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </a>

              <a
                href={`${prefix}/admissions/prospectus`}
                className="group px-8 py-4 bg-white text-primary font-semibold rounded-none transition-all hover:bg-gray-100 flex items-center gap-2"
              >
                Download Brochure
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-y-1"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
