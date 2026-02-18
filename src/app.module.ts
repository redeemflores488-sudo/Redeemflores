import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './student/students.module';

// Debug: Log the MYSQL_URL
console.log('MYSQL_URL:', process.env.MYSQL_URL);
console.log('All env vars:', Object.keys(process.env));

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