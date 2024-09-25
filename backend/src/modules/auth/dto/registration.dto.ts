import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Regex } from 'src/common/constants/constants';

export class RegisterUserDto {
  @ApiProperty({
    description: 'The first name of the user',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    type: 'string',
    format: 'string',
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    description: 'The email of the user',
    type: 'string',
    format: 'string',
  })
  @IsEmail(undefined, { message: 'email must be a valid email' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @ApiProperty({
    example: 'Password@12',
    description:
      'The password of the user password should be at least 6 and max 50 characters long and contain at least one upper letter, number and a special character',
    type: 'string',
    format: 'string',
  })
  @IsString()
  @MinLength(8, { message: 'password should be at least 8 characters long' })
  @MaxLength(100, {
    message: 'password should not be longer than 100 characters',
  })
  @Matches(Regex, {
    message:
      'Password must be at least 8 characters long, contain at least one letter, one number, and one special character.',
  })
  password: string;
}
