import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsDate } from 'class-validator';
import * as mongoose from 'mongoose';

export class UpdateInvoiceDto {
  @IsOptional()
  @ApiProperty({ type: mongoose.Schema.Types.ObjectId, required: false })
  orderId?: mongoose.Types.ObjectId;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber()
  amount?: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber()
  total?: number;
}
