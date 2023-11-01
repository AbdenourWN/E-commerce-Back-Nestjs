import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSettingsDto {
  @IsNotEmpty()
  @ApiProperty()
  facebookUrl: string;

  @IsNotEmpty()
  @ApiProperty()
  instagramUrl: string;

  @IsNotEmpty()
  @ApiProperty()
  tiktokUrl: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  websiteLogo: any;

  @IsNotEmpty()
  @ApiProperty()
  websiteName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  telephone: string;

  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @ApiProperty()
  deliveryPrice: string;

  @IsNotEmpty()
  @ApiProperty()
  freeDeliveryThreshold: string;
}
