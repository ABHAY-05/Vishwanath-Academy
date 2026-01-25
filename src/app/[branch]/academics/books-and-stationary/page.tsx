import { Metadata } from "next";
import BooksContent from "./BooksContent";

export const metadata: Metadata = {
  title: "Books & Stationary | Vishwanath Academy",
  description:
    "Download the list of books and stationary for all classes at Vishwanath Academy.",
};

export default function BooksAndStationaryPage() {
  return <BooksContent />;
}
