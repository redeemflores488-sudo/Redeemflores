// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './student/students.module';

@Module({
  imports: [
  TypeOrmModule.forRoot({
  type: 'mysql',
  url: process.env.MYSQL_URL,
  autoLoadEntities: true,
  synchronize: true,


}),
    CoursesModule,
    StudentsModule, // ← Add this
  ],
})
export class AppModule {}

