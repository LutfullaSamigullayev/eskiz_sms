import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { createClient, RedisClientType } from "redis";

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      username: "default",
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });

    this.client.on("error", (err) => {
      console.error("❌ Redis error:", err);
    });
  }

  // 🔹 App start bo‘lganda ulanadi
  async onModuleInit() {
    await this.client.connect();
    console.log("✅ Redis connected");
  }

  // 🔹 App o‘chayotganda yopiladi
  async onModuleDestroy() {
    await this.client.quit();
  }

  // ======================
  // SET
  // ======================
  async set(key: string, value: string, ttl?: number) {
    await this.client.set(key, value);

    if (ttl) {
      await this.client.expire(key, ttl);
    }
  }

  // ======================
  // GET
  // ======================
  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  // ======================
  // DELETE
  // ======================
  async del(key: string) {
    await this.client.del(key);
  }
}
