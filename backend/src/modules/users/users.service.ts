import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { RegisterUserDto } from '../auth/dto/registration.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(body: RegisterUserDto): Promise<User> {
    const { email } = body;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const newUser = new this.userModel(body);

    return newUser.save();
  }
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().select('-password');
    return users;
  }
  async getByUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
