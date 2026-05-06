import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IUser } from 'src/models/user';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signIn(user: IUser): Promise<any> {
    const authUser = await this.userService.authUser(user);

    if (!authUser) {
        throw new UnauthorizedException();
    }

    return user;
  }
}
