import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { Order } from 'src/order/schemas/order.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const user = new this.userModel(userData);
    return user.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async users(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserProfile(userId: string) {
    const user = await this.userModel.findById(userId).select('-password');
    const orders = await this.orderModel.find({ user: userId });
    return { user, orders };
  }
}
