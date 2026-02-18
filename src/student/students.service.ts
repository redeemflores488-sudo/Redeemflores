// src/students/students.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../student/entities/student.entity';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  // CREATE
  async create(data: { name: string; studentId: string }): Promise<Student> {
    const student = this.studentRepository.create(data);
    return this.studentRepository.save(student);
  }

  // READ ALL (with enrolled courses)
  findAll(): Promise<Student[]> {
    return this.studentRepository.find({ relations: ['enrolledCourses'] });
  }

  // READ ONE
  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['enrolledCourses'],
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  // UPDATE
  async update(id: number, data: { name?: string; studentId?: string }): Promise<Student> {
    const student = await this.findOne(id);
    Object.assign(student, data);
    return this.studentRepository.save(student);
  }

  // DELETE
  async remove(id: number): Promise<void> {
    const student = await this.findOne(id);
    await this.studentRepository.remove(student);
  }

  // ENROLL in a course
  async enroll(studentId: number, courseId: number): Promise<Student> {
    const student = await this.findOne(studentId);
    const course = await this.courseRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }
    student.enrolledCourses = [...(student.enrolledCourses || []), course];
    return this.studentRepository.save(student);
  }

  // UNENROLL from a course
  async unenroll(studentId: number, courseId: number): Promise<Student> {
    const student = await this.findOne(studentId);
    student.enrolledCourses = student.enrolledCourses.filter(c => c.id !== courseId);
    return this.studentRepository.save(student);
  }
}