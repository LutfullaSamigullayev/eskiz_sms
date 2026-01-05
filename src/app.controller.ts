import { Controller, Get, Post } from "@nestjs/common";
import { RedisService } from "./redis/redis.service";

@Controller()
export class AppController {
  constructor(private redisService: RedisService) {}

  @Get("get")
  async getHello() {
    let result = await this.redisService.get("mykey");
    return result;
  }

  @Post("set")
  async post() {
    await this.redisService.set("mykey", "myvalue");
    return "OK";
  }
}
