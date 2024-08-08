import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './models/orders';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';
import { InvoiceModule } from '../invoice/invoice.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    InvoiceModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
