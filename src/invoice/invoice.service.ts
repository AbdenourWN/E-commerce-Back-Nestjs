import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInvoiceDto } from './invoice.dto/create-invoice.dto';
import { Invoice } from './models/invoice';
import { UpdateInvoiceDto } from './invoice.dto/update-invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name)
    private readonly invoiceModel: Model<Invoice>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    try {
      const invoice = new this.invoiceModel(createInvoiceDto);
      return await invoice.save();
    } catch (error) {
      throw new InternalServerErrorException('Error creating invoice');
    }
  }

  async findOne(id: string): Promise<Invoice> {
    try {
      const invoice = await this.invoiceModel
        .findById(id)
        .populate({ path: 'orderId', model: 'Order' })
        .exec();
      if (!invoice) {
        throw new NotFoundException('Invoice not found');
      }
      return invoice;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('Invalid invoice ID format');
      }
      throw new InternalServerErrorException('Error retrieving invoice');
    }
  }

  async findAll(): Promise<Invoice[]> {
    try {
      const invoice = await this.invoiceModel
        .find()
        .populate({ path: 'orderId', model: 'Order' })
        .exec();
      return invoice;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving invoice');
    }
  }

  async update(
    id: string,
    updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<Invoice> {
    try {
      const updatedInvoice = await this.invoiceModel
        .findByIdAndUpdate(id, updateInvoiceDto, { new: true })
        .exec();
      if (!updatedInvoice) {
        throw new NotFoundException('Invoice not found');
      }
      return updatedInvoice;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('Invalid invoice ID format');
      }
      throw new InternalServerErrorException('Error updating invoice');
    }
  }

  async remove(id: string): Promise<Invoice> {
    try {
      const deletedInvoice = await this.invoiceModel
        .findByIdAndDelete(id)
        .exec();
      if (!deletedInvoice) {
        throw new NotFoundException('Invoice not found');
      }
      return deletedInvoice;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('Invalid invoice ID format');
      }
      throw new InternalServerErrorException('Error deleting invoice');
    }
  }
}
