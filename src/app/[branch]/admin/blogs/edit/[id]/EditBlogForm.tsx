"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, ImagePlus, ArrowLeft, X, Tags } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { updateBlog } from "@/actions/blog";
import "react-quill-new/dist/quill.snow.css";

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

export default function EditBlogForm({
  blog,
  branch,
}: {
  blog: any;
  branch: string;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
    blog.thumbnail?.url || null,
  );
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>(blog.tags || []);

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
      title: blog.title,
      content: blog.content,
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
    if (!thumbnailUrl && !thumbnailFile) {
      toast.error("Please ensure a thumbnail image is present");
      return;
    }
    if (tags.length === 0) {
      toast.error("Please add at least one tag (e.g. 'news')");
      return;
    }

    setIsSubmitting(true);
    try {
      const blogData: any = {
        title: values.title,
        content: values.content,
        tags: tags,
      };

      if (thumbnailFile) {
        blogData.thumbnail = thumbnailFile;
      }

      const res = await updateBlog(blog._id, blogData);

      if (res.success) {
        toast.success("Blog updated successfully!");
        router.push(`../../blogs`);
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          href="../../blogs"
          className="p-2 bg-white dark:bg-neutral-900 text-gray-400 dark:text-neutral-500 hover:text-gray-900 dark:hover:text-gray-100 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Edit Blog
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Update the title, content, or tags of this existing blog.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 overflow-hidden transition-colors">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-8 space-y-8"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column */}
            <div className="flex-1 space-y-6">
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

              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Content <span className="text-red-500">*</span>
                </label>
                <div className="prose-container bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-700">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={(val) =>
                      setValue("content", val, { shouldValidate: true })
                    }
                    modules={modules}
                    className="bg-white dark:bg-neutral-950 min-h-[400px]"
                    placeholder="Write your amazing blog post here..."
                  />
                </div>
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.content.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-80 space-y-6">
              <div className="bg-gray-50 dark:bg-neutral-950 p-5 rounded-xl border border-gray-100 dark:border-neutral-800">
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">
                  <span className="flex items-center gap-2">
                    <ImagePlus size={16} className="text-primary" />
                    Thumbnail Image <span className="text-red-500">*</span>
                  </span>
                </label>

                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="block relative w-full aspect-video rounded-xl border-2 border-dashed border-gray-300 dark:border-neutral-700 hover:border-primary dark:hover:border-primary cursor-pointer overflow-hidden transition-colors bg-white dark:bg-neutral-900"
                  >
                    {thumbnailUrl ? (
                      <Image
                        src={thumbnailUrl}
                        alt="Thumbnail preview"
                        fill
                        className="object-cover transition-opacity group-hover:opacity-90"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 dark:text-neutral-500 space-y-2 p-4 text-center">
                        <ImagePlus size={32} className="opacity-50" />
                        <div className="text-sm font-medium">
                          Click to upload
                        </div>
                        <div className="text-xs opacity-75">
                          16:9 ratio recommended
                        </div>
                      </div>
                    )}
                  </label>
                  {thumbnailUrl && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setThumbnailUrl(null);
                        setThumbnailFile(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-neutral-950 p-5 rounded-xl border border-gray-100 dark:border-neutral-800">
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">
                  <span className="flex items-center gap-2">
                    <Tags size={16} className="text-primary" />
                    Tags <span className="text-red-500">*</span>
                  </span>
                </label>
                <div className="mb-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-colors bg-primary/10 dark:bg-secondary/20 text-primary dark:text-secondary border border-primary/20 dark:border-secondary/20"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className="p-0.5 hover:bg-primary/20 dark:hover:bg-primary/30 rounded-full transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  {tags.length === 0 && (
                    <span className="text-sm text-gray-400 dark:text-neutral-500 italic">
                      No tags selected.
                    </span>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-neutral-800 pt-4">
                  <p className="text-xs text-gray-500 dark:text-neutral-400 mb-3 font-medium uppercase tracking-wider">
                    Available Tags
                  </p>
                  <div className="flex flex-col gap-2">
                    {PREDEFINED_TAGS.map((tag) => (
                      <label
                        key={tag}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={tags.includes(tag)}
                          onChange={() => toggleTag(tag)}
                          className="w-4 h-4 rounded border-gray-300 dark:border-neutral-700 text-primary focus:ring-primary dark:bg-neutral-900 cursor-pointer"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 uppercase group-hover:text-primary dark:group-hover:text-secondary transition-colors font-medium">
                          {tag}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 dark:border-neutral-800 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary focus:ring-4 focus:ring-primary/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Update Blog"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
