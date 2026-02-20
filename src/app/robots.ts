import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/aashiana/admin/", "/dhawapur/admin/", "/api/"],
    },
    sitemap: "https://vishwanath-academy-mu.vercel.app/sitemap.xml",
  };
}
