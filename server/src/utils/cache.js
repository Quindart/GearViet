import { createClient } from "redis";
const redisClient = createClient({
  username: 'default',
  password: process.env.REDIS_PASSWORD,
  socket: {
      host: process.env.REDIS_URL,
      port: 16231
  }
});
await redisClient.connect();


// Kiểm tra kết nối
redisClient.on('connect', () => {
  console.log('Đã kết nối thành công đến Redis server');
});

// Xử lý lỗi kết nối
redisClient.on('error', (err) => {
  console.error('Lỗi kết nối đến Redis server:', err);
});

export const getCachedData = async (key) => {
  const cacheData = await redisClient.get(key);
  return cacheData;
};

export const cacheData = async (key, data, expirationTime = 900) => {
  redisClient.set(key, data, "EX", expirationTime);
  redisClient.expire(key, expirationTime);
};

export const deleteCacheByKey = async (key) => {
  const response = await redisClient.del(key);
  if (response == 1) {
    console.log("Key has been deleted");
  } else {
    console.log("Key does not exist");
  }
};