import Post from "../models/post.model.js";

// GET ALL POSTS
export const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json({ ...posts });
};

// GET SINGLE POST
export const getPost = async (req, res) => {
  const { slug } = req.params;
  const post = await Post.findOne(slug);
  res.status(200).json({ ...post });
};

// CREATE POST
export const createPost = async (req, res) => {
  const { _id: userId } = req.user;

  let slug = req.body.title.trim().replace(" ", "-").toLowerCase();

  let existingSlug = await Post.find({ slug });
  let count = 0;
  if (existingSlug) {
    count = existingSlug.length + 1;
    slug = slug + "-" + count;
  }

  // TODO: 
  // MAKE SURE THERE ARE NO DUPLICATE TITLES IN DB
  
  const post = await Post.create({ user: userId, slug, ...req.body });
  res.status(200).json({ ...post });
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
  res.status(200).json("Post has been deleted");
};
