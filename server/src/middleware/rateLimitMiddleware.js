import rateLimit from "express-rate-limit";
import redisClient from "../config/redis.config";

export const globalLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200, // Allow 200 requests per IP per 15 min
  standardHeaders: true,
  legacyHeaders: false,
});

export const commentLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // Max 10 comments per user every 10 minutes
  keyGenerator: (req) => req.auth?.userId || req.ip,
  message: "Accessed the server too many times. Please wait a bit",
  standardHeaders: true,
  legacyHeaders: false,
});

export const postLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
  windowMs: 10 * 60 * 1000, // 10 minutes
  keyGenerator: (req) => req.auth?.userId || req.ip,
  message: 'Accessed the server too many times. Please wait a bit',
  standardHeaders: true,
  legacyHeaders: false,
});

export const userLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
  windowMs: 10 * 60 * 1000, // 10 minutes
  keyGenerator: (req) => req.auth?.userId || req.ip,
  message: 'Accessed the server too many times. Please wait a bit',
  standardHeaders: true,
  legacyHeaders: false,
});
