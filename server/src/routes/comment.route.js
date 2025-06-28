import express from 'express';

const commentRouter = express.Router()

commentRouter.get('/register', (req, res)=>{res.send('User registered successfully!')})

export default commentRouter
