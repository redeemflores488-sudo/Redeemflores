
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  studentId: string; // e.g. "STU-0001"

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Course)
  @JoinTable()
  enrolledCourses: Course[];
}