"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight, Moon, Sun, ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-500 flex flex-col items-center justify-center p-6">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-grid.svg')] bg-[length:40px_40px] opacity-[0.03] dark:opacity-[0.05]" />

        {/* Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px]"
        />
      </div>

      {/* THEME TOGGLE (Top Right) */}
      <div className="absolute top-6 right-6 z-50">
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-3 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-md shadow-lg border border-gray-200 dark:border-gray-700 text-primary dark:text-secondary hover:scale-110 transition-all duration-300"
            title="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        )}
      </div>

      <div className="max-w-7xl w-full relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* LEFT COLUMN: BRANDING & LEADERSHIP */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-10">
          {/* LOGO */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-20 dark:opacity-40 rounded-full" />
            <Image
              src="/vna-logo.webp"
              alt="Vishwanath Academy"
              width={320}
              height={120}
              className="relative z-10 drop-shadow-2xl dark:brightness-110 hidden dark:block"
              style={{ width: "auto", height: "auto" }}
              priority
            />
            <Image
              src="/vna-logo-light.webp" // Assuming a light version exists or reusing main if dark text
              alt="Vishwanath Academy"
              width={320}
              height={120}
              className="relative z-10 drop-shadow-xl dark:hidden block"
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </motion.div>

          {/* MESSAGE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 max-w-lg"
          >
            <h1 className="text-4xl lg:text-5xl font-display font-bold leading-tight">
              Shaping{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Future Leaders
              </span>{" "}
              with Excellence
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              "Education is key to unlocking the world, a passport to freedom.
              At Vishwanath Academy, we don't just teach; we inspire."
            </p>
          </motion.div>

          {/* FOUNDERS PROFILES - GRID CARDS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6 w-full max-w-lg"
          >
            {[
              {
                name: "Shri. Markandey Tewari",
                role: "Founder & Chairman",
                img: "/management/markandey-tewari.jpg",
              },
              {
                name: "Shri. Siddhartha Tewari",
                role: "Director",
                img: "/management/siddhartha-tewari.jpg",
              },
            ].map((person, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-4 bg-white/60 dark:bg-gray-800/60 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform duration-300 backdrop-blur-sm"
              >
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl flex-shrink-0">
                  <Image
                    src={person.img}
                    alt={person.name}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight mb-1">
                    {person.name}
                  </p>
                  <p className="text-xs text-primary dark:text-secondary font-medium tracking-wide uppercase">
                    {person.role}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT COLUMN: BRANCH SELECTION CARDS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full flex flex-col gap-6 p-8 lg:p-12 rounded-[2.5rem] bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-2xl relative"
        >
          {/* Decorative Sparkle */}
          <div className="absolute -top-6 -right-6 text-secondary animate-pulse hidden lg:block">
            <Sparkles size={48} />
          </div>

          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold font-display mb-2">
              Select Your Campus
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Choose a branch to explore
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/aashiana" className="group relative block w-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 group-hover:translate-x-1 transition-transform duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary dark:text-blue-300 group-hover:scale-110 transition-transform">
                    <span className="font-bold text-lg">AS</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-300 transition-colors">
                      Aashiana Campus
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Sector M, Aashiana, Lucknow
                    </p>
                  </div>
                </div>
                <ArrowRight className="text-gray-300 dark:text-gray-600 group-hover:text-primary dark:group-hover:text-secondary transition-colors" />
              </div>
            </Link>

            <Link href="/dhawapur" className="group relative block w-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-secondary rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 group-hover:translate-x-1 transition-transform duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300 group-hover:scale-110 transition-transform">
                    <span className="font-bold text-lg">DH</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                      Dhawapur Campus
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Near Memoura Airforce Station, Dhawapur, Lucknow
                    </p>
                  </div>
                </div>
                <ArrowRight className="text-gray-300 dark:text-gray-600 group-hover:text-primary dark:group-hover:text-secondary transition-colors" />
              </div>
            </Link>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            © Vishwanath Academy {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </main>
  );
}
