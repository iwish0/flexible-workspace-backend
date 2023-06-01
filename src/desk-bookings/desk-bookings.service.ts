import { DeskBookingState, SearchCriteria } from 'src/shared/models/desk-booking-state.model';
import { DeskBooking, DeskBookingDocument } from 'src/shared/schemas/desk-booking.schema';
import { Desk } from 'src/shared/schemas/desk.schema';
import { DesksService } from 'src/desks/desks.service';
import { InjectModel } from "@nestjs/mongoose";
import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { PARAMETRE_INVALIDE } from 'src/shared/constants/error-label.constant';
import { DateUtils } from 'src/shared/utils/date.utils';
import { OfficeLayoutService } from 'src/office-layout/office-layout.service';
import { OfficeLayoutSVGData } from 'src/shared/models/office-layout.models';

@Injectable()
export class DeskBookingsService {

    constructor(
        private readonly desksService: DesksService,
        private readonly officeLayoutService: OfficeLayoutService,
        @InjectModel(DeskBooking.name) private bookingModel: Model<DeskBookingDocument>
    ) { }

    public findAll(): Promise<DeskBooking[]> {
        return this.bookingModel.find().catch((error) => error);
    }

    public findByCriteria(searchCriteria: SearchCriteria): Promise<DeskBooking[]> {
        const { checkInDateTime, checkOutDateTime } = searchCriteria;
        console.log(DateUtils.getDateWithoutSecondAndMiilisecond(checkInDateTime))
        console.log(DateUtils.getDateWithoutSecondAndMiilisecond(checkOutDateTime))
        return this.bookingModel.find({
            $and: [
                {
                    checkInDateTime: { $gte: DateUtils.getDateWithoutSecondAndMiilisecond(checkInDateTime) },
                    checkOutDateTime: { $lte: DateUtils.getDateWithoutSecondAndMiilisecond(checkOutDateTime) }
                }
            ]
        }).catch((error) => error)
    }

    public findOne(id: string): Promise<DeskBooking> {
        return this.bookingModel.findById(id).catch((error) => error);

    }

    public create(booking: DeskBooking): Promise<DeskBooking> {
        const newBooking = new this.bookingModel(booking);
        return newBooking.save().catch((error) => error);
    }

    public async findDesksBookingState(searchCriteria: SearchCriteria): Promise<DeskBookingState[]> {
        try {
            if (!searchCriteria.checkInDateTime || !searchCriteria.checkOutDateTime) {
                throw new BadRequestException(PARAMETRE_INVALIDE);
            }
            const desks: Desk[] = await this.desksService.findAll();
            const bookings: DeskBooking[] = await this.findByCriteria(searchCriteria);
            const ids: string[] = bookings.map((booking: DeskBooking) => new mongoose.Types.ObjectId(booking.deskId).toString());
            const deskBookingState: DeskBookingState[] = desks.map((desk: Desk) => {
                return {
                    searchCriteria,
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

    public async getOfficeLayoutWithDeskBookingsState(searchCriteria: SearchCriteria): Promise<OfficeLayoutSVGData[]> {
        try {
            const listDeskBookingState: DeskBookingState[] = await this.findDesksBookingState(searchCriteria);
            return await Promise.resolve(this.officeLayoutService.getOfficeLayoutWithDeskBookingsState(listDeskBookingState));
        } catch (e) {
            return e;
        }

    }
} 
