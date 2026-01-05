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
    subtitle: "Empowering students with knowledge, character, and vision.",
  },
  {
    src: "/slider/slider-2.jpg",
    title: "Excellence in Education",
    subtitle: "State-of-the-art facilities for holistic development.",
  },
  {
    src: "/slider/slider-3.jpg",
    title: "Nurturing Future Leaders",
    subtitle: "A legacy of academic brilliance.",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative w-full h-[60vh] lg:h-[85vh]">
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
        speed={1200} // Increased speed for smoother transition feel
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
                className="object-cover will-change-transform transform-gpu"
                sizes="100vw"
              />

              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

              {/* Text Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto max-w-7xl w-full px-6">
                  <div className="max-w-2xl space-y-4">
                    <motion.h2
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="text-4xl lg:text-7xl font-display font-bold text-white leading-tight"
                    >
                      {item.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                      className="text-lg lg:text-2xl text-gray-200 font-body"
                    >
                      {item.subtitle}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    >
                      <button
                        onClick={() => {
                          const aboutSection =
                            document.getElementById("about-section");
                          aboutSection?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="mt-6 rounded-full bg-primary hover:bg-white hover:text-black border-2 border-transparent hover:border-white px-8 py-3 text-white font-semibold transition-all shadow-lg hover:shadow-white/20"
                      >
                        Explore More
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
