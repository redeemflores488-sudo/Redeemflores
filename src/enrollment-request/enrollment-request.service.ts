import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnrollmentRequest, RequestStatus } from './enrollment-request.entity';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class EnrollmentRequestService {
  constructor(
    @InjectRepository(EnrollmentRequest)
    private requestRepo: Repository<EnrollmentRequest>,
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}

  async createRequest(studentName: string, courseId: number): Promise<EnrollmentRequest> {
    const course = await this.courseRepo.findOne({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course not found');

    // Check if already requested
    const existing = await this.requestRepo.findOne({
      where: { studentName, course: { id: courseId }, status: RequestStatus.PENDING },
      relations: ['course'],
    });
    if (existing) throw new NotFoundException('You already have a pending request for this course');

    const request = this.requestRepo.create({ studentName, course, status: RequestStatus.PENDING });
    return this.requestRepo.save(request);
  }

  async getAllRequests(): Promise<EnrollmentRequest[]> {
    return this.requestRepo.find({ relations: ['course'], order: { createdAt: 'DESC' } });
  }

  async getPendingRequests(): Promise<EnrollmentRequest[]> {
    return this.requestRepo.find({
      where: { status: RequestStatus.PENDING },
      relations: ['course'],
      order: { createdAt: 'DESC' },
    });
  }

  async getStudentRequests(studentName: string): Promise<EnrollmentRequest[]> {
    return this.requestRepo.find({
      where: { studentName },
      relations: ['course'],
      order: { createdAt: 'DESC' },
    });
  }

  async approveRequest(id: number): Promise<EnrollmentRequest> {
    const request = await this.requestRepo.findOne({ where: { id }, relations: ['course'] });
    if (!request) throw new NotFoundException('Request not found');
    request.status = RequestStatus.APPROVED;
    return this.requestRepo.save(request);
  }

  async rejectRequest(id: number): Promise<EnrollmentRequest> {
    const request = await this.requestRepo.findOne({ where: { id }, relations: ['course'] });
    if (!request) throw new NotFoundException('Request not found');
    request.status = RequestStatus.REJECTED;
    return this.requestRepo.save(request);
  }
}