const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  const blog = await db.collection('blogs').findOne({ title: /CBSE/i });
  if (blog) {
    console.log(blog.content);
  } else {
    console.log("Not found by title. Finding any blog...");
    const fallback = await db.collection('blogs').findOne({});
    console.log(fallback?.content);
  }
  process.exit(0);
}
run();
