import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Prospectus from "@/lib/models/prospectus";
import { revalidatePath } from "next/cache";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Generate a client token for the browser to upload the file
        // Make sure to authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.

        return {
          allowedContentTypes: ["application/pdf"],
          maximumSizeInBytes: 200 * 1024 * 1024, // 200MB limit
          validUntil: Date.now() + 1000 * 60 * 5, // 5 minutes validity
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({
            // optional, sent to your server on upload completion
            action: "upload_prospectus",
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Called by Vercel API on client upload completion
        console.log("blob upload completed", blob, tokenPayload);

        try {
          await dbConnect();
          const existing = await Prospectus.findOne();

          // Update the database with the new URL directly from the Webhook
          if (existing) {
            existing.pdf = {
              url: blob.url,
              publicId: blob.pathname,
            };
            await existing.save();
          } else {
            await Prospectus.create({
              pdf: {
                url: blob.url,
                publicId: blob.pathname,
              },
            });
          }

          revalidatePath(`/aashiana/admin/prospectus`);
          revalidatePath(`/dhawapur/admin/prospectus`);
          revalidatePath(`/aashiana`);
          revalidatePath(`/dhawapur`);
        } catch (error) {
          throw new Error("Could not update database record");
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Vercel handleUpload Error on Server:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }, // The webhook will retry 5 times waiting for a 200
    );
  }
}
