import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  findAll() {
    return this.repo.find();
  }

  create(data: User) {
    const user = this.repo.create(data);

    return this.repo.save(user);
  }

  findByEmail(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, data: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, data);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
