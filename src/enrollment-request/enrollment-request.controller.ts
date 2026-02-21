import { Controller, Post, Get, Patch, Body, Param, ParseIntPipe } from '@nestjs/common';
import { EnrollmentRequestService } from './enrollment-request.service';

@Controller('enrollment-requests')
export class EnrollmentRequestController {
  constructor(private readonly service: EnrollmentRequestService) {}

  // Student sends an enrollment request
  @Post()
  create(@Body() body: { studentName: string; courseId: number }) {
    return this.service.createRequest(body.studentName, body.courseId);
  }

  // Admin gets all pending requests
  @Get('pending')
  getPending() {
    return this.service.getPendingRequests();
  }

  // Admin gets all requests
  @Get()
  getAll() {
    return this.service.getAllRequests();
  }

  // Student gets their own requests
  @Get('student/:name')
  getStudentRequests(@Param('name') name: string) {
    return this.service.getStudentRequests(name);
  }

  // Admin approves a request
  @Patch(':id/approve')
  approve(@Param('id', ParseIntPipe) id: number) {
    return this.service.approveRequest(id);
  }

  // Admin rejects a request
  @Patch(':id/reject')
  reject(@Param('id', ParseIntPipe) id: number) {
    return this.service.rejectRequest(id);
  }
}