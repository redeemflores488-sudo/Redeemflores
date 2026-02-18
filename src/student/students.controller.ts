// src/students/students.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // GET /students
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  // GET /students/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  // POST /students
  @Post()
  create(@Body() body: { name: string; studentId: string }) {
    return this.studentsService.create(body);
  }

  // PATCH /students/:id
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { name?: string; studentId?: string },
  ) {
    return this.studentsService.update(+id, body);
  }

  // DELETE /students/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }

  // POST /students/:id/enroll/:courseId
  @Post(':id/enroll/:courseId')
  enroll(@Param('id') id: string, @Param('courseId') courseId: string) {
    return this.studentsService.enroll(+id, +courseId);
  }

  // DELETE /students/:id/unenroll/:courseId
  @Delete(':id/unenroll/:courseId')
  unenroll(@Param('id') id: string, @Param('courseId') courseId: string) {
    return this.studentsService.unenroll(+id, +courseId);
  }
}
