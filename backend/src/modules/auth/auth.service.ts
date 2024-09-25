import {
  Injectable,
  HttpException,
  HttpStatus,
  Global,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { JwtPayload } from './interface/Jwt.interface';
import { RegisterUserDto } from './dto/registration.dto';
import { ConfigService } from '@nestjs/config';
import { Utils } from 'src/utils/utils';
import { UsersService } from '../users/users.service';
import { UserResponseDto } from './dto/UserResponse.dto';

@Injectable()
@Global()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(body: AuthDto): Promise<unknown> {
    const user = await this.usersService.getByUserByEmail(body.email);

    if (!user) throw new NotFoundException('Invalid email/password');

    const { password } = user;

    const verifyPassword = await Utils.comparePassword(body.password, password);

    if (!verifyPassword)
      throw new HttpException('Invalid email/password', HttpStatus.NOT_FOUND);

    const jwt_token = await this.createAccessToken({
      id: user.id,
      email: user.email,
    });

    const userResponse: UserResponseDto = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      access_token: jwt_token,
    };
    return {
      status: HttpStatus.OK,
      message: 'Logged in successfully. ✔️',
      data: userResponse,
    };
  }

  async registration(body: RegisterUserDto) {
    const user = await this.usersService.register(body);
    return user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { password, ...rest } = user;
    // const jwt_token = await this.createAccessToken({
    //   email: user.email,
    // });
    // return {
    //   status: HttpStatus.OK,
    //   data: {
    //     ...rest,
    //     access_token: jwt_token,
    //   },
    // };
  }

  public async createAccessToken(payload: JwtPayload): Promise<string> {
    const result = this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_SECRET'),
    });

    return result;
  }
}
