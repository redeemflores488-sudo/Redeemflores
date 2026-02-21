import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentRequest } from './enrollment-request.entity';
import { EnrollmentRequestService } from './enrollment-request.service';
import { EnrollmentRequestController } from './enrollment-request.controller';
import { Course } from '../courses/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EnrollmentRequest, Course])],
  providers: [EnrollmentRequestService],
  controllers: [EnrollmentRequestController],
})
export class EnrollmentRequestModule {}