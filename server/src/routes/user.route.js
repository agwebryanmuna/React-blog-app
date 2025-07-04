import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getUserSavedPosts, savePost } from "../controllers/user.controller.js";
import { userLimiter } from "../middleware/rateLimitMiddleware.js";

const userRouter = express.Router();

userRouter.use(authMiddleware);

// get user's saved posts
userRouter.get("/saved", getUserSavedPosts);

//  save a post
userRouter.patch("/save",userLimiter, savePost);

export default userRouter;
