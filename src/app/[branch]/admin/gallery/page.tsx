import GalleryUpload from "@/components/GalleryUpload";
import GalleryList from "@/components/GalleryList";
import { getGalleryImages } from "@/actions/gallery";

export default async function GalleryAdminPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;

  const { data: images } = await getGalleryImages(branch);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          Gallery Management
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Upload and manage photos for {branch} branch.
        </p>
      </div>

      <GalleryUpload branch={branch} />

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
          Library
        </h2>
        <GalleryList images={images} branch={branch} />
      </div>
    </div>
  );
}
