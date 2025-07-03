import User from "../models/user.model.js";

export const getUserSavedPosts = async (req, res) => {
  res.status(200).json({ savedPosts: req.user.savedPosts });
};

export const savePost = async (req, res) => {
  const { _id: userId } = req.user;
  const postId = req.body.postId;
  const isSaved = req.user.savedPosts.includes(postId);

  if (!isSaved) {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { savedPosts: postId },
    });
  } else {
    await User.findByIdAndUpdate(userId, {
      $pull: { savedPosts: postId },
    });
  }

  res.status(200).json({ message: isSaved ? "Post unsaved" : "Post saved" });
};
