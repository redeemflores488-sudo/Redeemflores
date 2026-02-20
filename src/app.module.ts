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
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('MYSQL_URL');

        // If on Railway, this URL will exist and we use it
        if (url) {
          return {
            type: 'mysql',
            url: url,
            autoLoadEntities: true,
            synchronize: true, // Be careful with this in real production
          };
        }

        // If the URL doesn't exist (like on your PC), use individual variables
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
  ],
})
export class AppModule {}
