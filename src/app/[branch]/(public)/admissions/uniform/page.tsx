import { Metadata } from "next";
import UniformContent from "./UniformContent";

export const metadata: Metadata = {
  title: "School Uniform | Vishwanath Academy",
  description:
    "Details regarding the circular summer uniform for boys and girls at Vishwanath Academy.",
};

export default function SchoolUniformPage() {
  return <UniformContent />;
}
