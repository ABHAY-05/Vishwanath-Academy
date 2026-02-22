import { getBlogBySlug, incrementBlogViews, getBlogs } from "@/actions/blog";
import { BlogCardSmall } from "@/components/blogs/BlogCardSmall";
import FollowUsBox from "@/components/blogs/FollowUsBox";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { User, Eye, Calendar, Tag } from "lucide-react";
import { Metadata } from "next";
import parse, {
  DOMNode,
  Element,
  domToReact,
  HTMLReactParserOptions,
} from "html-react-parser";
import { EmbeddedBlogCard } from "@/components/blogs/EmbeddedBlogCard";
import { ShareButtons } from "@/components/blogs/ShareButtons";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const res = await getBlogBySlug(slug);
  if (!res.success || !res.data) {
    return { title: "Blog Not Found" };
  }
  return {
    title: `${res.data.title} | Vishwanath Academy Blog`,
  };
}

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blogRes = await getBlogBySlug(slug);
  if (!blogRes.success || !blogRes.data) {
    return notFound();
  }

  const blog = blogRes.data;

  incrementBlogViews(blog._id.toString());

  const relatedRes = await getBlogs({ limit: 4, tag: blog.tags[0] });
  let relatedBlogs = relatedRes.success ? relatedRes.data : [];
  relatedBlogs = relatedBlogs
    .filter((b: any) => b._id !== blog._id)
    .slice(0, 3);

  const popularRes = await getBlogs({ limit: 4, sort: "popular" });
  let popularBlogs = popularRes.success ? popularRes.data : [];
  popularBlogs = popularBlogs
    .filter((b: any) => b._id !== blog._id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Main Content Area */}
        <article className="lg:col-span-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 overflow-hidden transition-colors">
          {/* Header Info */}
          <div className="p-6 md:p-8 lg:p-10 border-b border-gray-100 dark:border-neutral-800">
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary text-xs font-bold uppercase tracking-wider rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-500 dark:text-gray-400 font-medium">
              <div className="flex items-center gap-2">
                <User size={16} className="text-primary dark:text-secondary" />
                <span className="text-gray-900 dark:text-gray-200">
                  {blog.author}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar
                  size={16}
                  className="text-primary dark:text-secondary"
                />
                <span>{format(new Date(blog.createdAt), "MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-primary dark:text-secondary" />
                <span>{blog.views} views</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full flex justify-center bg-gray-100 dark:bg-neutral-800">
            <Image
              src={blog.thumbnail.url}
              alt={blog.title}
              width={1200}
              height={700}
              priority
              className="w-full h-auto object-contain max-w-5xl"
            />
          </div>

          {/* Rich Text Content */}
          <div className="p-6 md:p-8 lg:p-10 prose prose-lg md:prose-xl max-w-none prose-a:text-primary hover:prose-a:text-secondary prose-img:rounded-xl prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-li:text-gray-700 dark:prose-li:text-gray-300 transition-colors">
            {(() => {
              const hasEmbeddedLink = (node: DOMNode | any): boolean => {
                if (node instanceof Element) {
                  if (
                    node.name === "a" &&
                    node.attribs?.href &&
                    node.attribs.href.startsWith("https://blog.")
                  ) {
                    return true;
                  }
                  if (node.children) {
                    return node.children.some(hasEmbeddedLink);
                  }
                }
                return false;
              };

              const options: HTMLReactParserOptions = {
                replace: (domNode) => {
                  if (domNode instanceof Element && domNode.name === "a") {
                    const href = domNode.attribs?.href;
                    if (href && href.startsWith("https://blog.")) {
                      return <EmbeddedBlogCard url={href} />;
                    }
                  }

                  if (domNode instanceof Element && domNode.name === "p") {
                    if (hasEmbeddedLink(domNode)) {
                      return (
                        <div className="my-8">
                          {domToReact(domNode.children as DOMNode[], options)}
                        </div>
                      );
                    }
                  }
                },
              };
              return parse(blog.content, options);
            })()}

            <ShareButtons
              url={`${process.env.NEXT_PUBLIC_BLOG_URL}/${blog.slug}`}
              title={blog.title}
            />
          </div>

          {/* Tags Footer */}
          <div className="px-6 md:px-8 lg:px-10 pb-8 flex items-center gap-3 border-t border-gray-100 dark:border-neutral-800 pt-8">
            <Tag
              size={18}
              className="text-gray-400 dark:text-neutral-500 rotate-90"
            />
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag: string) => (
                <Link
                  href={`/search?q=${tag}`}
                  key={tag}
                  className="px-4 py-1.5 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </article>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <FollowUsBox />

          {/* Related Stories Widget */}
          {relatedBlogs.length > 0 && (
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800 overflow-hidden transition-colors">
              <div className="p-4 border-b border-gray-100 dark:border-neutral-800">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 border-b-2 border-primary dark:border-secondary pb-1 inline-block">
                  RELATED STORIES
                </h2>
              </div>
              <div className="p-4 flex flex-col gap-2">
                {relatedBlogs.map((b: any) => (
                  <BlogCardSmall key={String(b._id)} blog={b} />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* You May Have Missed (Bottom section) */}
      {popularBlogs.length > 0 && (
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-neutral-800 mt-12 transition-colors">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2 before:content-[''] before:w-1 before:h-5 before:bg-primary dark:before:bg-secondary before:rounded-full">
            You may have missed
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularBlogs.map((b: any) => (
              <Link
                key={b._id}
                href={`/${b.slug}`}
                className="group flex flex-col gap-3"
              >
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-neutral-800">
                  <Image
                    src={b.thumbnail.url}
                    alt={b.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-secondary transition-colors line-clamp-2">
                  {b.title}
                </h4>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
