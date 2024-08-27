import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(data: User) {
    const user = await this.usersService.create(data);
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.findByEmail(email);
    if (!user) {
      throw new Error('user not found');
    }

    const isValid = password === user.password;
    if (!isValid) {
      throw new Error('bad password');
    }

    return user;
  }
}
