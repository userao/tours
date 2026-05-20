import { IsNotEmpty, IsOptional } from 'class-validator';
import { IUser } from 'src/models/user';

export class UserDto implements IUser {
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  login: string;
  @IsOptional()
  email: string;
  id: string;
}
