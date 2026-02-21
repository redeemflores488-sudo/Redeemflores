import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async register(name: string, password: string): Promise<{ message: string }> {
    const existing = await this.userRepo.findOne({ where: { name } });
    if (existing) throw new ConflictException('Name already taken');

    const hashed = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ name, password: hashed, role: UserRole.STUDENT });
    await this.userRepo.save(user);

    return { message: 'Registered successfully' };
  }

  async login(name: string, password: string): Promise<{ message: string; role: string; name: string; department: string; year: string; section: string }> {
    const user = await this.userRepo.findOne({ where: { name } });
    if (!user) throw new UnauthorizedException('Invalid name or password');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid name or password');

    return {
      message: 'Login successful',
      role: user.role,
      name: user.name,
      department: user.department,
      year: user.year,
      section: user.section,
    };
  }

  async loginAdmin(name: string, password: string): Promise<{ message: string; role: string; name: string }> {
    const user = await this.userRepo.findOne({ where: { name, role: UserRole.ADMIN } });
    if (!user) throw new UnauthorizedException('Invalid admin credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid admin credentials');

    return { message: 'Login successful', role: user.role, name: user.name };
  }

  async updateSection(name: string, department: string, year: string, section: string): Promise<{ message: string }> {
    const user = await this.userRepo.findOne({ where: { name } });
    if (!user) throw new NotFoundException('User not found');

    user.department = department;
    user.year = year;
    user.section = section;
    await this.userRepo.save(user);

    return { message: 'Section updated successfully' };
  }

  async seedAdmin() {
    const existing = await this.userRepo.findOne({ where: { name: 'admin' } });
    if (!existing) {
      const hashed = await bcrypt.hash('admin123', 10);
      const admin = this.userRepo.create({ name: 'admin', password: hashed, role: UserRole.ADMIN });
      await this.userRepo.save(admin);
      console.log('Admin user seeded: admin / admin123');
    }
  }
}