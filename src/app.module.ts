import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './student/students.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // Map your specific Railway variables
        const host = configService.get<string>('DB_HOST');
        const username = configService.get<string>('DB_USERNAME');
        const password = configService.get<string>('DB_PASSWORD');
        const database = configService.get<string>('DB_NAME');
        const port = configService.get<number>('DB_PORT') || 3306;

        console.log(`📡 Attempting to connect to database at ${host}:${port}`);

        return {
          type: 'mysql',
          host: host || 'localhost',
          port: port,
          username: username || 'root',
          password: password || '',
          database: database || 'enrollment_db',
          autoLoadEntities: true,
          synchronize: true, // Only for dev/testing
        };
      },
      inject: [ConfigService],
    }),
    CoursesModule,
    StudentsModule,
  ],
})
export class AppModule {}