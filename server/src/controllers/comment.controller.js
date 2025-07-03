import Comment from "../models/comment.model.js";

export const getPostComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user", ["username", "img"])
    .sort({ createdAt: -1 });

  res.status(200).json({ comments });
};

export const addComment = async (req, res) => {
  const { _id: userId } = req.user;
  const postId = req.params.postId;

  const newComment = await Comment.create({
    user: userId,
    post: postId,
    ...req.body,
  });

  res.status(200).json({ newComment });
};

export const deleteComment = async (req, res) => {
  const { id: commentId } = req.params;
  const { _id: userId } = req.user;
  const deletedComment = await Comment.findOneAndDelete({
    _id: commentId,
    user: userId,
  });

  if (!deletedComment)
    return res.status(403).json("You can only delete your comments!");
  res.status(200).json({ message: "Comment has been deleted" });
};
