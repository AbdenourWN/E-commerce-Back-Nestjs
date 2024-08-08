import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Invoice {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true })
  orderId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  dateCreated: Date;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  tax: number;

  @Prop({ required: true })
  total: number;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
