import { DeskBookingInfo, DeskBookingState, SearchCriteria } from 'src/shared/models/desk-booking.model';
import { DeskBooking, DeskBookingDocument } from 'src/shared/schemas/desk-booking.schema';
import { PARAMETRE_INVALIDE } from 'src/shared/constants/error-label.constant';
import { OfficeLayoutService } from 'src/office-layout/office-layout.service';
import { OfficeLayoutSVGData } from 'src/shared/models/office-layout.models';
import { DesksService } from 'src/desks/desks.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { DateUtils } from 'src/shared/utils/date.utils';
import { Desk } from 'src/shared/schemas/desk.schema';
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from 'mongoose';

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

    public async deleteOne(bookingId: string): Promise<any> {
        return this.bookingModel.deleteOne({ '_id': bookingId });
    }


    public async findDeskBookingHistoryByUser(userId: number): Promise<DeskBookingInfo[]> {
        const startDate: Date = DateUtils.getStartOfDay(DateUtils.getPastDate(new Date(), 6, 'months'));
        const endDate: Date = DateUtils.getEndOfDay(DateUtils.getFuturDate(new Date(), 6, 'months').toISOString());
        const dateTimeInterval: { checkInDateTime: { $gte: Date }, checkOutDateTime: { $lte: Date } } = {
            checkInDateTime: { $gte: startDate },
            checkOutDateTime: { $lte: endDate }
        }
        const desks: Desk[] = await this.desksService.findAll();
        const bookings: DeskBooking[] = await this.bookingModel.find({ 'user.id': userId, $and: [dateTimeInterval] });
        return bookings.map((booking: DeskBooking) => {
            const deskBookingInfo: DeskBookingInfo = {
                bookingInfo: booking,
                deskInfo: desks.find((desk: Desk) => new mongoose.Types.ObjectId(desk._id).toString() === booking.deskId)
            };
            return deskBookingInfo;
        });
    }

    public findDeskBookingsByCriteria(searchCriteria: SearchCriteria): Promise<DeskBooking[]> {
        const { checkInDateTime, checkOutDateTime } = searchCriteria;
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
        const { checkInDateTime, checkOutDateTime } = booking;
        const checkInDateTimeFormated = DateUtils.getDateWithoutSecondAndMiilisecond(checkInDateTime);
        const checkOutDateTimeFormated = DateUtils.getDateWithoutSecondAndMiilisecond(checkOutDateTime);
        const deskBooking: DeskBooking = { ...booking, checkInDateTime: checkInDateTimeFormated, checkOutDateTime: checkOutDateTimeFormated };
        const newBooking = new this.bookingModel(deskBooking);
        return newBooking.save().catch((error) => error);
    }

    public async findDesksBookingState(searchCriteria: SearchCriteria): Promise<DeskBookingState[]> {
        try {
            if (!searchCriteria.checkInDateTime || !searchCriteria.checkOutDateTime) {
                throw new BadRequestException(PARAMETRE_INVALIDE);
            }
            const desks: Desk[] = await this.desksService.findAll();
            const bookings: DeskBooking[] = await this.findDeskBookingsByCriteria(searchCriteria);
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
