import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { notFound } from "next/navigation";
import { getProspectus } from "@/actions/prospectus";

export default async function BranchLayout({
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

  return (
    <>
      <Navbar branch={branch} />
      <FloatingWhatsApp />
      <main className="min-h-screen">{children}</main>
      <Footer branch={branch} />
    </>
  );
}
