import { ITour } from "src/models/tour";

export class TourDto implements ITour {
    name: string;
    date: string;
    description: string;
    tourOperator: string;
    price: string;
    img: string;
    id: string;
    type: string;

    constructor(name, description, tourOperator, price) {
        this.name = name;
        this.description = description;
        this.tourOperator = tourOperator;
        this.price = price;
    }
}