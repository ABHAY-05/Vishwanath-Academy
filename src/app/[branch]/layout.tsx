import { notFound } from "next/navigation";

export default async function BranchRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;

  // Strict branch validation
  if (branch !== "aashiana" && branch !== "dhawapur") {
    notFound();
  }

  return <>{children}</>;
}
