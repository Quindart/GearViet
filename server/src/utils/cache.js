import { createClient } from "redis";

const redisClient = createClient({
  username: 'default',
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379
  }
});

redisClient.on('connect', () => console.log('Đã kết nối thành công đến Redis server'));
redisClient.on('error', (err) => console.error('Lỗi kết nối đến Redis server:', err));

await redisClient.connect();

export const getCachedData = async (key) => {
  return await redisClient.get(key);
};

export const cacheData = async (key, data, expirationTime = 900) => {
  await redisClient.set(key, data, { EX: expirationTime });
};

export const deleteCacheByKey = async (key) => {
  const response = await redisClient.del(key);
  console.log(response === 1 ? "Key has been deleted" : "Key does not exist");
};
