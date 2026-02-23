import Image from "next/image";
import Link from "next/link";
import { ShareButtons } from "@/components/blogs/ShareButtons";
import FollowUsBox from "@/components/blogs/FollowUsBox";
import { DonationForm } from "./DonationForm";
import { EmbeddedBlogCard } from "@/components/blogs/EmbeddedBlogCard";
import { getBlogs } from "@/actions/blog";
import { BlogCardSmall } from "@/components/blogs/BlogCardSmall";

export const metadata = {
  title: "Educate a Child in Need with Quality Education - Vishwanath Academy",
  description:
    "Join us in our mission to Educate a Child in Need with Quality Education for a Brighter Future in 2025. Your donation helps shape a brighter future.",
};

export default async function EducateAChildPage() {
  const currentUrl = `${process.env.NEXT_PUBLIC_BLOG_URL}/educate-a-child-in-need`;

  const newsRes = await getBlogs({ page: 1, limit: 3, tag: "news" });
  const popularRes = await getBlogs({ page: 1, limit: 4, sort: "popular" });

  const relatedBlogs =
    newsRes.success && Array.isArray(newsRes.data) ? newsRes.data : [];
  const popularBlogs =
    popularRes.success && Array.isArray(popularRes.data) ? popularRes.data : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <article className="lg:col-span-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 overflow-hidden transition-colors">
          <div className="p-6 md:p-8 lg:p-10 border-b border-gray-100 dark:border-neutral-800">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Educate a Child in Need with Quality Education for a Brighter
              Future in 2025
            </h1>

            {/* Main Images */}
            <div className="w-full flex flex-col items-center gap-6 mb-8">
              <div className="w-full relative rounded-xl overflow-hidden aspect-video bg-gray-100 dark:bg-neutral-800">
                <Image
                  src="/blogs/sponsor-a-child-in-need.jpeg"
                  alt="Sponsor a child in need"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className="w-full relative rounded-xl overflow-hidden bg-gray-100 dark:bg-neutral-800 flex justify-center">
                <Image
                  src="/blogs/1.jpg"
                  alt="Education impact"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Rich Text Content */}
            <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 dark:text-gray-300">
              <p>
                In today's world, one must Educate a Child in Need with Quality
                Education for a Brighter Future through your donations,
                education is a powerful tool that has the ability to transform
                lives and create a ripple effect of positive change. However,
                millions of children around the globe are denied access to
                quality education due to various barriers. By taking a step
                forward to educate a child in need, you can play a crucial role
                in breaking the cycle of poverty, empowering communities, and
                shaping a brighter future.
              </p>

              {/* QR Code section */}
              <div className="my-10 flex flex-col items-center p-6 bg-gray-50 dark:bg-neutral-800/50 rounded-2xl border border-gray-100 dark:border-neutral-800">
                <a
                  href="https://rzp.io/i/91zb8VMML"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-90 transition-opacity flex flex-col items-center gap-4"
                >
                  <div className="relative w-[240px] h-[240px] sm:w-[450px] sm:h-[450px] rounded-xl overflow-hidden shadow-md">
                    <Image
                      src="/blogs/2.jpeg"
                      alt="Donation QR Code"
                      fill
                      className="object-contain bg-white"
                    />
                  </div>
                  <span className="inline-flex items-center px-6 py-3 bg-primary dark:bg-secondary text-white font-bold rounded-full hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors shadow-sm text-lg">
                    Click to Donate via Razorpay
                  </span>
                </a>
              </div>

              <blockquote className="border-l-4 border-primary dark:border-secondary pl-4 italic my-8 text-gray-600 dark:text-gray-400">
                "Join us on this journey as we highlight the importance of
                education and the impact it can have on the lives of these
                children."
              </blockquote>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
                The Impact of Your Support
              </h2>
              <p>
                By choosing to educate a child in need with quality education
                for a brighter future, you are making a profound difference in
                their life. Your support enables them to attend school, access
                educational resources, receive proper nutrition, and obtain
                essential healthcare. Education empowers these children to dream
                big, pursue their passions, and contribute to their communities.
                With your help, they can become future leaders, teachers,
                doctors, engineers, and catalysts for positive change.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
                The Power of Education
              </h2>
              <p>
                Education is a fundamental right that every child deserves. It
                equips them with knowledge, skills, and confidence, enabling
                them to build a better life for themselves and their families.
                Education opens doors to opportunities, helps break down
                barriers, and fosters personal growth and development. By
                investing in a child's education, you are empowering them with
                the tools they need to overcome adversity and create a positive
                change in their lives.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
                The Challenges Faced by Children in Need
              </h2>
              <p>
                Unfortunately, many children face numerous obstacles that
                prevent them from accessing education. Poverty, conflict,
                discrimination, and inadequate infrastructure are just a few of
                the barriers that stand in their way. These children often lack
                the resources and support necessary to attend school, hindering
                their potential and limiting their opportunities. By addressing
                these challenges and providing educational opportunities, we can
                break the cycle of poverty and unlock the untapped potential
                within these children.
              </p>

              <ul className="list-disc pl-6 space-y-4 my-6">
                <li>
                  <strong>Poverty:</strong> Economic limitations deprive
                  children of educational opportunities. Insufficient funds for
                  tuition fees, school supplies, and uniforms. Lack of access to
                  transportation to reach schools in remote areas.
                </li>
                <li>
                  <strong>Conflict:</strong> Areas affected by war and violence
                  disrupt schooling for children. Destruction of schools and
                  infrastructure. Displacement or refugee status disrupts
                  continuity education.
                </li>
                <li>
                  <strong>Discrimination:</strong> Children facing
                  discrimination based on gender, ethnicity, or disabilities may
                  be excluded from education. Gender inequality prevents girls
                  from accessing education. Limited support for children with
                  disabilities.
                </li>
                <li>
                  <strong>Inadequate Infrastructure:</strong> Lack of proper
                  facilities for education. Inaccessible schools, lack of
                  classrooms, and learning materials. Absence of basic amenities
                  like clean water and sanitation facilities.
                </li>
              </ul>
              <p>
                These barriers not only hinder the individual growth and
                development of these children but also perpetuate the cycle of
                poverty in their communities.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
                How You Can Get Involved
              </h2>
              <p>
                There are various ways you can contribute to educating a child
                in need:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Sponsor a Child by giving donations:</strong> Provide
                  financial support for tuition fees, school supplies, uniforms,
                  and other essentials.
                </li>
                <li>
                  <strong>Promote Awareness:</strong> Raise awareness about the
                  importance of education for children in need, and inspire
                  others to take action.
                </li>
              </ul>
              <p>
                Every contribution, no matter how big or small, makes a
                significant impact on a child's life. Educating a child in need
                is not just about providing them with knowledge; it is about
                giving them hope, opportunities, and a chance for a better
                future.
              </p>
              <p>
                By investing in education, we are investing in the potential of
                these children and enabling them to break free from the cycle of
                poverty.
              </p>
              <p className="font-medium text-lg text-gray-900 dark:text-gray-100">
                Together, let's take a stand and ensure that every child has
                access to quality education, empowering them to build a brighter
                and more prosperous world for themselves and future generations.
              </p>

              {/* Call to action section */}
              <div className="mt-16 bg-gray-50 dark:bg-neutral-800/30 border border-gray-100 dark:border-neutral-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-center text-gray-900 dark:text-white mb-8">
                  Help Make a Difference
                </h2>

                <div className="flex flex-col items-center mb-10">
                  <a
                    href="https://rzp.io/i/91zb8VMML"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-90 transition-opacity"
                  >
                    <div className="relative w-[240px] h-[240px] sm:w-[450px] sm:h-[450px] rounded-xl overflow-hidden shadow-md">
                      <Image
                        src="/blogs/2.jpeg"
                        alt="Donation QR Code"
                        fill
                        className="object-contain bg-white"
                      />
                    </div>
                  </a>
                  <p className="mt-6 text-center text-gray-700 dark:text-gray-300 max-w-2xl">
                    We, as an educational institution, are currently supporting
                    300+ students who are facing financial constraints. However,
                    we aim to extend our support to more students, and this
                    won't be possible without your help and support. We invite
                    you to play your part and support us with a small donation,
                    which will solely be used for this noble cause.
                  </p>
                </div>

                {/* Donation Form Component */}
                <div className="max-w-xl mx-auto bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700 p-6 md:p-8">
                  <DonationForm />
                </div>
              </div>

              {/* Embedded related item */}
              <div className="mt-12 not-prose">
                <EmbeddedBlogCard
                  url={`${process.env.NEXT_PUBLIC_BLOG_URL}/shri-markandey-tewari-bright-child-scholarship`}
                />
              </div>
            </div>

            {/* Bottom Sharing Widget */}
            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-neutral-800 flex justify-between items-center">
              <ShareButtons
                url={currentUrl}
                title="Educate a Child in Need with Quality Education for a Brighter Future in 2025"
              />
            </div>
          </div>
        </article>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <FollowUsBox />

          {/* Related Stories Widget */}
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800 overflow-hidden transition-colors">
            <div className="p-4 border-b border-gray-100 dark:border-neutral-800">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 border-b-2 border-primary dark:border-secondary pb-1 inline-block">
                RELATED STORIES
              </h2>
            </div>
            <div className="p-4 flex flex-col gap-2">
              {relatedBlogs.length > 0 ? (
                relatedBlogs.map((b: any) => (
                  <BlogCardSmall key={String(b._id)} blog={b} />
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 italic py-4">
                  No recent news stories found.
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* You May Have Missed (Bottom section) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-neutral-800 mt-12 transition-colors">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2 before:content-[''] before:w-1 before:h-5 before:bg-primary dark:before:bg-secondary before:rounded-full">
            You may have missed
          </h3>
          {popularBlogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularBlogs.map((b: any) => (
                <Link
                  key={String(b._id)}
                  href={`/${b.slug}`}
                  className="group flex flex-col gap-3"
                >
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-neutral-800">
                    <Image
                      src={b.thumbnail?.url || "/placeholder.jpg"}
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
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">
              No popular stories to show currently.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
