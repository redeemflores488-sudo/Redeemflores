// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './student/students.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // Replace with your MySQL password
      database: 'enrollment_db',
      autoLoadEntities: true,
      synchronize: true, // Note: Set to false in production!
    }),
    CoursesModule,
    StudentsModule, // ← Add this
  ],
})
export class AppModule {}

