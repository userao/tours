import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult } from 'mongoose';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { IUser } from 'src/models/user';
import { User } from 'src/schemas/users.schema';
import { AuthService } from 'src/services/auth/auth.service';
import { UsersService } from 'src/services/users/users.service';
import { handleHttpError } from 'src/utils';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService, private authService: AuthService) {}

  @Get()
  getAllUsers(): Promise<IUser[]> {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getUserById(@Param('id') id: string): Promise<IUser> {
    return this.userService.getUserById(id);
  }

  @Post('auth')
  async authUser(@Body() user: User): Promise<{ access_token: string }> {
    return this.authService.signIn(user);
  }

  @Post('register')
  async createUser(@Body() user: User): Promise<IUser> {
    const isUserExists = await this.userService.isUserExists(user.login);

    if (isUserExists) {
      const errorMsg = `User ${user.login} already exists`;
      handleHttpError(HttpStatus.CONFLICT, errorMsg);
    }

    return this.userService.createUser(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: any): Promise<IUser> {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<IUser> {
    return this.userService.deleteUser(id);
  }

  @Delete()
  deleteAllUsers(): Promise<DeleteResult> {
    return this.userService.deleteUsers();
  }
}
