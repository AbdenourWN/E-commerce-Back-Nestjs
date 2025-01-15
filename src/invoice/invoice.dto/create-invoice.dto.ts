import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateInvoiceDto {
  @IsNotEmpty()
  @ApiProperty({ type: mongoose.Schema.Types.ObjectId })
  orderId: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  total: number;
}
