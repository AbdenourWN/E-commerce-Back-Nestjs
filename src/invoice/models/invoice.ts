import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Invoice {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true })
  orderId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  total: number;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
