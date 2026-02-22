import { Facebook, Linkedin, Instagram, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export default function FollowUsBox() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800 p-8 transition-colors">
      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-neutral-500 mb-4">
        Follow Us
      </h3>
      <div className="flex items-center gap-4">
        <a
          href={siteConfig.branches.aashiana.socials.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
        >
          <Facebook size={18} />
        </a>
        <a
          href="http://www.linkedin.com/company/vishwanathacademy"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-colors"
        >
          <Linkedin size={18} />
        </a>
        <a
          href={siteConfig.branches.aashiana.socials.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors"
        >
          <MessageCircle size={18} />
        </a>
        <a
          href={siteConfig.branches.dhawapur.socials.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
        >
          <Facebook size={18} />
        </a>
        <a
          href={siteConfig.branches.aashiana.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors"
        >
          <Instagram size={18} />
        </a>
      </div>
    </div>
  );
}
