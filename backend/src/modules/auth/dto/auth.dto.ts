import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Regex } from 'src/common/constants/constants';

export class AuthDto {
  @ApiProperty({
    example: '',
    type: 'String',
  })
  @IsEmail({}, { message: 'email must be a valid email' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @ApiProperty({
    example: '',
    type: 'String',
  })
  @IsString()
  @MinLength(3, { message: 'password should be at least 3 characters long' })
  @MaxLength(50, {
    message: 'password should not be longer than 50 characters',
  })
  @Matches(Regex, {
    message:
      'Password must be at least 8 characters long, contain at least one letter, one number, and one special character.',
  })
  password: string;
}
