"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function ImageModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNext,
  onPrev,
}: Props) {
  const [zoom, setZoom] = useState(1);
  const [initialDistance, setInitialDistance] = useState<number | null>(null);
  const [initialZoom, setInitialZoom] = useState<number>(1);
  const currentImage = images[currentIndex];

  // Reset zoom when image changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
    }
  }, [isOpen, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(z + 0.5, 3));
      if (e.key === "-") setZoom((z) => Math.max(z - 0.5, 1));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onNext, onPrev, onClose]);

  if (!currentImage) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
            onClick={onClose}
          >
            <X size={24} />
          </button>

          {/* Navigation Buttons */}
          <button
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[60] disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={(e) => {
              e.stopPropagation();
              onPrev?.();
            }}
            disabled={images.length <= 1}
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <button
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[60] disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={(e) => {
              e.stopPropagation();
              onNext?.();
            }}
            disabled={images.length <= 1}
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2 z-50">
            <button
              className="p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setZoom((z) => Math.max(z - 0.5, 1));
              }}
            >
              <Minus size={20} />
            </button>
            <span className="text-white/70 text-sm flex items-center min-w-[3ch] justify-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              className="p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setZoom((z) => Math.min(z + 0.5, 3));
              }}
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Image Container */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center p-4 md:p-12 touch-none"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              if (e.touches.length === 2) {
                const dist = Math.hypot(
                  e.touches[0].clientX - e.touches[1].clientX,
                  e.touches[0].clientY - e.touches[1].clientY,
                );
                setInitialDistance(dist);
                setInitialZoom(zoom);
              }
            }}
            onTouchMove={(e) => {
              if (e.touches.length === 2 && initialDistance !== null) {
                const dist = Math.hypot(
                  e.touches[0].clientX - e.touches[1].clientX,
                  e.touches[0].clientY - e.touches[1].clientY,
                );
                const scale = dist / initialDistance;
                setZoom(Math.min(Math.max(initialZoom * scale, 1), 4));
              }
            }}
            onTouchEnd={() => {
              setInitialDistance(null);
            }}
          >
            <motion.div
              animate={{ scale: zoom }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full h-full flex items-center justify-center"
              drag
              dragConstraints={{
                left: -200,
                right: 200,
                top: -200,
                bottom: 200,
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={currentImage}
                  alt="Gallery Image"
                  fill
                  className="object-contain"
                  priority
                  draggable={false}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
