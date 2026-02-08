import { Metadata } from "next";
import RulesContent from "./RulesContent";

export const metadata: Metadata = {
  title: "School Rules | Vishwanath Academy",
  description:
    "Guidelines and rules for students and parents at Vishwanath Academy.",
};

export default function SchoolRulesPage() {
  return <RulesContent />;
}
