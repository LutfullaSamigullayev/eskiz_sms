import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    username: "postgres",
    host: "localhost",
    port: 5432,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    autoLoadEntities: true,
    synchronize: true,
  })


  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
