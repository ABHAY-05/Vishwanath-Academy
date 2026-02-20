import type { Metadata } from "next";
import { getNotices } from "@/actions/notice";
import NoticeBoardClient from "@/components/NoticeBoardClient";

import { getBranchSeo } from "@/data/seo-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ branch: string }>;
}): Promise<Metadata> {
  const { branch } = await params;
  return getBranchSeo("noticeBoard", branch);
}

export default async function PublicNoticeBoardPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;
  const notices = await getNotices(branch);

  return (
    <div className="pt-24 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
          Notice Board
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Stay updated with the latest announcements, circulars, and news from{" "}
          {branch.charAt(0).toUpperCase() + branch.slice(1)} branch.
        </p>
      </div>

      <NoticeBoardClient notices={notices} />
    </div>
  );
}
