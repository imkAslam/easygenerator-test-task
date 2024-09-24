import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/local-auth.guard';
import { API_SECURITY_AUTH } from '@/common/decorators/swagger.decorator';

@ApiTags('Appointment')
@Controller('appointment')
@ApiBearerAuth(API_SECURITY_AUTH)
@UseGuards(JwtAuthGuard)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('/all')
  async allAppointments() {
    return this.appointmentService.appointments();
  }

  @Post('/create')
  async addOne(@Body() body: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(body);
  }
}
