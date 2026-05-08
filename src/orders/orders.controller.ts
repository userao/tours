import { Body, Controller, Post } from '@nestjs/common';
import { OrderDto } from 'src/dto/order-dto';
import { Order } from 'src/schemas/order.schema';
import { OrdersService } from 'src/services/orders/orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrdersService) {}

    @Post()
    addOrder(@Body() data: OrderDto): Promise<Order> {
        console.log(data);
        
        return this.orderService.sendOrder(data);
    }
}
