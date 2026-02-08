import { currentUser } from "@clerk/nextjs/server";

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;
  const user = await currentUser();

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-6">
        Blog Management
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400">
        Manage blogs and news for {branch} branch.
      </p>
      {/* TODO: Implement blog CRUD */}
      <div className="mt-8 p-8 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl text-center">
        <p className="text-neutral-500">
          Blog management interface coming soon...
        </p>
      </div>
    </div>
  );
}
