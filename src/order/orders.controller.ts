import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './orders.service';
import { CreateOrderDto } from './orders.Dto/create-order.dto';
import { Order } from './models/orders';
import { UpdateOrderDto } from './orders.Dto/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwtauth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/role.decorator';
@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrderById(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Put(':id')
  updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(id, updateOrderDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Delete(':id')
  deleteOrder(@Param('id') id: string): Promise<string> {
    return this.orderService.deleteOrder(id);
  }
}
