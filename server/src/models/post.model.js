import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    img: { type: String },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String },
    content: { type: String, required: true },
    category: { type: String, default: 'general'},
    isFeatured: { type: Boolean, default: false },
    visit: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post = mongoose.model.posts || mongoose.model("Post", postSchema);

export default Post;
