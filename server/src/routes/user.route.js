import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getUserSavedPosts, savePost } from "../controllers/user.controller.js";
import { userLimiter } from "../middleware/rateLimitMiddleware.js";

const userRouter = express.Router();

userRouter.use(authMiddleware);

userRouter.use(userLimiter);

// get user's saved posts
userRouter.get("/saved", getUserSavedPosts);

//  save a post
userRouter.patch("/save", savePost);

export default userRouter;
