import type { Metadata } from "next";
import BlogsNavbar from "@/components/blogs/BlogsNavbar";
import BlogsFooter from "@/components/blogs/BlogsFooter";

export const metadata: Metadata = {
  title: "Blogs | Vishwanath Academy",
  description:
    "Read the latest news, updates, parent's corner, and student information from Vishwanath Academy.",
};

export default function BlogsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-gray-100 flex flex-col transition-colors">
      <BlogsNavbar />
      <main className="flex-1">{children}</main>
      <BlogsFooter />
    </div>
  );
}
