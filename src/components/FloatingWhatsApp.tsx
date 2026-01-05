"use client";

import { MessageCircle, Send, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      name: "WhatsApp Account",
      number: "919169388348", // Aashiana default
      label: "Vishwanath Academy",
    },
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 font-san"
            >
              {/* Header */}
              <div className="bg-[#25D366] p-4 text-white relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">
                      Vishwanath Academy
                    </h3>
                    <p className="text-xs text-white/90">
                      Hi! Click one of our member below to chat on WhatsApp
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-[150px]">
                <div className="text-xs text-gray-400 text-center mb-4">
                  The team typically replies in a few minutes.
                </div>

                {contacts.map((contact, i) => (
                  <a
                    key={i}
                    href="https://api.whatsapp.com/send?phone=919169388348&text=Hello"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group"
                  >
                    <div className="bg-[#25D366] p-2 rounded-full text-white">
                      <MessageCircle size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                        {contact.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {contact.label}
                      </p>
                    </div>
                    <div className="text-gray-300 group-hover:text-[#25D366] transition-colors">
                      <Send size={18} />
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center w-14 h-14"
          aria-label="Chat on WhatsApp"
        >
          {isOpen ? <X size={28} /> : <MessageCircle size={32} />}
        </button>
      </div>
    </>
  );
}
