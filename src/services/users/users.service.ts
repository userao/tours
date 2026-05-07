import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import { UserDto } from 'src/dto/user-dto';
import { IUser } from 'src/models/user';
import { User, UserDocument } from 'src/schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async isUserExists(login: string): Promise<boolean> {
    return !!(await this.userModel.findOne({ login }));
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findUser(login: string): Promise<User> {
    const user = this.userModel.findOne({ login });
    return user;
  }

  async createUser(user: UserDto): Promise<User> {
    const userData = new this.userModel(user);
    return userData.save();
  }

  async authUser(user: UserDto): Promise<User & { _id: string }> {
    return this.userModel.findOne({
      login: user.login,
      password: user.password,
    });
  }

  async updateUser(id: string, user: UserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user);
  }

  async deleteUsers(): Promise<DeleteResult> {
    return this.userModel.deleteMany({});
  }

  async deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
