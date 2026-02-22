"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dynamic from "next/dynamic";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, ImagePlus, ArrowLeft, X, Tags } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { createBlog } from "@/actions/blog";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-64 sm:h-96 w-full animate-pulse bg-gray-100 rounded-xl" />
  ),
});

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
});

export default function NewBlogPage() {
  const { user } = useUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const PREDEFINED_TAGS = [
    "news",
    "general",
    "notice",
    "students corner",
    "parents corner",
    "school results",
    "information",
    "activities",
    "affiliation",
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const content = watch("content");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setThumbnailFile(file);
    setThumbnailUrl(URL.createObjectURL(file));
  };

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      if (tags.length >= 10) {
        toast.error("You can only add up to 10 tags");
        return;
      }
      setTags([...tags, tag]);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!thumbnailFile) {
      toast.error("Please upload a thumbnail image");
      return;
    }
    if (tags.length === 0) {
      toast.error("Please add at least one tag (e.g. 'news')");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Determine Author Name
      const authorName =
        user?.fullName ||
        `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
        "Admin";

      // 2. Save Blog to DB
      const blogData = {
        title: values.title,
        content: values.content,
        tags: tags,
        thumbnail: thumbnailFile,
        author: authorName,
      };

      const res = await createBlog(blogData);

      if (res.success) {
        toast.success("Blog published successfully!");
        router.push("../blogs");
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // React Quill Modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [
        { align: [] },
        { list: "ordered" },
        { list: "bullet" },
        { list: "check" },
        { indent: "-1" },
        { indent: "+1" },
        { script: "sub" },
        { script: "super" },
      ],
      ["link", "image", "video", "formula"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6 md:mb-8">
        <Link
          href="../blogs"
          className="p-2 bg-white dark:bg-neutral-900 text-gray-400 dark:text-neutral-500 hover:text-gray-900 dark:hover:text-gray-100 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Create New Blog
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Write and publish a new article to the blogs subdomain.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 overflow-hidden transition-colors">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-8 space-y-8"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Essential details */}
            <div className="flex-1 space-y-6">
              {/* Blog Title */}
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("title")}
                  type="text"
                  placeholder="Enter an engaging title..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all dark:text-gray-100"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Tags Input */}
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Tags <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {PREDEFINED_TAGS.map((tag) => (
                    <label
                      key={tag}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors text-sm font-semibold ${
                        tags.includes(tag)
                          ? "bg-primary/10 border-primary text-primary dark:bg-secondary/20 dark:border-secondary/50 dark:text-secondary"
                          : "bg-gray-50 dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={tags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="hidden"
                      />
                      <span className="capitalize">{tag}</span>
                    </label>
                  ))}
                  {tags.length === 0 && (
                    <p className="text-xs text-gray-400 mt-2 w-full">
                      At least 1 tag is required for homepage categorisation.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Thumbnail */}
            <div className="w-full lg:w-72 shrink-0">
              <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                Featured Image <span className="text-red-500">*</span>
              </label>
              <div className="relative w-full aspect-video lg:aspect-square bg-gray-50 dark:bg-neutral-950 border-2 border-dashed border-gray-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors group">
                {thumbnailUrl ? (
                  <>
                    <Image
                      src={thumbnailUrl}
                      alt="Thumbnail preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-medium flex items-center gap-2">
                        <ImagePlus size={18} /> Change Image
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <ImagePlus size={32} className="mb-2 opacity-50" />
                    <span className="text-sm font-medium">
                      Click to upload image
                    </span>
                    <span className="text-xs text-gray-500 mt-1 pb-4">
                      16:9 recommended
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-neutral-800 pt-8">
            <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
              Body Content <span className="text-red-500">*</span>
            </label>
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 overflow-hidden [&_.ql-toolbar]:bg-gray-50 dark:[&_.ql-toolbar]:bg-neutral-950 [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-200 dark:[&_.ql-toolbar]:border-neutral-800 [&_.ql-container]:border-none [&_.ql-container]:text-base [&_.ql-container]:font-sans [&_.ql-editor]:min-h-[400px] dark:[&_.ql-editor]:text-gray-100 dark:[&_.ql-stroke]:stroke-gray-400 dark:[&_.ql-fill]:fill-gray-400 dark:[&_.ql-picker]:text-gray-400">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={(val) => setValue("content", val)}
                modules={modules}
                placeholder="Start writing the article here..."
              />
            </div>
            {errors.content && (
              <p className="text-red-500 text-sm mt-2">
                {errors.content.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100 dark:border-neutral-800">
            <Link
              href="../blogs"
              className="px-6 py-3 bg-gray-50 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors text-sm"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm min-w-[160px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Blog"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
