"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AnnouncementPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup has been seen in this session
    const hasSeenPopup = sessionStorage.getItem("vna_popup_seen");
    if (!hasSeenPopup) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    sessionStorage.setItem("vna_popup_seen", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <button
              onClick={closePopup}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition"
            >
              <X size={20} />
            </button>

            <div className="relative aspect-[4/3] w-full">
              {/* Placeholder image - user should replace with actual announcement later */}
              <Image
                src="/announcement-placeholder.jpg"
                alt="Important Announcement"
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback to a colored div if image fails
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement!.style.backgroundColor =
                    "#002147";
                  e.currentTarget.parentElement!.innerHTML =
                    '<div class="flex h-full items-center justify-center text-white text-2xl font-display font-bold p-8 text-center">Admissions Open for 2025-26<br><span class="text-lg font-san font-normal mt-2 block">Apply Now</span></div>';
                }}
              />
            </div>

            <div className="p-6 text-center">
              <h3 className="text-xl font-display font-bold text-primary mb-2">
                Admissions Open 2025-26
              </h3>
              <p className="text-gray-600 mb-6 font-san text-sm">
                Join Vishwanath Academy for a holistic educational journey.
                Apply now for the upcoming academic session.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={closePopup}
                  className="rounded-full border border-gray-300 px-6 py-2 text-sm font-medium hover:bg-gray-50 transition"
                >
                  Dismiss
                </button>
                <a
                  href="/admissions"
                  className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition shadow-lg shadow-blue-900/20"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
