import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ToursController } from './tours/tours.controller';
import { ToursModule } from './tours/tours.module';

@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb://localhost:27017/tours'), ToursModule],
  controllers: [AppController, ToursController],
  providers: [AppService],
})
export class AppModule {}
