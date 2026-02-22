import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/:branch",
  "/:branch/about(.*)",
  "/:branch/results(.*)",
  "/:branch/admissions(.*)",
  "/:branch/academics(.*)",
  "/:branch/students(.*)",
  "/:branch/notice-board(.*)",
  "/:branch/contact(.*)",
  "/api/webhooks(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/blogs(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // Handle subdomain rewriting
  const isBlogsSubdomain =
    hostname.startsWith("blog.") ||
    hostname === "blog.localhost:3000" ||
    hostname === "blog.vishwanath-academy-mu.vercel.app/" ||
    hostname === "blog.vishwanathacademy.com";

  if (isBlogsSubdomain) {
    url.pathname = `/blogs${url.pathname === "/" ? "" : url.pathname}`;
    // Clone headers to pass 'x-url' forward if needed for layouts
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url", request.url);

    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Handle standard protection
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
