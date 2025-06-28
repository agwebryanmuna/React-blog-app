import express from 'express';

const userRouter = express.Router()

userRouter.get('/register', (req, res)=>{res.send('User registered successfully!')})

export default userRouter
