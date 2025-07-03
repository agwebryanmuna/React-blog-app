import express from "express";
import {
  addComment,
  deleteComment,
  getPostComments,
} from "../controllers/comment.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { commentAdminMiddleware } from "../middleware/adminMiddleware.js";

const commentRouter = express.Router();

commentRouter.get("/:postId", getPostComments);
commentRouter.post("/:postId", authMiddleware, addComment);
commentRouter.delete(
  "/:id",
  commentAdminMiddleware,
  authMiddleware,
  deleteComment
);
export default commentRouter;
