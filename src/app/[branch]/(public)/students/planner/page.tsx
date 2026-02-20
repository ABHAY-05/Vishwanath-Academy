"use client";

import { useEffect, use } from "react";
import { getAcademicPlanner } from "@/actions/academicPlanner";
import Link from "next/link";
import { CalendarDays, ArrowLeft } from "lucide-react";

export default function AcademicPlannerRedirectPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = use(params);

  useEffect(() => {
    async function fetchAndRedirect() {
      const plannerRes = await getAcademicPlanner(branch);
      const plannerLink =
        plannerRes.success && plannerRes.data ? plannerRes.data.file.url : null;

      if (plannerLink) {
        window.location.replace(plannerLink);
      }
    }

    fetchAndRedirect();
  }, [branch]);

  // Show a fallback message while loading or if no link exists
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 border border-t border-t-primary/10 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center pb-4">
          <CalendarDays className="h-24 w-24 text-gray-400 dark:text-gray-600 mb-2 opacity-50 animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-gray-100">
          Academic Planner Unavailable
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          The yearly academic planner for this branch has not been uploaded yet.
          Please check back later.
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
