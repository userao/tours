import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ToursModule } from './tours/tours.module';
import { JwtModule } from '@nestjs/jwt';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'SECRET KEY',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/tours'),
    UsersModule,
    ToursModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
