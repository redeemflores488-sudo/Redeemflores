// src/courses/courses.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // GET /courses — fetch all courses
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  // GET /courses/:id — fetch one course
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  // POST /courses — create a new course
  @Post()
  create(@Body() body: { title: string; description: string; credits: number }) {
    return this.coursesService.create(body);
  }

  // PATCH /courses/:id — update an existing course
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { title?: string; description?: string; credits?: number },
  ) {
    return this.coursesService.update(+id, body);
  }

  // DELETE /courses/:id — delete a course
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}