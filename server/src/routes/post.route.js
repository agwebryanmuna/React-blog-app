import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  uploadFiles,
  featurePost,
} from "../controllers/post.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { postAdminMiddleware } from "../middleware/adminMiddleware.js";
import { increaseVisit } from "../middleware/increaseVisit.js";
import { postLimiter } from "../middleware/rateLimitMiddleware.js";

const postRouter = express.Router();

postRouter.get("/", getPosts);

postRouter.get("/upload-files",postLimiter, authMiddleware, uploadFiles);

postRouter.get("/:slug", increaseVisit, getPost);

postRouter.post("/", authMiddleware,postLimiter, createPost);

postRouter.delete("/:id", postAdminMiddleware, authMiddleware,postLimiter, deletePost);

postRouter.patch("/feature", featurePost);

export default postRouter;
