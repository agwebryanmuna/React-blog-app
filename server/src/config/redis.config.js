import { createClient } from 'redis';

const client = createClient({
    url: process.env.REDIS_URL
});

client.on('error', err => console.log('Redis Client Error', err));

try {
  await client.connect();
  console.log('Connected to redis db');
  
} catch (error) {
  console.log('Failed to connect to redis database', error.message)
}

export default client;
