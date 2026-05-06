import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import { TourDto } from 'src/dto/tours-dto';
import { ITour } from 'src/models/tour';
import { Tour, TourDocument } from 'src/schemas/tours.schema';

@Injectable()
export class ToursService {
  toursCount = 10;

  constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) {}

  generateTours() {
    for (let i = 0; i < this.toursCount; i += 1) {
      const tour = new TourDto('name' + i, 'desc' + i, 'operator' + i, 'price' + i);
      const tourData = new this.tourModel(tour);
      tourData.save();
    }
  }

  async getAllTours(): Promise<ITour[]> {
    return this.tourModel.find();
  }

  async getTourById(id: string): Promise<ITour> {
    return this.tourModel.findById(id);
  }

  async createTour(tour: any): Promise<ITour> {
    const tourData = new this.tourModel(tour);
    return tourData.save();
  }

  async removeAllTours(): Promise<DeleteResult> {
    return this.tourModel.deleteMany({});
  }
}
