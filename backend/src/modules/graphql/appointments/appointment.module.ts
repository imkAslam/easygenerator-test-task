import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { Appointment } from '@/entities/appointment.entity';
import { AppointmentResolver } from './appointment.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, Appointment])],
  exports: [],
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentResolver],
})
export class AppointmentModule {}
