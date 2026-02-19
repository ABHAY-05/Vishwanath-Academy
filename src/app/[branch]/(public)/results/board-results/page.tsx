import { getBoardResults, getHighlightImage } from "@/actions/board-results";
import BoardResultsContent from "./BoardResultsContent";
import { Metadata } from "next";

import { getBranchSeo } from "@/data/seo-config";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { branch } = await params;
  return getBranchSeo("board", branch);
}

interface Props {
  params: Promise<{ branch: string }>;
}

export default async function BoardResultsPage({ params }: Props) {
  const { branch } = await params;

  const [highlightRes, resultsRes] = await Promise.all([
    getHighlightImage(branch),
    getBoardResults(branch),
  ]);

  const highlightImage = highlightRes.success
    ? highlightRes.data?.highlightImage || null
    : null;
  const results = resultsRes.success ? resultsRes.data : [];

  return (
    <BoardResultsContent
      highlightImage={highlightImage}
      results={results}
      branch={branch}
    />
  );
}
