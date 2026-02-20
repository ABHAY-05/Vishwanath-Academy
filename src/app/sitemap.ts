import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vishwanath-academy-mu.vercel.app";
  const branches = ["aashiana", "dhawapur"];

  const coreRoutes = [
    "",
    "/about",
    "/about/beyond",
    "/about/cbse",
    "/about/facilities",
    "/about/team",
    "/academics",
    "/academics/books-and-stationary",
    "/academics/calendar",
    "/academics/competitive",
    "/academics/curriculum",
    "/admissions",
    "/admissions/fees",
    "/admissions/procedure",
    "/admissions/prospectus",
    "/admissions/rules",
    "/admissions/subjects",
    "/admissions/uniform",
    "/contact",
    "/contact/b-ed-training",
    "/contact/career",
    "/download-tc",
    "/notice-board",
    "/privacy",
    "/results",
    "/results/awards",
    "/results/board-results",
    "/results/scholarship",
    "/results/scholarship/gallery",
    "/students",
    "/students/gallery",
    "/students/planner",
    "/students/press",
    "/terms",
  ];

  const mapRoutes = (): MetadataRoute.Sitemap => {
    const allRoutes: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 1,
      },
    ];

    branches.forEach((branch) => {
      coreRoutes.forEach((route) => {
        allRoutes.push({
          url: `${baseUrl}/${branch}${route}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: route === "" ? 0.9 : 0.8,
        });
      });
    });

    return allRoutes;
  };

  return mapRoutes();
}
