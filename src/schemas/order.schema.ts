import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  cardNumber: string;

  @Prop()
  tourId: string;

  @Prop()
  userId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
