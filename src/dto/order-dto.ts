import {
  IsNotEmpty,
  Length,
  Matches,
  MinLength,
  ValidationArguments,
} from 'class-validator';
import { IOrder } from 'src/models/order';

export class OrderDto implements IOrder {
  @MinLength(2)
  @IsNotEmpty()
  name: string;
  @Matches(/^(?:\d{4}?\s){3}(?:\d{4})$/gm, {
    message: 'not a valid card number'
  })
  @IsNotEmpty()
  cardNumber: string;
  id: string;
  @IsNotEmpty()
  tourId: string;
  email: string;
  @IsNotEmpty()
  userId: string;

  // constructor(
  //   name: string,
  //   email: string,
  //   cardNumber: string,
  //   tourId: string,
  //   userId: string,
  // ) {
  //   this.name = name;
  //   this.email = email;
  //   this.cardNumber = cardNumber;
  //   this.tourId = tourId;
  //   this.userId = userId;
  // }
}
