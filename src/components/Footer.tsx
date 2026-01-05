"use client";

import {
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle, // For WhatsApp
  Map, // For Google Maps
  Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { navigationData } from "@/data/navigation";

// Custom X Logo Component
const XLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const quickLinks = navigationData.quickLinks;

  const SocialLinks = ({
    fb,
    x,
    google,
    linkedin,
    whatsapp,
  }: {
    fb: string;
    x: string;
    google: string;
    linkedin: string;
    whatsapp: string;
  }) => (
    <div className="flex gap-4 mt-4 text-gray-500 dark:text-gray-400">
      <a
        href={fb}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary hover:scale-110 transition-all"
        aria-label="Facebook"
      >
        <Facebook size={18} />
      </a>
      <a
        href={x}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary hover:scale-110 transition-all"
        aria-label="X (formerly Twitter)"
      >
        <XLogo className="w-[18px] h-[18px]" />
      </a>
      <a
        href={google}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary hover:scale-110 transition-all"
        aria-label="Google Business"
      >
        <Map size={18} />
      </a>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary hover:scale-110 transition-all"
        aria-label="LinkedIn"
      >
        <Linkedin size={18} />
      </a>
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary hover:scale-110 transition-all"
        aria-label="WhatsApp"
      >
        <MessageCircle size={18} />
      </a>
    </div>
  );

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* COLUMN 1: BRANDING (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/">
              <Image
                src="/vna-logo-light.webp"
                alt="Vishwanath Academy"
                width={200}
                height={80}
                className="block dark:hidden"
                style={{ width: "auto", height: "auto" }}
                priority
              />
              <Image
                src="/vna-logo.webp"
                alt="Vishwanath Academy"
                width={200}
                height={80}
                className="hidden dark:block"
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </Link>

            <p className="text-gray-600 dark:text-gray-400 font-body leading-relaxed max-w-sm">
              "{siteConfig.footer.quote}"
            </p>

            <div className="pt-4">
              <p className="font-display font-semibold text-gray-900 dark:text-white mb-4">
                Download our App
              </p>
              <div className="flex gap-3">
                <a
                  href={siteConfig.app.googlePlay}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-105 transition-transform"
                >
                  <Image
                    src="/ggle.webp"
                    alt="Google Play"
                    width={130}
                    height={40}
                    style={{ width: "auto", height: "auto" }}
                  />
                </a>
                <a
                  href={siteConfig.app.appleStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-105 transition-transform"
                >
                  <Image
                    src="/apple.webp"
                    alt="Apple Store"
                    width={130}
                    height={40}
                    style={{ width: "auto", height: "auto" }}
                  />
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-display font-bold text-primary mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3 font-san text-sm text-gray-600 dark:text-gray-400">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: CONTACT (6 cols - Split into 2 sub-cols for branches) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* AASHIANA BRANCH */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-primary/20 transition-all flex flex-col h-full">
              <h3 className="text-lg font-display font-bold text-primary mb-4 flex items-center gap-2">
                <MapPin size={20} className="stroke-[1.5]" /> Aashiana Campus
              </h3>

              <div className="space-y-4 text-sm font-body text-gray-600 dark:text-gray-300 flex-grow">
                <p className="leading-relaxed">
                  {siteConfig.branches.asiana.address}
                </p>

                <div>
                  <p className="text-xs uppercase text-gray-400 font-san font-bold tracking-wider mb-1">
                    Contact
                  </p>
                  {siteConfig.branches.asiana.phone.map((ph, i) => (
                    <a
                      key={i}
                      href={`tel:${ph.replace(/\D/g, "")}`}
                      className="block hover:text-primary transition-colors font-medium"
                    >
                      {ph}
                    </a>
                  ))}
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-400 font-san font-bold tracking-wider mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${siteConfig.branches.asiana.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {siteConfig.branches.asiana.email}
                  </a>
                </div>
              </div>

              {/* Aashiana Socials */}
              <div className="pt-4 mt-auto border-t border-gray-200 dark:border-gray-700">
                <SocialLinks
                  fb={siteConfig.branches.asiana.socials.facebook}
                  x={siteConfig.branches.asiana.socials.x}
                  google={siteConfig.branches.asiana.socials.google}
                  linkedin={siteConfig.branches.asiana.socials.linkedin}
                  whatsapp={siteConfig.branches.asiana.socials.whatsapp}
                />
                <div className="mt-3 text-xs text-gray-500 font-san">
                  Affiliation No.: {siteConfig.branches.asiana.affiliation}
                </div>
              </div>
            </div>

            {/* DHAWAPUR BRANCH */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-primary/20 transition-all flex flex-col h-full">
              <h3 className="text-lg font-display font-bold text-primary mb-4 flex items-center gap-2">
                <MapPin size={20} className="stroke-[1.5]" /> Dhawapur Campus
              </h3>

              <div className="space-y-4 text-sm font-body text-gray-600 dark:text-gray-300 flex-grow">
                <p className="leading-relaxed">
                  {siteConfig.branches.dhawapur.address}
                </p>

                <div>
                  <p className="text-xs uppercase text-gray-400 font-san font-bold tracking-wider mb-1">
                    Contact
                  </p>
                  {siteConfig.branches.dhawapur.phone.map((ph, i) => (
                    <a
                      key={i}
                      href={`tel:${ph.replace(/\D/g, "")}`}
                      className="block hover:text-primary transition-colors font-medium"
                    >
                      {ph}
                    </a>
                  ))}
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-400 font-san font-bold tracking-wider mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${siteConfig.branches.dhawapur.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {siteConfig.branches.dhawapur.email}
                  </a>
                </div>
              </div>

              {/* Dhawapur Socials */}
              <div className="pt-4 mt-auto border-t border-gray-200 dark:border-gray-700">
                <SocialLinks
                  fb={siteConfig.branches.dhawapur.socials.facebook}
                  x={siteConfig.branches.dhawapur.socials.x}
                  google={siteConfig.branches.dhawapur.socials.google}
                  linkedin={siteConfig.branches.dhawapur.socials.linkedin}
                  whatsapp={siteConfig.branches.dhawapur.socials.whatsapp}
                />
                <div className="mt-3 text-xs text-gray-500 font-san">
                  Affiliation No.: {siteConfig.branches.dhawapur.affiliation}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-center">
          <p className="text-sm font-body text-gray-500 dark:text-gray-400 text-center">
            © {new Date().getFullYear()} Vishwanath Academy. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
