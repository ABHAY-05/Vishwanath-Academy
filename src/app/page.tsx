import About from "@/components/About";
import AnnouncementPopup from "@/components/AnnouncementPopup";
import ApplyAdmission from "@/components/AppyAdmission";
import HeroSlider from "@/components/HeroSlider";
import OurManagement from "@/components/Management";
import NoticeBoard from "@/components/Notice";
import OurStrength from "@/components/Strength";
import YoutubeSection from "@/components/YoutubeSection";

import { Metadata } from "next";
import { seoData } from "@/data/seo-config";

export const metadata: Metadata = {
  title: seoData.home.title,
  description: seoData.home.description,
};

export default function Home() {
  return (
    <>
      {/* <AnnouncementPopup /> */}
      <HeroSlider />
      <OurStrength />
      <About />
      <ApplyAdmission />
      <NoticeBoard />
      <OurManagement />
      <YoutubeSection />
    </>
  );
}
