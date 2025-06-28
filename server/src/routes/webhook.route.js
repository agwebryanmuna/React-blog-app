import express from 'express';
import { clerkWebHook } from '../controllers/webhook.controller.js';

const webhookRouter = express.Router()

webhookRouter.post('/clerk', clerkWebHook)

export default webhookRouter
