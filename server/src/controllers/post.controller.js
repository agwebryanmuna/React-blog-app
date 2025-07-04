import Post from "../models/post.model.js";
import imagekit from "../config/imagekit.js";
import { getAuth } from "@clerk/express";
import User from "../models/user.model.js";

// GET ALL POSTS
export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  const query = {}; // if user adds a query we don't want

  const cat = req.query.cat;
  const author = req.query.author;
  const searchQuery = req.query.search;
  const sortQuery = req.query.sort;
  const featured = req.query.featured;

  if (cat) {
    query.category = cat;
  }

  if (author) {
    const user = await User.findOne({ username: author }).select("_id");

    if (!user) {
      return res.status(404).json({ message: "No post found!" });
    }
    query.user = user._id;
  }

  if (searchQuery) {
    // Use case-insensitive partial match for search, e.g., on a "title" field
    query.title = { $regex: searchQuery, $options: "i" };
  }

  let sortObj = { createdAt: -1 };

  if (sortQuery) {
    switch (sortQuery) {
      case "newest":
        sortObj = { createdAt: -1 };
        break;
      case "oldest":
        sortObj = { createdAt: 1 };
        break;
      case "popular":
        sortObj = { visit: -1 };
        break;
      case "trending":
        sortObj = { visit: -1 };
        query.createdAt = {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 1000),
        };
        break;

      default:
        break;
    }
  }

  if(featured) {
    query.isFeatured = true;
  }

  // get posts from db with 'limit' and skip pages based on limit => limit = 5, skip 5 posts for next page
  const posts = await Post.find(query)
    .populate("user", "username")
    .sort(sortObj)
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
  let slug = req.body.title
    .trim()
    .toLowerCase()
    .normalize("NFKD")                     
    .replace(/[\u0300-\u036f]/g, '')       
    .replace(/[^a-z0-9]+/g, '-')           
    .replace(/^-+|-+$/g, ''); 

  let existingSlug = await Post.find({ slug });

  let count = 0;
  if (existingSlug.length > 0) {
    count = existingSlug.length + 1;
    slug = slug + "-" + count;
  }

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
