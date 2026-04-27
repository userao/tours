import { Body, Injectable, Param } from '@nestjs/common';

@Injectable()
export class UsersService {
  getAllUsers() {
    return { users: [] };
  }

  getUserById(id: string) {
    return 'user ' + id;
  }

  createUser(@Body('user') user: any) {}

  updateUser(@Body('user') user: any) {}

  deleteUser(id: string) {}
}
