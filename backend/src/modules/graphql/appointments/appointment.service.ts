import { Appointment } from '@/entities/appointment.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/createAppointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
  ) {}

  async appointments(): Promise<Appointment[]> {
    return await this.appointmentRepo.find();
  }

  async appointmentById(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepo.findOneBy({
      id: id,
    });

    if (!appointment) throw new NotFoundException('Appointment not found!!!');
    return appointment;
  }

  async createAppointment(payload: CreateAppointmentDto): Promise<any> {
    const appointment = await this.appointmentRepo.save(
      this.appointmentRepo.create(payload),
    );
    return appointment;
  }

  async deleteAppointment(id: number): Promise<boolean> {
    const result = await this.appointmentRepo.delete(id);
    return result.affected > 0;
  }
}
