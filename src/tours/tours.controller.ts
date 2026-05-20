import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteResult } from 'mongoose';
import { diskStorage } from 'multer';
import { TourDto } from 'src/dto/tours-dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ITour } from 'src/models/tour';
import { ParamIdPipe } from 'src/pipes/param-id.pipe';
import { Tour } from 'src/schemas/tours.schema';
import { ToursService } from 'src/services/tours/tours.service';

@Controller('tours')
export class ToursController {
  constructor(private toursService: ToursService) {}

  // @UseGuards(AuthGuard)
  @Get()
  getAllTours(): Promise<ITour[]> {
    return this.toursService.getAllTours();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './public/',
        filename: (req, file, cb) => {
          const imgType = file.mimetype.split('/');
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const imgName =
            file.fieldname + '-' + uniqueSuffix + '.' + imgType[1];
          cb(null, imgName);
        },
      }),
    }),
  )
  createTour(@Body() data: TourDto, @UploadedFile() file: Express.Multer.File) {
    data.img = file.filename;
    return this.toursService.createTour(data);
  }

  @Delete()
  removeAllTours(): Promise<DeleteResult> {
    return this.toursService.removeAllTours();
  }

  @Get('generate')
  generateTours(): Promise<ITour[]> {
    return this.toursService.generateTours();
  }

  @Get(':id')
  getTourById(@Param('id', ParamIdPipe) id: string) {
    return this.toursService.getTourById(id);
  }
}
