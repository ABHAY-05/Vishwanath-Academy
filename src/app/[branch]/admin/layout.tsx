import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;
  const user = await currentUser();

  // Strict branch-based authorization
  const username = user?.username?.toLowerCase();
  const isAuthorized =
    (branch === "dhawapur" && username === "admin_dhawapur") ||
    (branch === "aashiana" && username === "admin_aashiana");

  if (!user || !isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-950 p-4 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600">
          Access Restricted
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-md mb-8">
          You are not authorized to view the admin dashboard for{" "}
          <span className="capitalize font-bold text-neutral-900 dark:text-white">
            {branch}
          </span>
          .
          <br />
          Please sign in with the correct branch administrator account.
        </p>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
      {/* Responsive Sidebar */}
      <AdminSidebar
        branch={branch}
        username={user.username || user.firstName || "Admin"}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative scroll-smooth">
        <div
          className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("/pattern-grid.svg")`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 p-4 md:p-8 pt-16 md:pt-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
