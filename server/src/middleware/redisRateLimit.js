import client from '../config/redis.js'

const rateLimiter = (limit, windowSeconds, endpoint) => {
  return async (req, res, next) => {
    const ip = req.ip;
    const key = `${endpoint}:${ip}`;

    const requests = await redisClient.incr(key);

    if (requests === 1) {
      // Set TTL when the key is created
      await client.expire(key, windowSeconds);
    }

    if (requests > limit) {
      return res.status(429).json({ error: 'Too many requests' });
    }

    next();
  };
};

// rateLimiter(5, 60, 'users') // 5 request per 60 seconds for users
