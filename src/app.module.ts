import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { GenerativeModule } from '@modules/generative/generative.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/quiz_sandy'),AuthModule, UserModule, GenerativeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
