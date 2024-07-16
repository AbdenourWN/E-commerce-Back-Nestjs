import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, NotContains } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  @NotContains(' ', { message: "username shouldn't contain white spaces" })
  username: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @Length(6, 20)
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  roles: string;

  @IsNotEmpty()
  @ApiProperty()
  telephone: string;

  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsNotEmpty()
  @ApiProperty()
  address: string;

}
