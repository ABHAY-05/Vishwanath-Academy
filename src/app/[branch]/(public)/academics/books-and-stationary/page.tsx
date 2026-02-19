import { Metadata } from "next";
import BooksContent from "./BooksContent";

import { seoData } from "@/data/seo-config";

export const metadata: Metadata = {
  title: seoData.academics.books.title,
  description: seoData.academics.books.description,
};

export default function BooksAndStationaryPage() {
  return <BooksContent />;
}
