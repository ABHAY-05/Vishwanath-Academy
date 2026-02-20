"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send, Paperclip, CheckCircle2, Upload } from "lucide-react";
import { toast } from "sonner";
import { submitBedApplication } from "@/actions/bedApplication";

export default function BedApplicationPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const [activeBranch, setActiveBranch] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // File state
  const [collegeLetterFile, setCollegeLetterFile] = useState<File | null>(null);

  useEffect(() => {
    params.then((p) => setActiveBranch(p.branch));
  }, [params]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!collegeLetterFile) {
      toast.error("Please upload a copy of the letter from your College.");
      return;
    }

    // Size check max 4MB
    if (collegeLetterFile.size > 4 * 1024 * 1024) {
      toast.error("File size must be less than 4MB.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append("collegeLetter", collegeLetterFile);
    formData.append("branch", activeBranch);

    const res = await submitBedApplication(formData);

    if (res.success) {
      setSubmitSuccess(true);
      toast.success(res.message);
      (e.target as HTMLFormElement).reset();
      setCollegeLetterFile(null);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } else {
      toast.error(res.message);
    }
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-24 pb-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 dark:bg-primary/10 -skew-y-3 origin-top-left -z-10" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-neutral-900 dark:text-white mb-4">
            B.Ed Training <span className="text-primary">Application</span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Please fill out the application form below to apply for B.Ed
            training at Vishwanath Academy.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-gray-800 p-8 md:p-12"
        >
          <AnimatePresence mode="wait">
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center flex flex-col items-center gap-4 py-24"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-green-900 dark:text-green-100">
                  Application Submitted!
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  Thank you for applying. Your application and college letter
                  have been successfully forwarded to our administration. We
                  will contact you soon.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-4 text-primary font-semibold hover:underline"
                >
                  Submit another application
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-1 gap-6">
                  <input
                    name="applicantName"
                    required
                    type="text"
                    placeholder="Name of Applicant"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    name="fatherName"
                    required
                    type="text"
                    placeholder="Name of Father"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                  />
                  <input
                    name="aadharNo"
                    required
                    type="text"
                    placeholder="Aadhar no."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <select
                    name="class12Subjects"
                    defaultValue=""
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow text-gray-700 dark:text-gray-200"
                  >
                    <option value="" disabled>
                      Class XII SUBJECTS
                    </option>
                    <option value="Science (PCM)">Science (PCM)</option>
                    <option value="Science (PCB)">Science (PCB)</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts / Humanities">Arts / Humanities</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    name="bedRollNo"
                    required
                    type="text"
                    placeholder="B.Ed Roll No."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    name="bedSubjects"
                    required
                    type="text"
                    placeholder="Enter Subjects in B.Ed"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                  />
                  <input
                    name="collegeName"
                    required
                    type="text"
                    placeholder="Name of your college"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    name="contactNumber"
                    required
                    type="tel"
                    placeholder="Contact Number"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                  />
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                  />
                </div>

                {/* Address Section */}
                <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Address Details
                  </h4>
                  <input
                    name="addressLine1"
                    type="text"
                    placeholder="Address Line 1"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                  />
                  <input
                    name="addressLine2"
                    type="text"
                    placeholder="Address Line 2"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                  />
                  <input
                    name="city"
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                  />
                  <input
                    name="state"
                    type="text"
                    placeholder="State / Province / Region"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                  />
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      name="postalCode"
                      type="text"
                      placeholder="Postal Code"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                    />
                    <select
                      name="country"
                      defaultValue="India"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow text-gray-700 dark:text-gray-200"
                    >
                      <option value="Afghanistan">Afghanistan</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer group mb-2 ${
                      collegeLetterFile
                        ? "border-primary bg-primary/5"
                        : "border-gray-300 dark:border-gray-700 hover:border-primary/50"
                    }`}
                    onClick={() =>
                      document.getElementById("college-letter-upload")?.click()
                    }
                  >
                    <input
                      id="college-letter-upload"
                      type="file"
                      accept=".pdf,image/*"
                      onChange={(e) =>
                        setCollegeLetterFile(e.target.files?.[0] || null)
                      }
                      className="hidden"
                    />

                    {collegeLetterFile ? (
                      <div className="flex flex-col items-center gap-2 text-primary">
                        <Paperclip className="w-8 h-8" />
                        <span className="font-semibold">
                          {collegeLetterFile.name}
                        </span>
                        <span className="text-sm">
                          {(collegeLetterFile.size / (1024 * 1024)).toFixed(2)}{" "}
                          MB
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <Upload className="w-8 h-8 group-hover:text-primary transition-colors" />
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          Click or drag a file to this area to upload.
                        </p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    Upload a copy of letter from College
                  </p>
                </div>

                <textarea
                  name="message"
                  placeholder="Any Message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow resize-none"
                ></textarea>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-secondary text-white hover:text-black font-bold py-4 rounded-xl transition-all shadow-md shadow-primary/25 disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
