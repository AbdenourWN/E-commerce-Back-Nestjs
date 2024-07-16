import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './createuser.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @ApiProperty()
  telephone?: string;

  @IsNotEmpty()
  @ApiProperty()
  city?: string;

  @IsNotEmpty()
  @ApiProperty()
  address?: string;
}
