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

const postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.get("/upload-files", authMiddleware, uploadFiles);
postRouter.get("/:slug", getPost);
postRouter.post("/", authMiddleware, createPost);
postRouter.delete("/:id", postAdminMiddleware, authMiddleware, deletePost);
postRouter.patch("/feature", featurePost);

export default postRouter;
