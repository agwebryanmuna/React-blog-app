import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  uploadFiles,
  featurePost
} from "../controllers/post.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { postAdminMiddleware } from "../middleware/adminMiddleware.js";
import { increaseVisit } from "../middleware/increaseVisit.js";
import { postLimiter } from "../middleware/rateLimitMiddleware.js";

const postRouter = express.Router();

// limit access to server
postRouter.use(postLimiter())

postRouter.get("/", getPosts);

postRouter.get("/upload-files", authMiddleware, uploadFiles);

postRouter.get("/:slug", increaseVisit, getPost);

postRouter.post("/", authMiddleware, createPost);

postRouter.delete("/:id", postAdminMiddleware, authMiddleware, deletePost);

postRouter.patch("/feature", featurePost);

export default postRouter;
