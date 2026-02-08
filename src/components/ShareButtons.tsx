"use client";

import {
  Facebook,
  Linkedin,
  Twitter,
  MessageCircle,
  Share2,
} from "lucide-react";

interface ShareButtonsProps {
  title: string;
  description: string;
  url: string;
}

export default function ShareButtons({
  title,
  description,
  url,
}: ShareButtonsProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "hover:text-green-500",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "hover:text-blue-600",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      color: "hover:text-black dark:hover:text-white",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "hover:text-blue-700",
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDesc}`,
    },
    {
      name: "Pinterest",
      icon: Share2, // Lucide doesn't have Pinterest, using Share2 as generic or we can use an SVG if strictly needed. using explicit text for now or generic icon.
      color: "hover:text-red-600",
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    },
  ];

  return (
    <div className="flex gap-4 items-center">
      <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
        Share:
      </span>
      <div className="flex gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-neutral-400 transition-colors ${link.color}`}
            title={`Share on ${link.name}`}
          >
            <link.icon size={20} />
          </a>
        ))}
      </div>
    </div>
  );
}
