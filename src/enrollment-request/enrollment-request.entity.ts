import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Course } from '../courses/entities/course.entity';

export enum RequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('enrollment_requests')
export class EnrollmentRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentName: string;

  @ManyToOne(() => Course, { eager: true })
  course: Course;

  @Column({ type: 'enum', enum: RequestStatus, default: RequestStatus.PENDING })
  status: RequestStatus;

  @CreateDateColumn()
  createdAt: Date;
}