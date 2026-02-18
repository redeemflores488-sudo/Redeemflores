// src/courses/entities/course.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  credits: number;

  @Column({ default: true })
  isActive: boolean;
}