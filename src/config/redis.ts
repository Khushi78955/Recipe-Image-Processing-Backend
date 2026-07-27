import { Redis } from "ioredis";
import { env } from "./env.js";

export const redisConnection = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => {
    console.log("Redis connected");
});

redisConnection.on("error", (err: Error) => {
    console.error("Redis error:", err);
});