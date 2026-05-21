import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import { UserDto } from 'src/dto/user-dto';
import { User, UserDocument } from 'src/schemas/users.schema';
import * as bcrypt from 'bcrypt';

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

  async createUser(user: UserDto): Promise<boolean> {
    const role = user.role ?? 'user';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password.toString(), salt);
    const userData = new this.userModel({ ...user, password: hash, role });
    userData.save();

    return true;
  }

  async findUser(login: string): Promise<User & { _id: string }> {
    return this.userModel.findOne({
      login,
    });
  }

  async updateUser(id: string, user: UserDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password.toString(), salt);
    return this.userModel.findByIdAndUpdate(id, { ...user, password: hash });
  }

  async deleteUsers(): Promise<DeleteResult> {
    return this.userModel.deleteMany({});
  }

  async deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
