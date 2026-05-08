import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tour, TourSchema } from 'src/schemas/tours.schema';
import { ToursService } from 'src/services/tours/tours.service';
import { ToursController } from './tours.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }]),
  ],
  controllers: [ToursController],
  providers: [ToursService],
})
export class ToursModule {}
