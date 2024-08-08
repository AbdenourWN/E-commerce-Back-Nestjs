import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './models/orders';
import { CreateOrderDto } from './orders.Dto/create-order.dto';
import { UpdateOrderDto } from './orders.Dto/update-order.dto';
import { InvoiceService } from '../invoice/invoice.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly invoiceService: InvoiceService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = new this.orderModel(createOrderDto);
    try {
      // Save the order
      const savedOrder = await newOrder.save();
      
      // Create an invoice for the saved order
      await this.invoiceService.create({
        orderId: savedOrder._id,
        dateCreated: new Date(),
        amount: savedOrder.totalAmount,
        tax: this.calculateTax(savedOrder.totalAmount), 
        total: savedOrder.totalAmount + this.calculateTax(savedOrder.totalAmount),
      });

      return savedOrder;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      return await this.orderModel
        .find()
        .populate({ path: 'userId', model: 'User' })
        .populate({ path: 'shippingAddressId', model: 'ShippingAddress' })
        .exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getOrderById(id: string): Promise<Order> {
    try {
      const order = await this.orderModel
        .findById(id)
        .populate({ path: 'userId', model: 'User' })
        .populate({ path: 'shippingAddressId', model: 'ShippingAddress' })
        .exec();
      if (!order) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return order;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateOrder(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    try {
      const updatedOrder = await this.orderModel.findByIdAndUpdate(
        id,
        updateOrderDto,
        { new: true },
      );
      if (!updatedOrder) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return updatedOrder;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteOrder(id: string): Promise<string> {
    try {
      const result = await this.orderModel.findByIdAndRemove(id);
      if (!result) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return 'Order deleted successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private calculateTax(amount: number): number {
    // Implement your tax calculation logic here
    return amount * 0.1; // Example: 10% tax
  }
}
