import { MetadataRoute } from "next";
import { getBlogs } from "@/actions/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
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
        url: baseUrl!,
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

  const routes = mapRoutes();

  routes.push({
    url: `${process.env.NEXT_PUBLIC_BLOG_URL}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  });

  try {
    const res = await getBlogs({ limit: 1000 });
    if (res.success && res.data) {
      res.data.forEach((blog: any) => {
        routes.push({
          url: `${process.env.NEXT_PUBLIC_BLOG_URL}/${blog.slug}`,
          lastModified: new Date(
            blog.updatedAt || blog.createdAt || new Date(),
          ),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      });
    }
  } catch (error) {
    console.error("Failed to fetch blogs for sitemap:", error);
  }

  return routes;
}
