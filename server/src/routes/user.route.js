import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getUserSavedPosts, savePost } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/saved", authMiddleware, getUserSavedPosts);
userRouter.patch("/save", authMiddleware, savePost);

export default userRouter;
