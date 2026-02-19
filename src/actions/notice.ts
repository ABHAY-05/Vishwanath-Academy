"use server";

import dbConnect from "@/lib/db";
import Notice from "@/lib/models/Notice";
import { revalidatePath } from "next/cache";

export async function getNotices(branch: string) {
  await dbConnect();
  const notices = await Notice.find({ branch }).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(notices));
}

import { currentUser } from "@clerk/nextjs/server";

export async function createNotice(formData: FormData) {
  await dbConnect();
  const user = await currentUser();
  console.log("DEBUG: Current User from Clerk:", JSON.stringify(user, null, 2));

  let authorName = "Admin";
  if (user) {
    if (user.firstName && user.lastName) {
      authorName = `${user.firstName} ${user.lastName}`;
    } else if (user.firstName) {
      authorName = user.firstName;
    } else if (user.username) {
      authorName = user.username;
    } else if (user.emailAddresses?.[0]?.emailAddress) {
      authorName = user.emailAddresses[0].emailAddress.split("@")[0];
    } else if (user.emailAddresses?.[0]?.emailAddress) {
      authorName = user.emailAddresses[0].emailAddress.split("@")[0];
    }
  }
  console.log("DEBUG: Final Author Name:", authorName);

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const branch = formData.get("branch") as string;
  const date = formData.get("date") as string;
  const pdfLink = formData.get("pdfLink") as string;

  if (!title || !description || !branch) {
    throw new Error("Missing required fields");
  }

  await Notice.create({
    title,
    description,
    branch,
    createdAt: date ? new Date(date) : new Date(),
    pdfLink,
    author: authorName,
  });

  revalidatePath(`/${branch}/admin/notices`);
  revalidatePath(`/${branch}/admin`);
  revalidatePath(`/${branch}`);
  revalidatePath(`/${branch}/notice-board`);
}

export async function updateNotice(
  id: string,
  branch: string,
  formData: FormData,
) {
  await dbConnect();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const pdfLink = formData.get("pdfLink") as string;

  if (!title || !description) {
    throw new Error("Missing required fields");
  }

  await Notice.findByIdAndUpdate(id, {
    title,
    description,
    createdAt: date ? new Date(date) : new Date(),
    pdfLink,
  });

  revalidatePath(`/${branch}/admin/notices`);
  revalidatePath(`/${branch}/admin`);
  revalidatePath(`/${branch}`);
}

export async function deleteNotice(id: string, branch: string) {
  await dbConnect();
  await Notice.findByIdAndDelete(id);
  revalidatePath(`/${branch}/admin/notices`);
  revalidatePath(`/${branch}/admin`);
  revalidatePath(`/${branch}`);
}
