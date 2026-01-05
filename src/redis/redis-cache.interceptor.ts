import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { RedisService } from "./redis.service";

@Injectable()
export class RedisCacheInterceptor implements NestInterceptor {
  constructor(private readonly redisService: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const key = `cache:${request.url}`;

    // 🔹 Redis dan tekshiramiz
    const cachedResponse = await this.redisService.get(key);
    if (cachedResponse) {
      return new Observable((observer) => {
        observer.next(JSON.parse(cachedResponse));
        observer.complete();
      });
    }

    // 🔹 Agar cache bo‘lmasa → controller ishlaydi
    return next.handle().pipe(
      tap(async (response) => {
        // ⏱ 5 soniyaga cache qilamiz
        await this.redisService.set(key, JSON.stringify(response), 5);
      })
    );
  }
}
