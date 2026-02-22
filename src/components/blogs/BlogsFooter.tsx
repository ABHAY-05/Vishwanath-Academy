"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";

export default function BlogsFooter() {
  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-gray-100 dark:border-neutral-800 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center justify-center gap-2">
        <div className="text-gray-500 dark:text-neutral-500 text-sm font-medium text-center">
          &copy; 2026 Vishwanath Academy. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
