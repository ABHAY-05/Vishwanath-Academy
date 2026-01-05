"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  videoId: string | null;
  onClose: () => void;
};

export default function VideoModal({ videoId, onClose }: Props) {
  if (!videoId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      {/* BACKDROP */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* MODAL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 w-full max-w-4xl bg-black rounded-lg overflow-hidden"
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 rounded-full bg-black/70 p-2 text-white hover:bg-black"
        >
          <X size={18} />
        </button>

        {/* VIDEO */}
        <div className="relative aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
