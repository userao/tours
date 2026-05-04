import { Body, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async createUser(user: any): Promise<User> {
    const userData = new this.userModel(user);
    return userData.save();
  }

  async updateUser(user: any): Promise<User> {
    return this.userModel.findOneAndUpdate({name: user.name}, user);
  }

  async deleteUsers(): Promise<DeleteResult> {
    return this.userModel.deleteMany();
  }

  async deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
