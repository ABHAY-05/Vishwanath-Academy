import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    thumbnail: {
      publicId: { type: String },
      url: { type: String, required: true },
    },
    author: { type: String, required: true },
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

async function seed() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    const slug = "educate-a-child-in-need";
    const existing = await Blog.findOne({ slug });

    if (existing) {
      console.log(`Blog with slug "${slug}" already exists. Updating...`);
      existing.title =
        "Educate a Child in Need with Quality Education for a Brighter Future in 2025";
      existing.thumbnail = {
        publicId: "custom_donation_mock",
        url: "/blogs/sponsor-a-child-in-need.jpeg",
      };
      existing.content =
        "<p>In today's world, one must Educate a Child in Need with Quality Education for a Brighter Future through your donations, education is a powerful tool that has the ability to transform lives and create a ripple effect of positive change.</p>";
      existing.author = "Vishwanath Academy";
      existing.isPublished = true;
      existing.tags = ["donation", "scholarship"];
      await existing.save();
      console.log("Updated successfully.");
    } else {
      console.log(`Creating mock blog for "${slug}"...`);
      await Blog.create({
        title:
          "Educate a Child in Need with Quality Education for a Brighter Future in 2025",
        slug,
        author: "Vishwanath Academy",
        thumbnail: {
          publicId: "custom_donation_mock",
          url: "/blogs/sponsor-a-child-in-need.jpeg",
        },
        content:
          "<p>In today's world, one must Educate a Child in Need with Quality Education for a Brighter Future through your donations, education is a powerful tool that has the ability to transform lives and create a ripple effect of positive change.</p>",
        tags: ["donation", "scholarship"],
        isPublished: true,
      });
      console.log("Created successfully.");
    }

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seed();
