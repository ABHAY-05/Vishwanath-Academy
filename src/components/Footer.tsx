"use client";

import {
  Facebook,
  Linkedin,
  Map,
  MapPin,
  MessageCircle,
  Instagram,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { navigationData } from "@/data/navigation";

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

export default function Footer({ branch }: { branch?: string }) {
  const quickLinks = navigationData.quickLinks;
  const isSingleBranch = !!branch;

  const getLink = (path?: string) => {
    if (!path) return "#";
    if (path.startsWith("http")) return path;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return branch ? `/${branch}${cleanPath}` : cleanPath;
  };

  const linksCols = isSingleBranch ? "lg:col-span-2" : "lg:col-span-2";
  const contactCols = isSingleBranch ? "lg:col-span-6" : "lg:col-span-6";

  const SocialLinks = ({
    fb,
    x,
    google,
    linkedin,
    whatsapp,
    instagram,
  }: {
    fb: string;
    x: string;
    google: string;
    linkedin: string;
    whatsapp: string;
    instagram: string;
  }) => (
    <div className="flex gap-4 mt-4 text-gray-500 dark:text-gray-400">
      <a
        href={fb}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-secondary hover:scale-110 transition-all"
        aria-label="Facebook"
      >
        <Facebook size={18} />
      </a>
      <a
        href={x}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-secondary hover:scale-110 transition-all"
        aria-label="X (formerly Twitter)"
      >
        <XLogo className="w-[18px] h-[18px]" />
      </a>
      <a
        href={google}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-secondary hover:scale-110 transition-all"
        aria-label="Google Business"
      >
        <Map size={18} />
      </a>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-secondary hover:scale-110 transition-all"
        aria-label="LinkedIn"
      >
        <Linkedin size={18} />
      </a>
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-secondary hover:scale-110 transition-all"
        aria-label="WhatsApp"
      >
        <MessageCircle size={18} />
      </a>
      <a
        href={instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-pink-600 hover:scale-110 transition-all"
        aria-label="Instagram"
      >
        <Instagram size={18} />
      </a>
    </div>
  );

  const BranchContactCard = ({
    data,
    withMap = false,
  }: {
    data: any;
    withMap?: boolean;
  }) => (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-secondary/30 transition-all flex flex-col lg:flex-row gap-6 h-full group">
      <div className="flex-1 flex flex-col h-full">
        <h3 className="text-lg font-display font-bold text-primary dark:text-secondary mb-4 flex items-center gap-2 group-hover:text-secondary transition-colors">
          <MapPin size={20} className="stroke-[1.5]" /> {data.name}
        </h3>

        <div className="space-y-4 text-sm font-body text-gray-600 dark:text-gray-300 grow">
          <p className="leading-relaxed">{data.address}</p>

          <div>
            <p className="text-xs uppercase text-gray-400 font-san font-bold tracking-wider mb-1">
              Contact
            </p>
            {data.phone.map((ph: string, i: number) => (
              <a
                key={i}
                href={`tel:${ph.replace(/\D/g, "")}`}
                className="block hover:text-secondary transition-colors font-medium"
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
              href={`mailto:${data.email}`}
              className="hover:text-secondary transition-colors"
            >
              {data.email}
            </a>
          </div>
        </div>

        {/* Socials */}
        <div className="pt-4 mt-auto border-t border-gray-200 dark:border-gray-700">
          <SocialLinks
            fb={data.socials.facebook}
            x={data.socials.x}
            google={data.socials.google}
            linkedin={data.socials.linkedin}
            whatsapp={data.socials.whatsapp}
            instagram={data.socials.instagram}
          />
          <div className="mt-3 text-xs text-gray-500 font-san">
            Affiliation No.: {data.affiliation}
          </div>
        </div>
      </div>

      {withMap && data.mapUrl && (
        <div className="w-full lg:w-[45%] min-h-[250px] lg:min-h-0 rounded-xl overflow-hidden shadow-inner border border-gray-200 dark:border-gray-700 bg-gray-200">
          <iframe
            src={data.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
      )}
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
                className="block dark:hidden h-auto"
                priority
              />
              <Image
                src="/vna-logo.webp"
                alt="Vishwanath Academy"
                width={200}
                height={80}
                className="hidden dark:block h-auto"
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

          {/* COLUMN 2: QUICK LINKS */}
          <div className={linksCols}>
            <h3 className="text-lg font-display font-bold text-primary dark:text-secondary mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3 font-san text-sm text-gray-600 dark:text-gray-400">
              {quickLinks.map((item) => {
                let itemHref = item.href;
                if (item.name === "Admission Enquiry") {
                  if (branch === "aashiana") {
                    itemHref =
                      "https://forms.edunexttechnologies.com/forms/val/application/";
                  } else if (branch === "dhawapur") {
                    itemHref =
                      "https://forms.edunexttechnologies.com/forms/vna/application/";
                  }
                }

                return (
                  <li key={item.name}>
                    <Link
                      href={getLink(itemHref)}
                      target={item.target}
                      className="hover:text-secondary transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-secondary transition-colors" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* COLUMN 3: CONTACT */}
          <div className={contactCols}>
            {branch === "aashiana" && (
              <BranchContactCard
                data={siteConfig.branches.aashiana}
                withMap={true}
              />
            )}
            {branch === "dhawapur" && (
              <BranchContactCard
                data={siteConfig.branches.dhawapur}
                withMap={true}
              />
            )}
            {!branch && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <BranchContactCard data={siteConfig.branches.aashiana} />
                <BranchContactCard data={siteConfig.branches.dhawapur} />
              </div>
            )}
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
