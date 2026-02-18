import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './student/students.module'; // ← Keep this as is

@Module({
  imports: [
    TypeOrmModule.forRoot(
      process.env.MYSQL_URL
        ? {
            type: 'mysql',
            url: process.env.MYSQL_URL,
            autoLoadEntities: true,
            synchronize: true,
          }
        : {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'enrollment_db',
            autoLoadEntities: true,
            synchronize: true,
          }
    ),
    CoursesModule,
    StudentsModule,
  ],
})
export class AppModule {}