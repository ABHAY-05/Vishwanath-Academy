import { redirect } from "next/navigation";
import { getProspectus } from "@/actions/prospectus";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export default async function ProspectusRedirectPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;

  // Fetch global prospectus link
  const prospectusRes = await getProspectus();
  const prospectusLink =
    prospectusRes.success && prospectusRes.data
      ? prospectusRes.data.pdf.url
      : null;

  if (prospectusLink) {
    redirect(prospectusLink);
  }

  // If there's no prospectus link uploaded yet, show a fallback message
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 border border-t border-t-primary/10 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center pb-4">
          <FileText className="h-24 w-24 text-gray-400 dark:text-gray-600 mb-2 opacity-50" />
        </div>
        <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-gray-100">
          Coming Soon
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          The School Prospectus is currently being updated. Please check back
          later.
        </p>

        <div className="pt-8">
          <Link
            href={`/${branch}`}
            className="inline-flex items-center justify-center gap-2 bg-primary text-white py-3 px-8 rounded-full hover:bg-secondary hover:text-black font-semibold transition-colors shadow-md"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
