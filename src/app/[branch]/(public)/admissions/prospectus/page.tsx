"use client";

import { useEffect, use } from "react";
import { getProspectus } from "@/actions/prospectus";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export default function ProspectusRedirectPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = use(params);

  useEffect(() => {
    async function fetchAndRedirect() {
      const prospectusRes = await getProspectus();
      const prospectusLink =
        prospectusRes.success && prospectusRes.data
          ? prospectusRes.data.pdf.url
          : null;

      if (prospectusLink) {
        // Because `window.location.replace` opens in the same tab, and
        // server redirects open in the same tab, we must use window.open
        // but since browsers block window.open without user interaction,
        // the best we can do natively on a direct URL load is replace.
        // However, the Navbar and Hero buttons now explicitly have target="_blank".
        window.location.replace(prospectusLink);
      }
    }

    fetchAndRedirect();
  }, []);

  // Show a fallback message while loading or if no link exists
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 border border-t border-t-primary/10 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center pb-4">
          <FileText className="h-24 w-24 text-gray-400 dark:text-gray-600 mb-2 opacity-50 animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-gray-100">
          Loading Prospectus...
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Please wait while we locate the requested document. If this takes too
          long, it may be unavailable.
        </p>

        <Link
          href={`/${branch}`}
          className="inline-flex items-center justify-center gap-2 bg-primary text-white py-3 px-8 rounded-full hover:bg-secondary hover:text-black font-semibold transition-colors shadow-md mt-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
