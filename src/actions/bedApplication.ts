"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitBedApplication(formData: FormData) {
  try {
    const applicantName = formData.get("applicantName") as string;
    const fatherName = formData.get("fatherName") as string;
    const aadharNo = formData.get("aadharNo") as string;
    const class12Subjects = formData.get("class12Subjects") as string;
    const bedRollNo = formData.get("bedRollNo") as string;
    const bedSubjects = formData.get("bedSubjects") as string;
    const collegeName = formData.get("collegeName") as string;
    const contactNumber = formData.get("contactNumber") as string;
    const email = formData.get("email") as string;

    // Address
    const addressLine1 = formData.get("addressLine1") as string;
    const addressLine2 = formData.get("addressLine2") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const postalCode = formData.get("postalCode") as string;
    const country = formData.get("country") as string;

    const message = formData.get("message") as string;
    const branch = formData.get("branch") as string; // Current branch portal they applied from

    // File
    const collegeLetter = formData.get("collegeLetter") as File;

    if (
      !applicantName ||
      !fatherName ||
      !aadharNo ||
      !bedRollNo ||
      !collegeName ||
      !contactNumber ||
      !email ||
      !collegeLetter
    ) {
      return {
        success: false,
        message:
          "Please fill in all required fields and upload the college letter.",
      };
    }

    // Convert file to base64 buffer for Resend attachment
    const arrayBuffer = await collegeLetter.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // HTML Email Template
    const htmlContent = `
      <h2>New B.Ed Training Application</h2>
      <p><strong>Submitted from Branch Portal:</strong> ${branch}</p>
      
      <h3>Applicant Details</h3>
      <ul>
        <li><strong>Name of Applicant:</strong> ${applicantName}</li>
        <li><strong>Name of Father:</strong> ${fatherName}</li>
        <li><strong>Aadhar No.:</strong> ${aadharNo}</li>
        <li><strong>Contact Number:</strong> ${contactNumber}</li>
        <li><strong>Email:</strong> ${email}</li>
      </ul>
      
      <h3>Academic Details</h3>
      <ul>
        <li><strong>Class XII Subjects:</strong> ${class12Subjects || "N/A"}</li>
        <li><strong>B.Ed Roll No.:</strong> ${bedRollNo}</li>
        <li><strong>Subjects in B.Ed:</strong> ${bedSubjects || "N/A"}</li>
        <li><strong>Name of College:</strong> ${collegeName}</li>
      </ul>

      <h3>Address Details</h3>
      <ul>
        <li><strong>Address Line 1:</strong> ${addressLine1 || "N/A"}</li>
        <li><strong>Address Line 2:</strong> ${addressLine2 || "N/A"}</li>
        <li><strong>City:</strong> ${city || "N/A"}</li>
        <li><strong>State/Province/Region:</strong> ${state || "N/A"}</li>
        <li><strong>Postal Code:</strong> ${postalCode || "N/A"}</li>
        <li><strong>Country:</strong> ${country || "N/A"}</li>
      </ul>
      
      <h3>Additional Message</h3>
      <p>${message || "No message provided."}</p>
      
      <p><em>A copy of the letter from the College is attached to this email.</em></p>
    `;

    const { data, error } = await resend.emails.send({
      from: "B.Ed App Portal <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL || "vishwanathacademy22@gmail.com"],
      subject: `New B.Ed Training Application: ${applicantName} (${branch})`,
      html: htmlContent,
      replyTo: email,
      attachments: [
        {
          filename: collegeLetter.name,
          content: buffer,
        },
      ],
    });

    if (error) {
      console.error("Resend Error:", error);
      return {
        success: false,
        message: "Failed to send application. Please try again.",
      };
    }

    return {
      success: true,
      message: "B.Ed Training Application submitted successfully!",
    };
  } catch (error: any) {
    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: "A server error occurred. Please try again later.",
    };
  }
}
