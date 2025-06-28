import express from 'express';
import { getPosts, getPost, createPost, deletePost } from '../controllers/post.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const postRouter = express.Router()

postRouter.get('/', getPosts)
postRouter.get('/:slug', getPost)
postRouter.post('/',authMiddleware, createPost)
postRouter.delete('/:id',authMiddleware, deletePost)

export default postRouter
