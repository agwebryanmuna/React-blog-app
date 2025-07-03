import Post from "../models/post.model.js";
import imagekit from "../config/imagekit.js";
import { getAuth } from "@clerk/express";

// GET ALL POSTS
export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  // get posts from db with 'limit' and skip pages based on limit => limit = 5, skip 5 posts for next page
  const posts = await Post.find({})
    .populate("user", "username")
    .skip((page - 1) * limit)
    .limit(limit);

  const totalPosts = await Post.countDocuments();
  const hasMore = page * limit < totalPosts;

  res.status(200).json({ posts, hasMore });
};

// GET SINGLE POST
export const getPost = async (req, res) => {
  const { slug } = req.params;
  const post = await Post.findOne({ slug }).populate("user", [
    "username",
    "img",
  ]);
  res.status(200).json({ post });
};

// CREATE POST
export const createPost = async (req, res) => {
  const { _id: userId } = req.user;

  // Handle all whitespace (tabs, multiple spaces, etc.) and clean up nicely:
  let slug = req.body.title.trim().toLowerCase().replace(/\s+/g, "-");

  let existingSlug = await Post.find({ slug });

  let count = 0;
  if (existingSlug.length > 0) {
    count = existingSlug.length + 1;
    slug = slug + "-" + count;
  }

  // TODO:
  // MAKE SURE THERE ARE NO DUPLICATE TITLES IN DB

  const newPost = await Post.create({
    user: userId,
    slug,
    ...req.body,
  });
  res.status(200).json({ newPost });
};

// DELETE POST
export const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  const { _id: userId } = req.user;

  const deletedPost = await Post.findOneAndDelete({
    _id: postId,
    user: userId,
  });

  if (!deletedPost)
    return res.status(403).json("You can only delete your posts!");

  // remove post from other users savedPosts
  await User.updateMany(
    { savedPosts: postId },
    { $pull: { savedPosts: postId } }
  );
  res.status(200).json({ message: "Post has been deleted" });
};

// FEATURE POST
export const featurePost = async (req, res) => {
  const { sessionClaims } = getAuth(req);

  const role = sessionClaims.metadata.role || "user";

  if (role === "admin") {
    const postId = req.body.postId;
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found!" });
    const isFeatured = post.isFeatured;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { isFeatured: !isFeatured },
      { new: true }
    );
    return res.status(200).json({ updatedPost });
  }

  return res.status(403).json({ message: "You cannot feature post" });
};

// UPLOAD FILES
export const uploadFiles = async (req, res) => {
  const { token, expire, signature } = imagekit.getAuthenticationParameters();
  res.send({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
};
