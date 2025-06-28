import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async placeOrder(@Body() body: any, @Req() req: any) {
    const userId = req.user.userId;
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
  async getMyOrders(@Req() req: any) {
    const userId = req.user.userId;
    const orders = await this.orderService.getOrdersByUser(userId);
    return orders;
  }
}
