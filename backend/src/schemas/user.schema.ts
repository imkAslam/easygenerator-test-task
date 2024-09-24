import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Utils } from 'src/utils/utils';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: false, default: null })
  firstName: string;

  @Prop({ required: false, default: null })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    this.password = await Utils.hashPassword(this.password);
    next();
  } catch (error) {
    next(error);
  }
});
