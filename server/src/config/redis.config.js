import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

try {
  await redisClient.connect();
  console.log("Connected to redis db");
} catch (error) {
  console.log("Failed to connect to redis database", error.message);
}

export default redisClient;
