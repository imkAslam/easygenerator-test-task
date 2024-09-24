import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Int,
  Parent,
} from '@nestjs/graphql';
import { AppointmentService } from './appointment.service';
import { Appointment } from '@/entities/appointment.entity';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/guards/local-auth.guard';

@UseGuards(JwtAuthGuard)
@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(private appointmentService: AppointmentService) {}

  @Query(() => [Appointment])
  async getAppointments(@Parent() auth: any) {
    console.log('auth->>>', auth);
    return await this.appointmentService.appointments();
  }

  @Query(() => Appointment)
  async getAppointmentById(@Args('id', { type: () => Int }) id: number) {
    return await this.appointmentService.appointmentById(id);
  }

  @Mutation(() => Appointment)
  async createAppointment(
    @Args('createAppointmentInput')
    createAppointmentInput: CreateAppointmentDto,
  ) {
    return await this.appointmentService.createAppointment(
      createAppointmentInput,
    );
  }

  @Mutation(() => Boolean)
  async deleteAppointment(@Args('id', { type: () => ID }) id: number) {
    return await this.appointmentService.deleteAppointment(id);
  }
}
