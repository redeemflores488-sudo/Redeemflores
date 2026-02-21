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

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  year: string;

  @Column({ default: true })
  isActive: boolean;
}