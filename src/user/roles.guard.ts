import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
          const role = request.headers['x-role'];

              if (role !== 'admin') {
                    throw new ForbiddenException('Admin access only');
                        }

                            return true;
                              }
                              }