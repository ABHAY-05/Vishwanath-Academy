import { getBlogById } from "@/actions/blog";
import EditBlogForm from "./EditBlogForm";
import { notFound } from "next/navigation";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ branch: string; id: string }>;
}) {
  const resolvedParams = await params;
  
  const res = await getBlogById(resolvedParams.id);
  
  if (!res.success || !res.data) {
    return notFound();
  }

  return <EditBlogForm blog={res.data} branch={resolvedParams.branch} />;
}
