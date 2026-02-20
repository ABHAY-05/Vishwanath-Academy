"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitCareerApplication(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const mobileNo = formData.get("mobileNo") as string;
    const email = formData.get("email") as string;
    const position = formData.get("position") as string;
    const classes = formData.get("classes") as string;
    const subjects = formData.get("subjects") as string;
    const medium = formData.get("medium") as string;
    const experienceLevel = formData.get("experienceLevel") as string;
    const lastSalary = formData.get("lastSalary") as string;
    const branch = formData.get("branch") as string;

    // Files (Up to 2)
    const files: File[] = [];
    for (let i = 0; i < 2; i++) {
      const file = formData.get(`resume_${i}`) as File;
      if (file) files.push(file);
    }

    if (
      !fullName ||
      !mobileNo ||
      !email ||
      !position ||
      !branch ||
      files.length === 0
    ) {
      return {
        success: false,
        message:
          "Please fill in all required fields and attach at least one document.",
      };
    }

    // Convert files to base64 buffers for Resend attachments
    const attachments = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return {
          filename: file.name,
          content: buffer,
        };
      }),
    );

    // HTML Email Template
    const htmlContent = `
      <h2>New Career Application</h2>
      <p><strong>Applying to Branch:</strong> ${branch}</p>
      <h3>Applicant Details</h3>
      <ul>
        <li><strong>Full Name:</strong> ${fullName}</li>
        <li><strong>Mobile No (WhatsApp):</strong> ${mobileNo}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Position Applied:</strong> ${position}</li>
      </ul>
      
      <h3>Professional Details</h3>
      <ul>
        <li><strong>Classes to Teach:</strong> ${classes || "N/A"}</li>
        <li><strong>Subjects:</strong> ${subjects || "N/A"}</li>
        <li><strong>Teaching Medium:</strong> ${medium || "N/A"}</li>
        <li><strong>Experience Level:</strong> ${experienceLevel || "N/A"}</li>
        <li><strong>Last Salary Drawn:</strong> ${lastSalary || "N/A"}</li>
      </ul>
      
      <p><em>The applicant's documents (${files.length}) are attached to this email.</em></p>
    `;

    const { data, error } = await resend.emails.send({
      from: "Career Portal <onboarding@resend.dev>", // Replace with verified domain if available
      to: [process.env.CONTACT_EMAIL || "vishwanathacademy22@gmail.com"],
      subject: `New Career Application: ${fullName} - ${position} (${branch})`,
      html: htmlContent,
      replyTo: email,
      attachments: attachments,
    });

    if (error) {
      console.error("Resend Error:", error);
      return {
        success: false,
        message: "Failed to send application. Please try again.",
      };
    }

    return { success: true, message: "Application submitted successfully!" };
  } catch (error: any) {
    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: "A server error occurred. Please try again later.",
    };
  }
}
