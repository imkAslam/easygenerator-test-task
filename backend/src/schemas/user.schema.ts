import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Utils } from 'src/utils/utils';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  [x: string]: string;

  @Prop({ required: false, default: null, type: String })
  firstName: string;

  @Prop({ required: false, default: null, type: String })
  lastName: string;

  @Prop({
    required: true,
    unique: true,
    type: String,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Add basic email validation regex
  })
  email: string;

  @Prop({
    required: true,
    type: String,
    minlength: 6, // Add a minimum length constraint for security
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hash password before saving
UserSchema.pre<UserDocument>('save', async function (next) {
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

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,

  transform: (_, ret) => {
    delete ret._id;
  },
});
