import { IUser } from 'src/models/user';

export class UserDto implements IUser {
  password: string;
  login: string;
  email: string;
  id: string;
}
