import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
}
