import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { CreateShippingAddressDto } from './shipping-address.dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './shipping-address.dto/update-shipping-address.dto';
import { ShippingAddress } from './models/shipping-address';

@Injectable()
export class ShippingAddressService {
  constructor(
    @InjectModel(ShippingAddress.name)
    private readonly shippingAddressModel: Model<ShippingAddress>,
  ) {}

  async create(
    createShippingAddressDto: CreateShippingAddressDto,
  ): Promise<ShippingAddress> {
    try {
      const createdAddress = new this.shippingAddressModel(
        createShippingAddressDto,
      );
      return await createdAddress.save();
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while creating the shipping address',
      );
    }
  }

  async findOne(id: string): Promise<ShippingAddress> {
    try {
      const address = await this.shippingAddressModel
        .findById(id)
        .populate({ path: 'userId', model: 'User' })
        .exec();
      if (!address) {
        throw new NotFoundException('Shipping address not found');
      }
      return address;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('Invalid shipping address ID format');
      }
      throw new InternalServerErrorException(
        'An error occurred while retrieving the shipping address',
      );
    }
  }
  async findAll(): Promise<ShippingAddress[]> {
    try {
      const address = await this.shippingAddressModel
        .find()
        .populate({ path: 'userId', model: 'User' })
        .exec();

      return address;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while retrieving the shipping address',
      );
    }
  }

  async update(
    id: string,
    updateShippingAddressDto: UpdateShippingAddressDto,
  ): Promise<ShippingAddress> {
    try {
      const updatedAddress = await this.shippingAddressModel
        .findByIdAndUpdate(id, updateShippingAddressDto, { new: true })
        .exec();
      if (!updatedAddress) {
        throw new NotFoundException('Shipping address not found');
      }
      return updatedAddress;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('Invalid shipping address ID format');
      }
      throw new InternalServerErrorException(
        'An error occurred while updating the shipping address',
      );
    }
  }

  async remove(id: string): Promise<ShippingAddress> {
    try {
      const deletedAddress = await this.shippingAddressModel
        .findByIdAndDelete(id)
        .exec();
      if (!deletedAddress) {
        throw new NotFoundException('Shipping address not found');
      }
      return deletedAddress;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('Invalid shipping address ID format');
      }
      throw new InternalServerErrorException(
        'An error occurred while deleting the shipping address',
      );
    }
  }

  async findByUserId(userId: string): Promise<ShippingAddress[]> {
    try {
      // Validate the userId format
      if (!Types.ObjectId.isValid(userId)) {
        throw new BadRequestException('Invalid user ID format');
      }

      const userIdObj = new Schema.Types.ObjectId(userId);
      // Query the database for shipping addresses
      const addresses = await this.shippingAddressModel
        .find({ userId: userIdObj })
        .exec();

      return addresses;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'An unexpected error occurred while retrieving shipping addresses',
        );
      }
    }
  }
}
