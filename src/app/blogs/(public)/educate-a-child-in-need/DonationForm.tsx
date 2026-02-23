"use client";

import { useState } from "react";
import { submitDonation } from "@/actions/donation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function DonationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      mobile: formData.get("mobile") as string,
      email: formData.get("email") as string,
      amount: Number(formData.get("amount")),
      transactionId: formData.get("transactionId") as string,
    };

    const res = await submitDonation(data);

    if (res.success) {
      toast.success(
        "Thank you! Your donation details have been submitted successfully.",
      );
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(res.error || "Failed to submit. Please try again.");
    }

    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="name"
          className="text-sm font-bold text-gray-900 dark:text-gray-200"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Enter your name"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="mobile"
          className="text-sm font-bold text-gray-900 dark:text-gray-200"
        >
          Mobile No.
        </label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          required
          placeholder="Enter your mobile number"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          We want to stay connected with you through whatsapp.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-sm font-bold text-gray-900 dark:text-gray-200"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Enter your email"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="amount"
          className="text-sm font-bold text-gray-900 dark:text-gray-200"
        >
          Donation Amount (INR)
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          required
          min="1"
          placeholder="Enter Your Donation amount"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Support a child by giving a small contribution. This contribution will
          be utilised in their tuition fees and books.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="transactionId"
          className="text-sm font-bold text-gray-900 dark:text-gray-200"
        >
          Payment Transaction ID (UTR Number)
        </label>
        <input
          type="text"
          id="transactionId"
          name="transactionId"
          required
          placeholder="Enter UTR Number from your payment app"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Support a child by giving a small contribution. This contribution will
          be utilised in their tuition fees and books.
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary dark:bg-secondary hover:bg-primary/90 dark:hover:bg-secondary/90 text-white font-bold rounded-lg transition-colors focus:ring-4 focus:ring-primary/20 dark:focus:ring-secondary/20 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Submitting...
          </>
        ) : (
          "Submit Donation Details"
        )}
      </button>
    </form>
  );
}
