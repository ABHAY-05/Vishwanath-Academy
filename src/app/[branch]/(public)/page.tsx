import About from "@/components/About";
import AnnouncementPopup from "@/components/AnnouncementPopup";
import ApplyAdmission from "@/components/AppyAdmission";
import HeroSlider from "@/components/HeroSlider";
import OurManagement from "@/components/Management";
import NoticeBoard from "@/components/Notice";
import OurStrength from "@/components/Strength";
import YoutubeSection from "@/components/YoutubeSection";
import PrincipalMessage from "@/components/PrincipalMessage";

import { Metadata } from "next";
import { seoData } from "@/data/seo-config";

export const metadata: Metadata = {
  title: seoData.home.title,
  description: seoData.home.description,
};

import { getNotices } from "@/actions/notice";

export default async function Home({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;
  const allNotices = await getNotices(branch);
  const notices = allNotices.slice(0, 5);

  return (
    <>
      <HeroSlider />
      <OurStrength />
      <About />
      <PrincipalMessage branch={branch} />
      <ApplyAdmission />
      <NoticeBoard notices={notices} />
      <OurManagement branch={branch} />
      <YoutubeSection branch={branch} />
    </>
  );
}
