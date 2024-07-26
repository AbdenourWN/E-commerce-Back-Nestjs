import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
  IsDateString,
} from 'class-validator';

export class CreateReductionCodeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty()
  discountPercentage: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  expirationDate: Date;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;
}
