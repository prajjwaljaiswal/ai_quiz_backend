import { Module } from '@nestjs/common';
import { GenerativeService } from './generative.service';
import { GenerativeController } from './generative.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Generative, GenerativeSchema } from '@schema/generative.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Generative.name, schema: GenerativeSchema }]),
  ],
  providers: [GenerativeService],
  controllers: [GenerativeController]
})
export class GenerativeModule {}
