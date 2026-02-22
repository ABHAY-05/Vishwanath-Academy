"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Newspaper,
  Menu,
  X,
  LogOut,
  Trophy,
  FileText,
  Award,
  Briefcase,
  CalendarDays,
  BookOpen,
  Images,
  FileKey,
  FileBadge,
  Calendar,
  ShieldCheck,
  Sun,
  Moon,
  Rss,
} from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAdmin } from "@/components/AdminContext";
import { useTheme } from "next-themes";

interface AdminSidebarProps {
  branch: string;
  username: string;
}

export default function AdminSidebar({ branch, username }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const { role, permissions } = useAdmin();

  let navItems = [
    {
      name: "Dashboard",
      href: `/${branch}/admin`,
      icon: LayoutDashboard,
      id: "dashboard",
    },
    {
      name: "Notice Board",
      href: `/${branch}/admin/notices`,
      icon: ClipboardList,
      id: "notices",
    },
    {
      name: "Blogs",
      href: `/${branch}/admin/blogs`,
      icon: Rss,
      id: "blogs",
    },
    {
      name: "Gallery",
      href: `/${branch}/admin/gallery`,
      icon: Images,
      id: "gallery",
    },
    {
      name: "Press Release",
      href: `/${branch}/admin/press`,
      icon: Newspaper,
      id: "press",
    },
    {
      name: "Scholarship",
      href: `/${branch}/admin/scholarship`,
      icon: Trophy,
      id: "scholarship",
    },
    {
      name: "Board Results",
      href: `/${branch}/admin/board-results`,
      icon: FileText,
      id: "board-results",
    },
    {
      name: "School Awards",
      href: `/${branch}/admin/school-awards`,
      icon: Award,
      id: "school-awards",
    },
    {
      name: "School Prospectus",
      href: `/${branch}/admin/prospectus`,
      icon: FileBadge,
      id: "prospectus",
    },
    {
      name: "Download TC",
      href: `/${branch}/admin/tc`,
      icon: FileKey,
      id: "tc",
    },
    {
      name: "Career Hiring",
      href: `/${branch}/admin/career-hiring`,
      icon: Briefcase,
      id: "career-hiring",
    },
    {
      name: "Academic Planner",
      href: `/${branch}/admin/academic-planner`,
      icon: CalendarDays,
      id: "academic-planner",
    },
    {
      name: "Books & Stationary",
      href: `/${branch}/admin/books`,
      icon: BookOpen,
      id: "books",
    },
    {
      name: "Activity Calendar",
      href: `/${branch}/admin/calendar`,
      icon: Calendar,
      id: "calendar",
    },
    {
      name: "CBSE Disclosure",
      href: `/${branch}/admin/cbse`,
      icon: ShieldCheck,
      id: "cbse",
    },
  ];

  if (role === "superadmin") {
    navItems.push({
      name: "Permissions & Access",
      href: `/${branch}/admin/permissions`,
      icon: FileKey,
      id: "permissions",
    });
  } else {
    // Regular admins only see dashboard and explicitly allowed sections
    navItems = navItems.filter(
      (item) => item.id === "dashboard" || permissions.includes(item.id),
    );
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800">
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            Dash
          </span>
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-neutral-500" />
          Admin Panel
        </h2>
        <p className="text-xs text-neutral-500 mt-1 capitalize">
          {branch} Branch
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 px-2 mt-2">
          Main
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              <item.icon
                className={`w-4 h-4 transition-colors ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-neutral-500 group-hover:text-blue-600"
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50">
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Signed in as
            </span>
            <span className="text-sm font-bold text-neutral-900 dark:text-white truncate">
              {username}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
                title="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                ) : (
                  <Moon className="w-5 h-5 text-neutral-600" />
                )}
              </button>
            )}
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button (Fixed on top left) */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 bg-white dark:bg-neutral-900 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Desktop Sidebar (Always visible) */}
      <aside className="hidden md:flex w-72 flex-col h-full z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-neutral-900 z-50 md:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
