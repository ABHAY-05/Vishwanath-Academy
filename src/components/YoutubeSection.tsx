"use client";

import Image from "next/image";
import { useState } from "react";
import VideoModal from "./VideoModal";

const videos = [
  {
    title: "Aashiana Branch",
    thumbnail: "/aashiana.webp",
    videoId: "YQczJujBrbs",
  },
  {
    title: "Dhawapur Branch",
    thumbnail: "/dhawapur.webp",
    videoId: "s8DMBZLVzw4",
  },
];

export default function YoutubeSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      <section className="bg-[#EDE8E5] dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          {/* HEADER */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display text-gray-900 dark:text-white font-semibold mb-3">
              Youtube <span className="text-[#6B2C5E]">Video</span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 font-body max-w-2xl mx-auto">
              Explore Our School&apos;s Videos and Discover the Passion,
              Creativity, and Excellence.
            </p>
          </div>

          {/* VIDEOS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {videos.map((video) => (
              <div key={video.title}>
                <h3 className="mb-4 text-xl font-sans text-[#6B2C5E] dark:text-purple-300">
                  {video.title}
                </h3>

                <div
                  onClick={() => setActiveVideo(video.videoId)}
                  className="relative cursor-pointer overflow-hidden rounded-lg group border border-black/5 dark:border-white/10"
                >
                  {/* FIXED ASPECT RATIO */}
                  <div className="relative aspect-video w-full">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:bg-black/20 dark:group-hover:bg-black/30 transition" />

                  {/* PLAY BUTTON */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white text-2xl shadow-lg group-hover:scale-110 transition">
                      ▶
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      <VideoModal videoId={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}
