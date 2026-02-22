"use server";

import dbConnect from "@/lib/db";
import Blog from "@/lib/models/Blog";
import { revalidatePath } from "next/cache";
import { processAndUploadImage } from "@/lib/cloudinary";

async function uploadBlogThumbnail(file: File) {
  try {
    const res = await processAndUploadImage(file, "vishwanath-academy/blogs");
    return {
      success: true,
      url: res.secure_url,
      publicId: res.public_id,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function createBlog(data: any) {
  try {
    await dbConnect();

    if (data.thumbnail) {
      const res = await uploadBlogThumbnail(data.thumbnail);
      if (!res.success) {
        return { success: false, message: res.message };
      }
      data.thumbnail = { url: res.url, publicId: res.publicId };
    }

    // Generate slug from title
    let baseSlug = data.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    let slug = baseSlug;
    let count = 1;
    let exists = await Blog.findOne({ slug });
    while (exists) {
      slug = `${baseSlug}-${count}`;
      count++;
      exists = await Blog.findOne({ slug });
    }

    const newBlog = await Blog.create({
      ...data,
      slug,
    });

    revalidatePath("/blogs", "layout");

    return { success: true, data: JSON.parse(JSON.stringify(newBlog)) };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create blog",
    };
  }
}

export async function updateBlog(id: string, data: any) {
  try {
    await dbConnect();

    // If new thumbnail is provided
    if (data.thumbnail instanceof File) {
      const res = await uploadBlogThumbnail(data.thumbnail);
      if (!res.success) {
        return { success: false, message: res.message };
      }
      data.thumbnail = { url: res.url, publicId: res.publicId };
    } else {
      // Avoid overwriting existing thumbnail if no new file is passed
      delete data.thumbnail;
    }

    // Generate new slug if title changed, or keep it same if not
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) throw new Error("Blog not found");

    if (data.title && data.title !== existingBlog.title) {
      let baseSlug = data.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      let slug = baseSlug;
      let count = 1;
      let exists = await Blog.findOne({ slug, _id: { $ne: id } });
      while (exists) {
        slug = `${baseSlug}-${count}`;
        count++;
        exists = await Blog.findOne({ slug, _id: { $ne: id } });
      }
      data.slug = slug;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, data, { new: true });

    revalidatePath("/blogs", "layout");

    return { success: true, data: JSON.parse(JSON.stringify(updatedBlog)) };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update blog",
    };
  }
}

export async function getBlogs({
  page = 1,
  limit = 10,
  tag,
  search,
  sort = "newest", // newest, popular
}: {
  page?: number;
  limit?: number;
  tag?: string;
  search?: string;
  sort?: "newest" | "popular";
} = {}) {
  try {
    await dbConnect();

    const query: any = { isPublished: true };
    if (tag) {
      query.tags = tag.toLowerCase();
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    let sortQuery = {};
    if (sort === "popular") {
      sortQuery = { views: -1, createdAt: -1 };
    } else {
      sortQuery = { createdAt: -1 };
    }

    const blogs = await Blog.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Blog.countDocuments(query);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(blogs)),
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalBlogs: total,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch blogs",
    };
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    await dbConnect();

    const blog = await Blog.findOne({ slug, isPublished: true }).lean();

    if (!blog) {
      return { success: false, message: "Blog not found" };
    }

    return { success: true, data: JSON.parse(JSON.stringify(blog)) };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to fetch blog" };
  }
}

export async function incrementBlogViews(id: string) {
  try {
    await dbConnect();

    await Blog.findByIdAndUpdate(id, { $inc: { views: 1 } });
    revalidatePath("/blogs", "layout");

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteBlog(id: string) {
  try {
    await dbConnect();

    await Blog.findByIdAndDelete(id);
    revalidatePath("/blogs", "layout");

    return { success: true, message: "Blog deleted successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function getBlogById(id: string) {
  try {
    await dbConnect();
    const blog = await Blog.findById(id).lean();
    if (!blog) {
      return { success: false, message: "Blog not found" };
    }
    return { success: true, data: JSON.parse(JSON.stringify(blog)) };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to fetch blog" };
  }
}
