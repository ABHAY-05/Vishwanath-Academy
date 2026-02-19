"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;
  const branch = formData.get("branch") as string;

  try {
    const { data, error } = await resend.emails.send({
      from: "Vishwanath Academy <onboarding@resend.dev>", // Update this with your verified domain later
      to: ["vna.lko@gmail.com"], // Replace with school email or dynamic based on branch
      subject: `New Contact Form Submission: ${subject} (${branch})`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Branch:</strong> ${branch}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error: "Failed to send email." };
    }

    return { success: true };
  } catch (error) {
    console.error("Server Error:", error);
    return { success: false, error: "Something went wrong." };
  }
}
