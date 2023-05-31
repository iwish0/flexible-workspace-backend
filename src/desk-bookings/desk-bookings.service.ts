import { DeskBookingState } from 'src/shared/models/desk-booking-state.model';
import { DeskBooking, DeskBookingDocument } from 'src/shared/schemas/desk-booking.schema';
import { Criteria } from './desk-bookings.controller';
import { Desk } from 'src/shared/schemas/desk.schema';
import { DesksService } from 'src/desks/desks.service';
import { InjectModel } from "@nestjs/mongoose";
import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { PARAMETRE_INVALIDE } from 'src/shared/constants/error-label.constant';

@Injectable()
export class DeskBookingsService {

    constructor(
        private readonly desksService: DesksService,
        @InjectModel(DeskBooking.name) private bookingModel: Model<DeskBookingDocument>
    ) { }

    public findAll(): Promise<DeskBooking[]> {
        return this.bookingModel.find().catch((error) => error);
    }

    public findByCriteria(criteria: Criteria): Promise<DeskBooking[]> {
        return this.bookingModel.find({
            $and: [
                {
                    checkInDateTime: { $gte: new Date(criteria.checkInDateTime) },
                    checkOutDateTime: { $lte: new Date(criteria.checkOutDateTime) }
                }
            ]
        }).catch((error) => error)
    }

    public findOne(id: string): Promise<DeskBooking> {
        return this.bookingModel.findById(id).catch((error) => error);

    }

    public create(booking: DeskBooking): Promise<DeskBooking> {
        const mockBooking = { "deskId": "64706d7553aa76f4e68f47a8", "userName": "test", "checkInDateTime": new Date(2023, 4, 30, 8), "checkOutDateTime": new Date(2023, 4, 30, 18, 30) }
        const newBooking = new this.bookingModel(mockBooking);
        return newBooking.save().catch((error) => error);
    }

    public async findDesksBookingState(criteria: Criteria): Promise<DeskBookingState[]> {
        try {
            if (!criteria.checkInDateTime || !criteria.checkOutDateTime) {
                throw new BadRequestException(PARAMETRE_INVALIDE);
            }
            const desks: Desk[] = await this.desksService.findAll();
            const bookings: DeskBooking[] = await this.findByCriteria(criteria);
            const ids: string[] = bookings.map((booking: DeskBooking) => new mongoose.Types.ObjectId(booking.deskId).toString());
            const deskBookingState: DeskBookingState[] = desks.map((desk: Desk) => {
                return {
                    deskInfo: desk,
                    isBooked: ids.includes(new mongoose.Types.ObjectId(desk._id).toString()),
                    bookingInfo: bookings.find((booking: DeskBooking) => new mongoose.Types.ObjectId(desk._id).toString() === booking.deskId) || null
                }
            })
            return deskBookingState;
        } catch (e) {
            return e
        }
    }
} 
