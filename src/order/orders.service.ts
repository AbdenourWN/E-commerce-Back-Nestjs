import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './models/orders';
import { CreateOrderDto } from './orders.Dto/create-order.dto';
import { UpdateOrderDto } from './orders.Dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = new this.orderModel(createOrderDto);
    try {
      return await newOrder.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      return await this.orderModel.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getOrderById(id: string): Promise<Order> {
    try {
      const order = await this.orderModel.findById(id).exec();
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
}
