import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "./entities/auth.entity";
import { SmsModule } from "src/sms/sms.module";

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), SmsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
