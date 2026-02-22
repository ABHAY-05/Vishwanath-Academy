"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { IBlog } from "@/lib/models/Blog";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import { ClientDate } from "@/components/ui/ClientDate";

export function MainNewsCarousel({ blogs }: { blogs: IBlog[] }) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  if (!blogs || blogs.length === 0) {
    return (
      <div className="w-full h-[400px] md:h-[500px] bg-gray-50 dark:bg-neutral-950 border border-gray-100 dark:border-neutral-800 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-600 transition-colors">
        No news articles yet.
      </div>
    );
  }

  return (
    <div className="relative group rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-sm border border-gray-100 dark:border-neutral-800 transition-colors">
      {/* Header Controls */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-neutral-800">
        <h2 className="text-lg font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 border-b-2 border-primary dark:border-secondary pb-1 inline-block">
          MAIN NEWS
        </h2>
        <div className="flex gap-1 z-10">
          <button
            ref={prevRef}
            className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-primary dark:hover:bg-primary hover:text-white disabled:opacity-50 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            ref={nextRef}
            className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-primary dark:hover:bg-primary hover:text-white disabled:opacity-50 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        effect="fade"
        speed={800}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={blogs.length > 1}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className="w-full h-[400px] md:h-[500px]"
      >
        {blogs.map((blog) => (
          <SwiperSlide key={String(blog._id)}>
            <div className="relative w-full h-full z-10 bg-black">
              <Image
                src={blog.thumbnail.url}
                alt={blog.title}
                fill
                className="object-cover opacity-90"
                priority
              />
              {/* Overlay with a strong gradient to hide previous slide text during fade and improve contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent flex flex-col justify-end p-6 md:p-8 z-20">
                <div className="flex flex-wrap gap-2 mb-3">
                  {blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-gray-900/80 dark:bg-black/60 backdrop-blur-md text-white border border-white/10 text-xs font-bold uppercase rounded-sm z-30 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/${blog.slug}`} className="z-30 group/link">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 line-clamp-3 group-hover/link:text-secondary transition-colors leading-tight drop-shadow-md">
                    {blog.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-4 text-sm text-gray-200 z-30 font-medium">
                  <div className="flex items-center gap-1.5 text-white">
                    <User size={14} />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5 drop-shadow-sm">
                    <Clock size={14} />
                    <ClientDate date={blog.createdAt} />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
