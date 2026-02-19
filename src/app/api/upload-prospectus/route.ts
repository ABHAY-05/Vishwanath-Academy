import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Authenticate the user here if needed, or simply return an allowed token
        // Since this is for the prospectus, we allow it. Normally you'd verify Clerk session here.
        return {
          allowedContentTypes: ["application/pdf"],
          maximumSizeInBytes: 100 * 1024 * 1024, // 100MB limit
          validUntil: Date.now() + 1000 * 60 * 5, // 5 minutes validity
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Vercel Blob requires this callback to exist to finalize the upload connection.
        // We do the actual database saving on the client-side to avoid localhost webhook routing issues.
        console.log("Blob upload completed:", blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    ); // The webhook will retry 5 times waiting for a 200
  }
}
