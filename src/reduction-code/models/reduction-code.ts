import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReductionCodeDocument = ReductionCode & Document;

@Schema()
export class ReductionCode {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  discountPercentage: number;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop()
  expirationDate: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const ReductionCodeSchema = SchemaFactory.createForClass(ReductionCode);
