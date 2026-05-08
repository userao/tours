import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DeleteResult } from 'mongoose';
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
    createTour(@Body() data): Promise<ITour> {
        return this.toursService.createTour(data);
    }

    @Delete()
    removeAllTours(): Promise<DeleteResult> {
        return this.toursService.removeAllTours();
    }

    @Get("generate")
    generateTours(): Promise<ITour[]> {
       return this.toursService.generateTours(); 
    }
    
    @Get(":id")
    getTourById(@Param('id', ParamIdPipe) id: string) {
        return this.toursService.getTourById(id);
    }
}
