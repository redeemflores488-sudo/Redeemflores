// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './student/students.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // If MYSQL_URL exists (Railway), use it. Otherwise use individual values (localhost)
      url: process.env.MYSQL_URL,
      host: process.env.MYSQL_URL ? undefined : (process.env.DB_HOST || 'localhost'),
      port: process.env.MYSQL_URL ? undefined : (process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306),
      username: process.env.MYSQL_URL ? undefined : (process.env.DB_USERNAME || 'root'),
      password: process.env.MYSQL_URL ? undefined : (process.env.DB_PASSWORD || ''),
      database: process.env.MYSQL_URL ? undefined : (process.env.DB_DATABASE || 'enrollment_db'),
      autoLoadEntities: true,
      synchronize: true,
    }),
    CoursesModule,
    StudentsModule,
  ],
})
export class AppModule {}