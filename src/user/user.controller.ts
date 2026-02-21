import { Controller, Post, Patch, Body, OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('auth')
export class UserController implements OnModuleInit {
  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    await this.userService.seedAdmin();
  }

  @Post('register')
  register(@Body() body: { name: string; password: string }) {
    return this.userService.register(body.name, body.password);
  }

  @Post('login')
  login(@Body() body: { name: string; password: string }) {
    return this.userService.login(body.name, body.password);
  }

  @Post('login/admin')
  loginAdmin(@Body() body: { name: string; password: string }) {
    return this.userService.loginAdmin(body.name, body.password);
  }

  @Patch('section')
  updateSection(@Body() body: { name: string; department: string; year: string; section: string }) {
    return this.userService.updateSection(body.name, body.department, body.year, body.section);
  }
}