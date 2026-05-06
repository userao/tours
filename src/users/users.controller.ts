import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from 'src/schemas/users.schema';
import { AuthService } from 'src/services/auth/auth.service';
import { UsersService } from 'src/services/users/users.service';
import { handleHttpError } from 'src/utils';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService, private authService: AuthService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post('auth')
  async authUser(@Body() user: User) {
    const authUser = await this.authService.signIn(user);
    return authUser; 
  }

  @Post('register')
  async createUser(@Body() user: User) {
    const isUserExists = await this.userService.isUserExists(user.login);

    if (isUserExists) {
      const errorMsg = `User ${user.login} already exists`;
      handleHttpError(HttpStatus.CONFLICT, errorMsg);
    }

    return this.userService.createUser(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: any) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Delete()
  deleteAllUsers() {
    return this.userService.deleteUsers();
  }
}
