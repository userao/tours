import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IUser } from 'src/models/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: IUser): Promise<{ access_token: string }> {
    const authUser = await this.userService.authUser(user);

    if (!authUser) {
      throw new UnauthorizedException();
    }

    const payload = { sub: authUser.id, login: authUser.login };

    return { access_token: await this.jwtService.signAsync(payload)};
  }
}
