import { IsArray, IsNumber } from 'class-validator';

export class PlaceOrderDto {
  @IsArray()
  items: any[];

  @IsNumber()
  totalAmount: number;
}
