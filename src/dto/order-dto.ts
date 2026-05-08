import { IOrder } from 'src/models/order';

export class OrderDto implements IOrder {
  name: string;
  cardNumber: string;
  id: string;
  tourId: string;
  email: string;
  userId: string;

  constructor(
    name: string,
    email: string,
    cardNumber: string,
    tourId: string,
    userId: string,
  ) {
    this.name = name;
    this.email = email;
    this.cardNumber = cardNumber;
    this.tourId = tourId;
    this.userId = userId;
  }
}
