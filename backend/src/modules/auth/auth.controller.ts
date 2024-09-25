import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { RegisterUserDto } from './dto/registration.dto';
import { ApiErrorDecorator } from 'src/common/decorators/error.decorator';
import { INTERNAL_SERVER_ERROR_RESPONSE } from 'src/common/constants/http-responses.types';

@Controller('auth')
@ApiTags('auth')
@ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request')
@ApiErrorDecorator(HttpStatus.CONFLICT, 'Record Already Exists')
@ApiErrorDecorator(
  INTERNAL_SERVER_ERROR_RESPONSE.status as number,
  INTERNAL_SERVER_ERROR_RESPONSE.message,
)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({
    description: 'success response',
    schema: {
      type: 'object',
      properties: {
        message: { type: '' },
        statusCode: { type: 'number', example: 200 },
        data: {
          type: 'array',
          example: [],
        },
      },
    },
  })
  @HttpCode(200)
  @Post('login')
  async login(@Body() body: AuthDto) {
    return this.authService.login(body);
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiCreatedResponse({
    description: 'success response',
    schema: {
      type: 'object',
      properties: {
        message: { type: '' },
        statusCode: { type: 'number', example: 201 },
        data: {
          type: 'array',
          example: [],
        },
      },
    },
  })
  @HttpCode(201)
  @Post('register')
  register(@Body() body: RegisterUserDto) {
    return this.authService.registration(body);
  }
}
