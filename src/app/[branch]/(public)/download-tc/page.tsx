"use client";

import { useState } from "react";
import { searchTransferCertificate } from "@/actions/transferCertificate";
import {
  Search,
  Loader2,
  FileKey,
  AlertCircle,
  Download,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { use } from "react";

export default function DownloadTCPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = use(params);
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tcResult, setTcResult] = useState<{
    url: string;
    createdAt: string;
  } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!admissionNumber.trim()) return;

    setLoading(true);
    setError(null);
    setTcResult(null);

    const res = await searchTransferCertificate(branch, admissionNumber);

    if (res.success && res.data) {
      setTcResult({
        url: res.data.file.url,
        createdAt: res.data.createdAt,
      });
    } else {
      setError(res.message || "Failed to find Transfer Certificate.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-[80vh] bg-white dark:bg-gray-950 flex flex-col items-center justify-center p-6 bg-grid-pattern relative">
      <div className="absolute inset-0 z-0 bg-blue-50/50 dark:bg-gray-900/20 pointer-events-none" />

      <div className="w-full max-w-lg z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 ring-8 ring-primary/5">
            <FileKey className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-2 tracking-tight">
            Download TC
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            Enter your Admission Number to securely download your Transfer
            Certificate for the{" "}
            <span className="capitalize font-semibold text-primary">
              {branch}
            </span>{" "}
            branch.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label
                htmlFor="admissionNo"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Admission Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 font-mono text-sm">#</span>
                </div>
                <input
                  type="text"
                  id="admissionNo"
                  required
                  placeholder="Enter admission number"
                  value={admissionNumber}
                  onChange={(e) => setAdmissionNumber(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 sm:py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all uppercase font-mono text-lg tracking-wider"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !admissionNumber.trim()}
              className="w-full bg-primary hover:bg-secondary text-white hover:text-black font-bold py-3 sm:py-4 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Find Certificate
                  <ChevronRight className="w-5 h-5 opacity-50 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 flex gap-3 text-red-800 dark:text-red-200"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </motion.div>
            )}

            {tcResult && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-6 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 flex flex-col items-center text-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center">
                  <FileKey className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-green-900 dark:text-green-100">
                    Certificate Found!
                  </h3>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    Uploaded:{" "}
                    {new Date(tcResult.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <a
                  href={tcResult.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors shadow-sm"
                >
                  <Download className="w-5 h-5" />
                  Download Complete TC
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Having trouble? Please ensure you are viewing the correct branch
          portal.
        </div>
      </div>
    </main>
  );
}
