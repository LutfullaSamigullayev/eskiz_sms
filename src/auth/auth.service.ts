import { SmsService } from "./../sms/sms.service";
import { Injectable } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "./entities/auth.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepo: Repository<Auth>,
    private SmsService: SmsService
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const { email, phone_number } = createAuthDto;
    await this.SmsService.senOtp(phone_number);
    const user = this.authRepo.create({
      email,
      phone_number,
      otp: "123456",
    });
    await this.authRepo.save(user);
    return "This action adds a new auth";
  }
}
