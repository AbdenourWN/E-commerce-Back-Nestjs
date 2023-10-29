import {
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class CreateReductionCodeDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  discountPercentage: number;

  @IsOptional()
  @IsDate()
  expirationDate: Date;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
