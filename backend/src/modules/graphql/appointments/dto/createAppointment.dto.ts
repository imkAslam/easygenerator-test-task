import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString } from 'class-validator';

@InputType()
export class CreateAppointmentDto {
  @Field()
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  title: string;

  @Field({ nullable: true })
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  @IsOptional()
  reason?: string;

  @Field()
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  @IsOptional()
  appointmentType?: string;

  @Field()
  @ApiProperty({
    type: 'string',
    format: 'date',
  })
  @IsDateString()
  dateTime: string;
}
