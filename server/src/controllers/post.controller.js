import Post from "../models/post.model.js";
import imagekit from "../config/imagekit.js";

// GET ALL POSTS
export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  // get posts from db with 'limit' and skip pages based on limit => limit = 5, skip 5 posts for next page
  const posts = await Post.find({})
    .skip((page - 1) * limit)
    .limit(limit);

  const totalPosts = await Post.countDocuments();
  const hasMore = page * limit < totalPosts;

  res.status(200).json({ posts, hasMore });
};

// GET SINGLE POST
export const getPost = async (req, res) => {
  const { slug } = req.params;
  const post = await Post.findOne(slug);
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

  const newPost = await Post.create({ user: userId, slug, ...req.body });
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
  res.status(200).json({message: "Post has been deleted"});
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
