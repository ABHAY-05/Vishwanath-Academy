"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Send,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Phone,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { getCareerImage } from "@/actions/careerImage";
import { submitCareerApplication } from "@/actions/career";

export default function CareerPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const [activeBranch, setActiveBranch] = useState<string>("aashiana");
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [loadingPoster, setLoadingPoster] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // File state (up to 2 files)
  const [resumeFiles, setResumeFiles] = useState<File[]>([]);

  useEffect(() => {
    params.then((p) => setActiveBranch(p.branch));
    fetchPoster();
  }, [params]);

  const fetchPoster = async () => {
    const res = await getCareerImage();
    if (res.success && res.data) {
      setPosterUrl(res.data.image.url);
    }
    setLoadingPoster(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (resumeFiles.length === 0) {
      toast.error("Please attach at least one document (Resume/Photo).");
      return;
    }

    if (resumeFiles.length > 2) {
      toast.error("You can only upload up to 2 documents.");
      return;
    }

    // Size check max 4MB per file
    for (const file of resumeFiles) {
      if (file.size > 4 * 1024 * 1024) {
        toast.error(`File ${file.name} is larger than 4MB.`);
        return;
      }
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    // Append files
    resumeFiles.forEach((file, index) => {
      formData.append(`resume_${index}`, file);
    });

    // Explicitly add branch if they forgot to select, fallback to current route branch
    if (!formData.get("branch")) {
      formData.append("branch", activeBranch);
    }

    const res = await submitCareerApplication(formData);

    if (res.success) {
      setSubmitSuccess(true);
      toast.success(res.message);
      (e.target as HTMLFormElement).reset();
      setResumeFiles([]);
      // reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } else {
      toast.error(res.message);
    }
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-24 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 dark:bg-primary/10 -skew-y-3 origin-top-left -z-10" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-neutral-900 dark:text-white mb-4">
            Join Our <span className="text-primary">Team</span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Shape the future of education at Vishwanath Academy. We're always
            looking for passionate educators and professionals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: Application Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-gray-800 p-8"
          >
            <div className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-full font-bold mb-8 shadow-md">
              Send your Resume
            </div>

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
                    Application Sent!
                  </h3>
                  <p className="text-green-700 dark:text-green-300">
                    Thank you for applying to Vishwanath Academy. Our HR
                    department will review your profile and get back to you if
                    your qualifications match our requirements.
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
                  className="space-y-5"
                >
                  <input
                    name="fullName"
                    required
                    type="text"
                    placeholder="Enter your full Name *"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                  />
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      name="mobileNo"
                      required
                      type="tel"
                      placeholder="Your Mobile No. which is also on whatsapp *"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                    />
                  </div>
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="Enter your Email ID *"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                  />

                  <select
                    name="position"
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow text-gray-700 dark:text-gray-200"
                  >
                    <option value="" disabled>
                      Select the position you are applying for. *
                    </option>
                    <option value="Principle">Principle</option>
                    <option value="Vice Principle">Vice Principle</option>
                    <option value="Academic Incharge">Academic Incharge</option>
                    <option value="PGT">PGT</option>
                    <option value="TGT">TGT</option>
                    <option value="PRT">PRT</option>
                    <option value="NTT">NTT</option>
                    <option value="Art and Craft Teacher">
                      Art and Craft Teacher
                    </option>
                    <option value="Librarian">Librarian</option>
                    <option value="Physical Education Teacher (PET)">
                      Physical Education Teacher (PET)
                    </option>
                    <option value="Music Teacher">Music Teacher</option>
                    <option value="Karate Teacher">Karate Teacher</option>
                    <option value="Dance Teacher">Dance Teacher</option>
                    <option value="Reception (Front Office)">
                      Reception (Front Office)
                    </option>
                    <option value="Head Accountant">Head Accountant</option>
                    <option value="Office Clerk">Office Clerk</option>
                    <option value="HR">HR</option>
                    <option value="Sales Executive">Sales Executive</option>
                    <option value="Lab Assistant (Science/Computer)">
                      Lab Assistant (Science/Computer)
                    </option>
                    <option value="Yoga Teacher">Yoga Teacher</option>
                    <option value="Aaya">Aaya</option>
                    <option value="Bus/Van Driver">Bus/Van Driver</option>
                    <option value="Bus Conductor">Bus Conductor</option>
                    <option value="Guard">Guard</option>
                    <option value="Sweeper">Sweeper</option>
                  </select>

                  <select
                    name="classes"
                    defaultValue=""
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow text-gray-700 dark:text-gray-200"
                  >
                    <option value="" disabled>
                      Select classes you want to apply
                    </option>
                    <option value="Nursery - LKG - UKG">
                      Nursery - LKG - UKG
                    </option>
                    <option value="I and II">I and II</option>
                    <option value="III to V">III to V</option>
                    <option value="VI to VIII">VI to VIII</option>
                    <option value="VII to X">VII to X</option>
                    <option value="IX to XII">IX to XII</option>
                    <option value="IX and X only">IX and X only</option>
                    <option value="XI and XII only">XI and XII only</option>
                  </select>

                  <textarea
                    name="subjects"
                    placeholder="Write subjects you want to teach and have experience. (Max 20 words)"
                    rows={2}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow resize-none"
                  ></textarea>

                  <select
                    name="medium"
                    defaultValue=""
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow text-gray-700 dark:text-gray-200"
                  >
                    <option value="" disabled>
                      Select your medium of teaching
                    </option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Both">Both (English & Hindi)</option>
                  </select>

                  <select
                    name="experienceLevel"
                    defaultValue=""
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow text-gray-700 dark:text-gray-200"
                  >
                    <option value="" disabled>
                      Select Experience Level
                    </option>
                    <option value="Fresher">Fresher</option>
                    <option value="1-3 Years">1-3 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>

                  <input
                    name="lastSalary"
                    type="text"
                    placeholder="Your last salary drawn (May ask to present salary slip at the time of interview)"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                  />

                  <div>
                    <div
                      className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer group ${
                        resumeFiles.length > 0
                          ? "border-primary bg-primary/5"
                          : "border-gray-300 dark:border-gray-700 hover:border-primary/50"
                      }`}
                      onClick={() =>
                        document.getElementById("resume-upload")?.click()
                      }
                    >
                      <input
                        id="resume-upload"
                        type="file"
                        accept=".pdf,image/*"
                        multiple
                        onChange={(e) => {
                          if (e.target.files) {
                            const newFiles = Array.from(e.target.files);
                            setResumeFiles((prev) => {
                              const combined = [...prev, ...newFiles];
                              return combined.slice(0, 2);
                            });
                          }
                        }}
                        className="hidden"
                      />
                      {resumeFiles.length > 0 ? (
                        <div className="flex flex-col items-center gap-3">
                          {resumeFiles.map((file, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-primary bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-primary/20 shadow-sm w-full max-w-[300px]"
                            >
                              <Paperclip className="w-5 h-5 shrink-0" />
                              <div className="flex flex-col items-start overflow-hidden">
                                <span className="font-semibold truncate w-full text-sm">
                                  {file.name}
                                </span>
                                <span className="text-xs text-primary/70">
                                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                                </span>
                              </div>
                            </div>
                          ))}
                          {resumeFiles.length < 2 && (
                            <p className="text-xs text-gray-500 mt-2 font-medium bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                              Click to add {2 - resumeFiles.length} more file(s)
                            </p>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setResumeFiles([]);
                            }}
                            className="text-xs text-red-500 hover:text-red-700 hover:underline mt-1"
                          >
                            Clear files
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-500">
                          <Upload className="w-8 h-8 group-hover:text-primary transition-colors" />
                          <p className="font-medium text-gray-700 dark:text-gray-300">
                            Click or drag files to this area to upload. *
                          </p>
                          <p className="text-xs">
                            You can upload up to 2 files.
                          </p>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                      Please submit your updated Resume, including detailed
                      qualifications, academic information, contact details, and
                      recent color photographs. Maximum file upload size is 4MB
                      per file in PDF or Image format.
                    </p>
                  </div>

                  <select
                    name="branch"
                    required
                    defaultValue={activeBranch}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent font-bold focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                  >
                    <option value="" disabled>
                      Select branch where you want to work *
                    </option>
                    <option value="Aashiana">Aashiana Branch</option>
                    <option value="Dhawapur">Dhawapur Branch</option>
                  </select>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-secondary text-white hover:text-black font-bold py-4 rounded-xl transition-all shadow-md shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
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

          {/* RIGHT: Current Openings / Poster */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-28"
          >
            <div className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-full font-bold mb-6 shadow-md">
              Current Openings
            </div>

            {loadingPoster ? (
              <div className="w-full aspect-[4/5] bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse flex items-center justify-center border border-gray-200 dark:border-gray-700">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : posterUrl ? (
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
                <Image
                  src={posterUrl}
                  alt="Current Openings"
                  width={800}
                  height={1000}
                  className="w-full h-auto object-contain"
                />
              </div>
            ) : (
              <div className="w-full p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 text-center flex flex-col items-center justify-center gap-4">
                <AlertCircle className="w-12 h-12 text-blue-500 opacity-50" />
                <p className="text-blue-900 dark:text-blue-200 font-medium">
                  No specific openings graphic provides currently.
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  However, you may still submit your resume using the form. All
                  candidates must be fluent in English & Computer savvy.
                </p>
              </div>
            )}

            <div className="mt-8 space-y-4 text-sm text-neutral-600 dark:text-neutral-400 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <p>
                <strong className="text-primary font-bold">
                  Latest Resume
                </strong>{" "}
                must be submitted in school office (with academic documents and
                photograph) in both Aashiana and Dhawapur Branch but{" "}
                <strong className="text-neutral-900 dark:text-white">
                  Interview and demo will be taken in Head Office Only.
                </strong>
              </p>
              <p>Stay connected for the latest requirements.</p>
              <p>
                <strong>Note:</strong> All candidates must be fluent in English
                & Computer savvy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
