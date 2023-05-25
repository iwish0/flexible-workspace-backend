import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Booking, BookingDocument } from 'src/shared/schemas/booking.schema';

@Injectable()
export class BookingsService {

    constructor(@InjectModel(Booking.name) private bookingModel: Model<BookingDocument>) { }

    public findAll(): Promise<Booking[]> {
        return this.bookingModel.find();
    }

    public findByCriteria(checkInDate: string, checkOutDate: string) {
        return this.bookingModel.find({
            $and: [
                { checkInDate: { $gte: new Date(checkInDate) } },
                { checkOutDate: { $lte: new Date(checkOutDate) } }
            ]
        })
    }

    public findOne(id: string): Promise<Booking> {
        return this.bookingModel.findById(id);
    }

    public create(booking: Booking): Promise<Booking> {
        const a = { "deskId": "646dd51f2a50ad7cd911b66f", "type": "desk", "ownerName": "sedo", "checkInDate": new Date(), "checkOutDate": new Date(2023, 4, 29), "checkInTime": "5 ème étage", "checkOutTime": "5 ème étage" }
        const newBooking = new this.bookingModel(a);
        return newBooking.save();
    }
}
