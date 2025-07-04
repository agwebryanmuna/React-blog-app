import redisClient from "../config/redis.config.js";
import User from "../models/user.model.js";

export const getUserSavedPosts = async (req, res) => {
  const { _id: userId } = req.user;
  const key = `user:${userId}:savedPosts`;
  const cached = await redisClient.get(key);
  if (cached) {
    return res.status(200).json(JSON.parse(cached));
  }

  await redisClient.setEx(
    key,
    120,
    JSON.stringify({ savedPosts: req.user.savedPosts })
  );
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

  await redisClient.del(`user:${userId}:savedPosts`);

  res.status(200).json({ message: isSaved ? "Post unsaved" : "Post saved" });
};
