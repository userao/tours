import { IsNotEmpty, IsOptional } from "class-validator";
import { ITour } from "src/models/tour";

export class TourDto implements ITour {
    @IsNotEmpty()
    name: string;
    @IsOptional()
    date: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    tourOperator: string;
    @IsNotEmpty()
    price: string;
    @IsOptional()
    img: string;
    @IsOptional()
    id: string;
    @IsOptional()
    type: string;

    constructor(name, description, tourOperator, price) {
        this.name = name;
        this.description = description;
        this.tourOperator = tourOperator;
        this.price = price;
    }
}