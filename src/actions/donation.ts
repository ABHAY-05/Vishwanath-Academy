"use server";

import dbConnect from "@/lib/db";
import { Donation } from "@/lib/models/Donation";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitDonation(formData: {
  name: string;
  mobile: string;
  email: string;
  amount: number;
  transactionId: string;
}) {
  try {
    await dbConnect();

    if (
      !formData.name ||
      !formData.mobile ||
      !formData.email ||
      !formData.amount ||
      !formData.transactionId
    ) {
      return { success: false, error: "All fields are required" };
    }

    const newDonation = await Donation.create(formData);

    // Send Notification Email to Admin
    try {
      await resend.emails.send({
        from: "Vishwanath Academy <onboarding@resend.dev>",
        to: [process.env.BLOG_EMAIL || "vna.lko@gmail.com"],
        subject: `New Child Sponsorship Donation: ₹${formData.amount}`,
        html: `
          <h2>New Child Sponsorship Donation Submitted</h2>
          <p>A new sponsor has submitted their details for the "Educate a Child in Need in 2025" program.</p>
          <hr />
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Mobile:</strong> ${formData.mobile}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Amount:</strong> ₹${formData.amount}</p>
          <p><strong>Transaction ID (UTR):</strong> ${formData.transactionId}</p>
          <hr />
          <p><em>Please verify this UTR number in your bank statement.</em></p>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send donation notification email:", emailError);
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newDonation)),
    };
  } catch (error: any) {
    console.error("Failed to submit donation:", error);
    if (error.code === 11000) {
      return {
        success: false,
        error: "This Transaction ID (UTR) has already been submitted.",
      };
    }
    return { success: false, error: "Failed to submit donation" };
  }
}
