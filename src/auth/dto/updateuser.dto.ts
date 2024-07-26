import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserDto } from './createuser.dto';

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty()
  telephone?: string;

  @IsOptional()
  @ApiProperty()
  roles?: string;

  @IsOptional()
  @ApiProperty()
  city?: string;

  @IsOptional()
  @ApiProperty()
  address?: string;
}
