import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiSecurityAuth } from 'src/common/decorators/swagger.decorator';
import { JwtAuthGuard } from '../auth/guards/local-auth.guard';
import { ApiErrorDecorator } from 'src/common/decorators/error.decorator';
import { INTERNAL_SERVER_ERROR_RESPONSE } from 'src/common/constants/http-responses.types';

@ApiTags('Users')
@Controller('users')
@ApiSecurityAuth()
@UseGuards(JwtAuthGuard)
@ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'Bad Request')
@ApiErrorDecorator(HttpStatus.CONFLICT, 'Record Already Exists')
@ApiErrorDecorator(HttpStatus.UNAUTHORIZED, 'Unauthorized')
@ApiErrorDecorator(
  INTERNAL_SERVER_ERROR_RESPONSE.status as number,
  INTERNAL_SERVER_ERROR_RESPONSE.message,
)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  @Get('/users')
  findAll() {
    return this.usersService.findAll();
  }
}
