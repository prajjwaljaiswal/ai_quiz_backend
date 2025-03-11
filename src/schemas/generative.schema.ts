import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Type } from 'class-transformer';

export type GenerativeDocument = Generative & Document;

// Define Option Schema for choices with levels
class Option {
  @Prop({ required: true })
  level: number;

  @Prop({ required: true })
  text: string;
}

// Define Output Schema with question details
class Output {
  @Prop({ required: true })
  question: string;

  @Prop({ type: [Option], required: true }) // Array of options
  options: Option[];

  @Prop({ required: true })
  correctAnswer: number; // Index of the correct answer

  @Prop({ required: true })
  explanation: string;
}

@Schema()
export class Generative {
  @Prop({ required: true })
  topic: string;

  @Prop({ required: true })
  difficulty: number;

  @Prop({ required: true })
  prompt: string;

  @Prop({ type: Output, required: true })
  @Type(() => Output)
  output: Output;
}

export const GenerativeSchema = SchemaFactory.createForClass(Generative);
