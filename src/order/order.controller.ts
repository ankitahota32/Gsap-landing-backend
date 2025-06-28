// src/order/order.controller.ts
import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { Request } from 'express';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PlaceOrderDto } from './dto/place-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async placeOrder(@Body() body: PlaceOrderDto, @Req() req: Request) {
    const userId = req.user?.userId;
    const { items, totalAmount } = body;

    const newOrder = await this.orderService.createOrder({
      user: userId,
      items,
      totalAmount,
      placedAt: new Date(),
    });

    return {
      message: 'Order placed successfully',
      order: newOrder,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-orders')
  async getMyOrders(@Req() req: Request) {
    const userId = req.user?.userId;
    const orders = await this.orderService.getOrdersByUser(userId!);
    return orders;
  }
}
