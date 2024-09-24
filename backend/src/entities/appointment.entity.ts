import { Column, Entity, ManyToOne } from 'typeorm';
import Model from './base.entity';
import { User } from './user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('appointments')
export class Appointment extends Model {
  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column({ name: 'appointment_type', default: '' })
  appointmentType: string;

  @Field()
  @Column({ type: 'timestamp' })
  dateTime: string;

  @Field()
  @Column({ name: 'appointment_status', default: 'Pending' })
  appointmentStatus: string;

  @Field({ nullable: true })
  @Column({ name: 'reason', default: '', nullable: true })
  reason?: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.appointments, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
  })
  doctor: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.appointments, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
  })
  patient: User;
}
