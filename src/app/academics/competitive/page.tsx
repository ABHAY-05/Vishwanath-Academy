import { Metadata } from "next";
import CompetitiveContent from "./CompetitiveContent";

export const metadata: Metadata = {
  title: "Competitive Exams | Vishwanath Academy",
  description:
    "Explore various competitive exams after 12th in Science, Commerce, and Arts streams including JEE, NEET, CLAT, NIFT, and more. Get details on eligibility, purpose, and application.",
};

export default function CompetitiveExamsPage() {
  return <CompetitiveContent />;
}
