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
      <section className="bg-blue-50/20 dark:bg-gray-900 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* HEADER */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display text-gray-900 dark:text-white font-bold mb-4">
              Youtube{" "}
              <span className="text-primary dark:text-secondary">
                Video Gallery
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-body max-w-2xl mx-auto">
              Explore Our School&apos;s Videos and Discover the Passion,
              Creativity, and Excellence using media.
            </p>
          </div>

          {/* VIDEOS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {videos.map((video) => (
              <div key={video.title} className="group">
                <h3 className="mb-4 text-xl font-sans font-semibold text-gray-800 dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors pl-1 border-l-4 border-secondary">
                  {video.title}
                </h3>

                <div
                  onClick={() => setActiveVideo(video.videoId)}
                  className="relative cursor-pointer overflow-hidden rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 group-hover:shadow-2xl transition-all duration-300"
                >
                  {/* FIXED ASPECT RATIO */}
                  <div className="relative aspect-video w-full">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

                  {/* PLAY BUTTON */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/40 text-white text-3xl shadow-xl group-hover:scale-110 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
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
