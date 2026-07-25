import { Redis } from "ioredis";

export const redisConnection = new Redis({
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => {
    console.log("Redis connected");
})

redisConnection.on("error", (err: Error) => {
    console.error("Redis error: ", err)
})