import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IUser } from 'src/models/user';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: IUser): Promise<{ id: string; access_token: string }> {
    const authUser = await this.userService.findUser(user.login);

    if (!authUser) {
      throw new UnauthorizedException();
    }

    const isPassMatch = await bcrypt.compare(user.password, authUser.password);

    if (!isPassMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: authUser._id, login: authUser.login };

    return {
      id: authUser._id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
