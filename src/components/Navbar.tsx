"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Item = {
  name: string;
  href?: string;
  target?: string;
  children?: Item[];
};

type Section = {
  name: string;
  items: Item[];
};

const menu: Section[] = [
  {
    name: "About Us",
    items: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/about/team" },
      { name: "Facilities", href: "/about/facilities" },
      { name: "Learning Beyond Classroom", href: "/about/beyond" },
      {
        name: "CBSE Mandatory Disclosure",
        children: [
          { name: "Aashiana Branch", href: "/cbse/asiana" },
          { name: "Dhawapur Branch", href: "/cbse/dhawapur" },
        ],
      },
    ],
  },
  {
    name: "Results",
    items: [
      { name: "Students with Scholarship", href: "/results/scholarship" },
      { name: "Board Exam Result", href: "/results/board" },
      { name: "School Awards", href: "/results/awards" },
    ],
  },
  {
    name: "Admissions",
    items: [
      {
        name: "Admission Enquiry",
        children: [
          {
            name: "Aashiana Branch",
            href: "https://forms.edunexttechnologies.com/forms/val/application/",
            target: "_blank",
          },
          {
            name: "Dhawapur Branch",
            href: "https://forms.edunexttechnologies.com/forms/vna/application/",
            target: "_blank",
          },
        ],
      },
      {
        name: "Fees Structure",
        children: [
          { name: "Aashiana Branch", href: "/admissions/fees/asiana" },
          { name: "Dhawapur Branch", href: "/admissions/fees/dhawapur" },
        ],
      },
      { name: "School Prospectus", href: "/admissions/prospectus" },
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
      {
        name: "Yearly Academic Planner",
        children: [
          { name: "Aashiana Branch", href: "/students/planner/asiana" },
          { name: "Dhawapur Branch", href: "/students/planner/dhawapur" },
        ],
      },
      { name: "Blog", href: "/students/blog" },
      { name: "Gallery", href: "/students/gallery" },
      { name: "Press Release", href: "/students/press" },
      { name: "Apply for Scholarship", href: "/students/scholarship" },
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
      { name: "Feedback Form", href: "/contact/feedback" },
    ],
  },
];

const parentsLogin: Item[] = [
  { name: "Aashiana Branch", href: "/parents-login/asiana" },
  { name: "Dhawapur Branch", href: "/parents-login/dhawapur" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      {/* NAVBAR */}
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
              <div className="hidden lg:flex items-center gap-6 max-[1209px]:gap-4 ml-auto max-[1145px]:gap-3">
                {menu.map((section) => (
                  <div key={section.name} className="relative group">
                    <button className="flex items-center gap-1 text-sm font-medium hover:text-primary dark:hover:text-secondary font-sans max-[1114px]:text-xs transition-colors">
                      {section.name}
                      <ChevronDown
                        size={14}
                        className="transition-transform duration-200 group-hover:rotate-180"
                      />
                    </button>

                    {/* FIRST LEVEL */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 top-full hidden min-w-64 rounded-md bg-white dark:bg-gray-800 shadow-xl group-hover:block border-t-2 border-primary"
                    >
                      {section.items.map((item) => (
                        <div key={item.name} className="relative group/item">
                          {item.children ? (
                            <>
                              <div className="flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-primary/5 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-secondary transition-colors">
                                {item.name}
                                <ChevronRight
                                  size={14}
                                  className="transition-transform duration-200 group-hover/item:rotate-180"
                                />
                              </div>

                              <div className="absolute left-full top-0 hidden min-w-56 rounded-md bg-white dark:bg-gray-800 shadow-xl group-hover/item:block border-t-2 border-primary">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.name}
                                    href={child.href!}
                                    target={child.target}
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary/5 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-secondary transition-colors"
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </div>
                            </>
                          ) : (
                            <Link
                              href={item.href!}
                              target={item.target}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary/5 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-secondary transition-colors"
                            >
                              {item.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  </div>
                ))}

                {/* PARENTS LOGIN */}
                <div className="relative group">
                  <button className="flex items-center gap-0 text-sm font-semibold text-white bg-primary px-4 py-2 rounded-full hover:bg-secondary hover:text-black transition-all shadow-md">
                    Parents Login
                    <ChevronDown size={14} />
                  </button>
                  <div className="absolute right-0 top-full hidden rounded-md bg-white dark:bg-gray-800 shadow-xl group-hover:block border-t-2 border-primary">
                    {parentsLogin.map((p) => (
                      <Link
                        key={p.name}
                        href={p.href!}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary/5 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-secondary transition-colors whitespace-nowrap"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* THEME TOGGLE */}
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="ml-2 rounded-full bg-gray-100 p-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
                  title="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun size={16} className="text-secondary" />
                  ) : (
                    <Moon size={16} className="text-primary" />
                  )}
                </button>
              </div>

              {/* MOBILE BUTTON */}
              <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
                <Menu size={26} className="text-primary" />
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
        <div className="flex items-center justify-between p-4 border-b border-primary/10">
          <span className="font-display font-bold text-xl text-primary">
            Menu
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-gray-500 hover:text-primary"
          >
            <X />
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-80px)]">
          {[...menu, { name: "Parents Login", items: parentsLogin }].map(
            (section) => (
              <details key={section.name} className="group">
                <summary className="cursor-pointer font-medium font-san text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors flex items-center justify-between">
                  {section.name}
                  <ChevronDown
                    size={16}
                    className="transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="ml-4 mt-2 space-y-2 border-l-2 border-gray-100 dark:border-gray-700 pl-4">
                  {section.items.map((item) =>
                    item.children ? (
                      <details key={item.name} className="group/sub">
                        <summary className="cursor-pointer text-sm text-gray-700 dark:text-gray-300 group-hover/sub:text-primary flex items-center justify-between">
                          {item.name}
                          <ChevronDown
                            size={14}
                            className="transition-transform group-open/sub:rotate-180"
                          />
                        </summary>
                        <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-100 dark:border-gray-700 pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href!}
                              target={child.target}
                              onClick={() => setMobileOpen(false)}
                              className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary py-1"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href!}
                        target={item.target}
                        onClick={() => setMobileOpen(false)}
                        className="block text-sm text-gray-700 dark:text-gray-300 hover:text-primary py-1"
                      >
                        {item.name}
                      </Link>
                    ),
                  )}
                </div>
              </details>
            ),
          )}

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
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
          </div>
        </div>
      </aside>
    </>
  );
}
