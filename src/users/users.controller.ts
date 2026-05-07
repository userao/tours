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
import { UserDto } from 'src/dto/user-dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { User } from 'src/schemas/users.schema';
import { AuthService } from 'src/services/auth/auth.service';
import { UsersService } from 'src/services/users/users.service';
import { handleHttpError } from 'src/utils';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post('auth')
  async authUser(
    @Body() user: UserDto,
  ): Promise<{ id: string; access_token: string }> {
    return this.authService.signIn(user);
  }

  @Post('register')
  async createUser(@Body() user: UserDto) {
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
  deleteAllUsers(): Promise<DeleteResult> {
    return this.userService.deleteUsers();
  }
}
