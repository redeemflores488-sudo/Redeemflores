import { Controller, Post, Body, OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('auth')
export class UserController implements OnModuleInit {
  constructor(private readonly userService: UserService) {}

    // Auto-seed admin on startup
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
                                          }