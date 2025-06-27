import express from 'express';

const postRouter = express.Router()

postRouter.get('/register', (req, res)=>{res.send('User registered successfully!')})

export default postRouter
