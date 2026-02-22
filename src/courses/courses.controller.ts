// src/courses/courses.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // GET /courses?department=BSIT&year=3 — fetch all or filtered courses
  @Get()
  findAll(
    @Query('department') department?: string,
    @Query('year') year?: string,
  ) {
    return this.coursesService.findAll(department, year);
  }

  // GET /courses/:id — fetch one course
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  // POST /courses — create a new course
  @Post()
  create(@Body() body: { title: string; description: string; credits: number; department: string; year: string }) {
    return this.coursesService.create(body);
  }

  // PATCH /courses/:id — update an existing course
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { title?: string; description?: string; credits?: number; department?: string; year?: string },
  ) {
    return this.coursesService.update(+id, body);
  }

  // DELETE /courses/:id — delete a course
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}