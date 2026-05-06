import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { DeleteResult } from 'mongoose';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ITour } from 'src/models/tour';
import { ToursService } from 'src/services/tours/tours/tours.service';

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
    generateTours(): void {
       this.toursService.generateTours(); 
    }
}
