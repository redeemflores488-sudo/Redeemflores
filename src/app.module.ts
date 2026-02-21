import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './student/students.module';
import { UserModule } from './user/user.module';
import { EnrollmentRequestModule } from './enrollment-request/enrollment-request.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('MYSQL_URL');

        if (url) {
          return {
            type: 'mysql',
            url: url,
            autoLoadEntities: true,
            synchronize: true,
          };
        }

        return {
          type: 'mysql',
          host: config.get<string>('DB_HOST') || 'localhost',
          port: config.get<number>('DB_PORT') || 3306,
          username: config.get<string>('DB_USERNAME') || 'root',
          password: config.get<string>('DB_PASSWORD') || '',
          database: config.get<string>('DB_NAME') || 'railway',
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),

    CoursesModule,
    StudentsModule,
    UserModule,
    EnrollmentRequestModule,
  ],
})
export class AppModule {}