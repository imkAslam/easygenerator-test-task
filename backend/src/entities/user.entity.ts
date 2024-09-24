import { Helper } from '@/utils';
import { Entity, Column, BeforeInsert, OneToMany } from 'typeorm';
import Model from './base.entity';
import { Appointment } from './appointment.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('users')
@ObjectType()
export class User extends Model {
  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ name: 'first_name' })
  firstName: string;

  @Field()
  @Column({ name: 'last_name' })
  lastName: string;

  @Field()
  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ name: 'otp_code', nullable: true })
  otpCode?: string;

  @Field()
  @Column({ name: 'is_email_verified', type: 'boolean', default: false })
  isEmailVerified: boolean;

  @Field()
  @Column({ name: 'is_password_forget', type: 'boolean', default: false })
  isPasswordForget: boolean;

  @Field()
  @Column({ name: 'is_profile_complete', type: 'boolean', default: false })
  isProfileComplete: boolean;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await Helper.hashPassword(this.password);
    }
  }
  @Field(() => [Appointment])
  @OneToMany(() => Appointment, (appointment) => appointment)
  appointments: Appointment[];
}
