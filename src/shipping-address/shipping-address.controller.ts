import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';
import { UpdateShippingAddressDto } from './shipping-address.dto/update-shipping-address.dto';
import { CreateShippingAddressDto } from './shipping-address.dto/create-shipping-address.dto';
import { ShippingAddress } from './models/shipping-address';
import { ApiTags } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

@ApiTags('shipping-addresses')
@Controller('shipping-addresses')
export class ShippingAddressController {
  constructor(
    private readonly shippingAddressService: ShippingAddressService,
  ) {}

  @Post()
  async create(
    @Body() createShippingAddressDto: CreateShippingAddressDto,
  ): Promise<ShippingAddress> {
    return this.shippingAddressService.create(createShippingAddressDto);
  }

  @Get()
  async findAll(): Promise<ShippingAddress[]> {
    return this.shippingAddressService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ShippingAddress> {
    return this.shippingAddressService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShippingAddressDto: UpdateShippingAddressDto,
  ): Promise<ShippingAddress> {
    return this.shippingAddressService.update(id, updateShippingAddressDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ShippingAddress> {
    return this.shippingAddressService.remove(id);
  }

  @Get('user/:userId')
  async findByUserId(
    @Param('userId') userId: string,
  ): Promise<ShippingAddress[]> {
    return this.shippingAddressService.findByUserId(userId);
  }
}
