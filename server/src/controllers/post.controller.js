import Post from "../models/post.model.js";

// GET ALL POSTS
export const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json({ posts });
};

// GET SINGLE POST
export const getPost = async (req, res) => {
  const { slug } = req.params;
  const post = await Post.findOne(slug);
  res.status(200).json({ post });
};

// CREATE POST
export const createPost = async (req, res) => {
  const post = await Post.create(req.body);
  res.status(200).json({ post });
};

// DELETE POST
export const deletePost = async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  res.status(200).json("Post has been deleted");
};
