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
        const mysqlUrl = configService.get<string>('MYSQL_URL');
        
        if (mysqlUrl) {
          // Railway: use MYSQL_URL
          return {
            type: 'mysql' as const,
            url: mysqlUrl,
            autoLoadEntities: true,
            synchronize: true,
          };
        } else {
          // Localhost: use individual values
          return {
            type: 'mysql' as const,
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'enrollment_db',
            autoLoadEntities: true,
            synchronize: true,
          };
        }
      },
      inject: [ConfigService],
    }),
    CoursesModule,
    StudentsModule,
  ],
})
export class AppModule {}