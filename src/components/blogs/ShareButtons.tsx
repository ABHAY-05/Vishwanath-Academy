"use client";

import {
  Facebook,
  Linkedin,
  Twitter,
  Link as LinkIcon,
  Share2,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

export function ShareButtons({
  url,
  title,
  hideLabel,
}: {
  url: string;
  title: string;
  hideLabel?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fullUrl = url;

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    toast.success("Link copied to clipboard!");
  };

  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const socialLinks = (
    <>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white transition-colors"
        title="Share on X (Twitter)"
      >
        <Twitter size={18} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
        title="Share on Facebook"
      >
        <Facebook size={18} />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-700 hover:text-white transition-colors"
        title="Share on LinkedIn"
      >
        <Linkedin size={18} />
      </a>
      <button
        type="button"
        onClick={handleCopyLink}
        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-secondary dark:bg-primary hover:text-white transition-colors"
        title="Copy Link"
      >
        <LinkIcon size={18} />
      </button>
    </>
  );

  if (hideLabel) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            isOpen
              ? "bg-primary dark:bg-secondary text-white"
              : "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-700"
          }`}
          title="Share"
        >
          <Share2 size={20} />
        </button>

        {isOpen && (
          <div className="absolute right-0 bottom-full mb-3 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-full shadow-xl p-2 flex gap-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {socialLinks}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-neutral-800">
      <span className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
        Share this post:
      </span>
      <div className="flex gap-2">{socialLinks}</div>
    </div>
  );
}
