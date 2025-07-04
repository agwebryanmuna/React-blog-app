import { getAuth } from "@clerk/express";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";
import logger from "../logger/logger.js";
export const postAdminMiddleware = async (req, res, next) => {
  const { sessionClaims } = getAuth(req);

  const role = sessionClaims.metadata.role || "user";

  if (role === "admin") {
    const { id: postId } = req.params;

    await Post.findOneAndDelete({
      _id: postId,
    });

    // remove post from other users savedPosts
    await User.updateMany(
      { savedPosts: postId },
      { $pull: { savedPosts: postId } }
    );

    logger.info(`Admin post deletion ${postId}`);
    return res.status(200).json({ message: "Post has been deleted" });
  }
  next();
};

export const commentAdminMiddleware = async (req, res, next) => {
  const { sessionClaims } = getAuth(req);

  const role = sessionClaims.metadata.role || "user";

  if (role === "admin") {
    const { id: commentId } = req.params;
    await Comment.findOneAndDelete({
      _id: commentId,
    });

    logger.info(`Admin comment deletion ${commentId}`);
    return res.status(200).json({ message: "Comment has been deleted" });
  }
  next();
};
