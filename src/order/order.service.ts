import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ) {}

  async createOrder(orderData: Partial<Order>) {
    const order = new this.orderModel(orderData);
    return order.save();
  }

  async getOrdersByUser(userId: string) {
    return this.orderModel.find({ user: userId }).sort({
      createdAt: -1,
    });
  }
}
