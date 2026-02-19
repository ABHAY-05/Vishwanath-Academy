"use client";

import { motion } from "framer-motion";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type Item = {
  name: string;
  href: string;
  target?: string;
};

type Section = {
  name: string;
  items: Item[];
};

export default function Navbar({ branch }: { branch?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getLink = (path: string) => {
    if (!path) return "#";
    // If it's already an absolute URL (like Cloudinary), return it as is
    if (path.startsWith("http")) return path;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return branch ? `/${branch}${cleanPath}` : cleanPath;
  };
  const ParentsLoginLink: Record<string, string> = {
    aashiana: "https://val.edunext4.com/Index",
    dhawapur: "https://vna.edunext4.com/Index",
  };

  const currentParentsLoginLink =
    ParentsLoginLink[branch as string] || ParentsLoginLink["aashiana"];

  const admissionLinks: Record<string, string> = {
    dhawapur: "https://forms.edunexttechnologies.com/forms/vna/application/",
    aashiana: "https://forms.edunexttechnologies.com/forms/val/application/",
  };

  const currentAdmissionLink =
    admissionLinks[branch as string] || admissionLinks["aashiana"];

  const menu: Section[] = [
    {
      name: "About Us",
      items: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/about/team" },
        { name: "Facilities", href: "/about/facilities" },
        { name: "Learning Beyond Classroom", href: "/about/beyond" },
        { name: "CBSE Mandatory Disclosure", href: "/about/cbse" },
      ],
    },
    {
      name: "Results",
      items: [
        { name: "Students with Scholarship", href: "/results/scholarship" },
        { name: "Board Exam Result", href: "/results/board-results" },
        { name: "School Awards", href: "/results/awards" },
      ],
    },
    {
      name: "Admissions",
      items: [
        {
          name: "Admission Enquiry",
          href: currentAdmissionLink,
          target: "_blank",
        },
        { name: "Fees Structure", href: "/admissions/fees" },
        {
          name: "School Prospectus",
          href: "/admissions/prospectus",
        },
        { name: "School Rules", href: "/admissions/rules" },
        { name: "School Uniform", href: "/admissions/uniform" },
        { name: "Subject Combination", href: "/admissions/subjects" },
        { name: "Admission Procedure", href: "/admissions/procedure" },
      ],
    },
    {
      name: "Academics",
      items: [
        { name: "Curriculum", href: "/academics/curriculum" },
        { name: "Books & Stationary", href: "/academics/books-and-stationary" },
        {
          name: "CBSE Circulars",
          href: "https://cbseacademic.nic.in//circulars.html",
          target: "_blank",
        },
        { name: "Activity Calendar", href: "/academics/calendar" },
        { name: "Competitive Exam Details", href: "/academics/competitive" },
      ],
    },
    {
      name: "Students Corner",
      items: [
        { name: "Yearly Academic Planner", href: "/students/planner" },
        { name: "Gallery", href: "/students/gallery" },
        { name: "Press Release", href: "/students/press" },
        {
          name: "Apply for Scholarship",
          href: "https://docs.google.com/forms/d/e/1FAIpQLScrfjlAw5JPZ45VUwtK9_cAZEQ5CWn116S1zLngfRsey4DWaw/viewform?usp=send_form",
          target: "_blank",
        },
      ],
    },
    {
      name: "Quick Links",
      items: [
        { name: "Notice Board", href: "/notice-board" },
        { name: "Download TC", href: "/download-tc" },
        { name: "VNA Chatbot", href: "/chatbot" },
      ],
    },
    {
      name: "Contact Us",
      items: [
        { name: "Contact Us", href: "/contact" },
        { name: "Career", href: "/contact/career" },
        { name: "B-Ed Training Application", href: "/contact/bed" },
        {
          name: "Feedback Form",
          href: "https://docs.google.com/forms/d/e/1FAIpQLSchtLqyI3eO9MieMghpMATG-xLA7K0BfLR8PvkI1Kq1KDkSQw/viewform",
          target: "_blank",
        },
      ],
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 shadow-xl bg-white dark:bg-gray-900 border-b border-primary/10">
        <div className="grid grid-cols-[220px_1fr] h-20">
          {/* LOGO STRIP */}
          <div className="bg-primary flex items-center pl-6 pr-4">
            <Link href="/">
              <Image
                src="/vna-logo.webp"
                alt="Vishwanath Academy"
                width={160}
                height={80}
                className="w-auto h-auto"
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </Link>
          </div>

          {/* NAV AREA */}
          <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 h-full flex items-center justify-end">
              {/* DESKTOP MENU */}
              <div className="hidden lg:flex flex-wrap items-center gap-6 max-[1209px]:gap-4 ml-auto max-[1145px]:gap-3 justify-end h-full py-2">
                <Link
                  href={branch ? `/${branch}` : "/"}
                  className="flex items-center gap-1 text-sm font-medium hover:text-primary dark:hover:text-secondary font-sans transition-colors"
                >
                  Home
                </Link>
                {menu.map((section) => (
                  <div key={section.name} className="relative group">
                    <button className="flex items-center gap-1 text-sm font-medium hover:text-primary dark:hover:text-secondary font-sans max-[1114px]:text-xs transition-colors">
                      {section.name}
                      <ChevronDown
                        size={14}
                        className="transition-transform duration-200 group-hover:rotate-180"
                      />
                    </button>

                    {/* DROPDOWN */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 top-full hidden min-w-64 rounded-md bg-white dark:bg-gray-800 shadow-xl group-hover:block border-t-2 border-primary"
                    >
                      {section.items.map((item) => (
                        <Link
                          key={item.name}
                          href={getLink(item.href)}
                          target={item.target}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary/5 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-secondary transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  </div>
                ))}

                {/* PARENTS LOGIN */}
                <Link
                  href={currentParentsLoginLink}
                  target="_blank"
                  className="flex items-center gap-1 text-sm font-semibold text-white bg-primary px-4 py-2 rounded-full hover:bg-secondary hover:text-black transition-all shadow-md"
                >
                  Parents Login
                </Link>

                {/* THEME TOGGLE */}
                {mounted && (
                  <button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="ml-2 rounded-full bg-gray-100 p-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
                    title="Toggle theme"
                  >
                    {theme === "dark" ? (
                      <Sun size={16} className="text-secondary" />
                    ) : (
                      <Moon size={16} className="text-primary" />
                    )}
                  </button>
                )}
              </div>

              {/* MOBILE BUTTON */}
              <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
                <Menu size={26} className="text-primary dark:text-secondary" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm ${
          mobileOpen ? "" : "hidden"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* MOBILE MENU */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-primary/10 dark:border-gray-800">
          <span className="font-display font-bold text-xl text-primary dark:text-secondary">
            Menu
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-secondary"
          >
            <X />
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-80px)]">
          <Link
            href={branch ? `/${branch}` : "/"}
            onClick={() => setMobileOpen(false)}
            className="block font-medium font-sans text-gray-800 dark:text-gray-200 hover:text-primary transition-colors"
          >
            Home
          </Link>
          {menu.map((section) => (
            <details key={section.name} className="group">
              <summary className="cursor-pointer font-medium font-san text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors flex items-center justify-between">
                {section.name}
                <ChevronDown
                  size={16}
                  className="transition-transform group-open:rotate-180"
                />
              </summary>
              <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-100 dark:border-gray-700 pl-4">
                {section.items.map((item) => (
                  <Link
                    key={item.name}
                    href={getLink(item.href)}
                    target={item.target}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm text-gray-700 dark:text-gray-300 hover:text-primary py-1"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </details>
          ))}

          <Link
            href={currentParentsLoginLink}
            target="_blank"
            onClick={() => setMobileOpen(false)}
            className="block text-center w-full rounded-full bg-primary text-white font-bold py-2 hover:bg-secondary hover:text-black transition-colors"
          >
            Parents Login
          </Link>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-full rounded-lg bg-gray-100 dark:bg-gray-800 p-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2"
              >
                {theme === "dark" ? (
                  <>
                    <Sun size={18} className="text-secondary" />
                    <span>Switch to Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={18} className="text-primary" />
                    <span>Switch to Dark Mode</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
