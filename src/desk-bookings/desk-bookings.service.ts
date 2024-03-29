import { BookingConfirmationEmailService } from '../shared/services/email/booking-confirmation-email.service';
import { DeskBooking, DeskBookingDocument } from 'src/shared/schemas/desk-booking.schema';
import { DeskBookingInfo, DeskBookingState } from 'src/shared/models/desk-booking.model';
import { DeskOfficeLayoutSVGData } from 'src/shared/models/desk-office-layout.model';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { deskBookingCalendarSubject } from 'src/shared/constants/label.constant';
import { CalendarService } from '../shared/services/calendar/calendar.service';
import { PARAMETRE_INVALIDE } from 'src/shared/constants/error-label.constant';
import { OfficeLayoutService } from 'src/office-layout/office-layout.service';
import { EventScheduleDetail } from 'src/shared/models/event-schedule.model';
import { SearchCriteria } from 'src/shared/models/booking-state.model';
import { DesksService } from '../shared/services/desk/desks.service';
import { DBQueryUtils } from 'src/shared/utils/db-query.utils';
import { DateUtils } from 'src/shared/utils/date.utils';
import { Desk } from 'src/shared/schemas/desk.schema';
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from 'mongoose';

@Injectable()
export class DeskBookingsService {

    constructor(
        private readonly desksService: DesksService,
        private readonly calendarService: CalendarService,
        private readonly officeLayoutService: OfficeLayoutService,
        private readonly bookingConfirmationEmailService: BookingConfirmationEmailService,
        @InjectModel(DeskBooking.name) private readonly deskBookingModel: Model<DeskBookingDocument>
    ) { }

    public findAll(): Promise<DeskBooking[]> {
        return this.deskBookingModel.find();
    }

    public async findOne(id: string): Promise<DeskBooking> {
        const deskBooking: DeskBooking = await this.deskBookingModel.findById(id);
        if (!deskBooking) throw new NotFoundException();
        return deskBooking;
    }

    public async create(booking: DeskBooking): Promise<DeskBooking> {
        const { checkInDateTime, checkOutDateTime } = booking;
        const checkInDateTimeFormated: Date = DateUtils.getDateWithoutSecondAndMiilisecond(checkInDateTime);
        const checkOutDateTimeFormated: Date = DateUtils.getDateWithoutSecondAndMiilisecond(checkOutDateTime);
        const deskBookingToSave: DeskBooking = { ...booking, checkInDateTime: checkInDateTimeFormated, checkOutDateTime: checkOutDateTimeFormated };
        const savedBooking: DeskBooking = await new this.deskBookingModel(deskBookingToSave).save();
        const desk: Desk = await this.desksService.findOne(savedBooking.deskId);
        this.bookingConfirmationEmailService.sendDeskBookingConfirmationEmail(booking, desk);
        const eventScheduleDetail: EventScheduleDetail = {
            userId: booking.user.id,
            subject: deskBookingCalendarSubject(desk.name),
            startDateTime: DateUtils.getDateTimeForDeskBookingCalendar(checkInDateTimeFormated, 8),
            endDateTime: DateUtils.getDateTimeForDeskBookingCalendar(checkOutDateTimeFormated, 18)
        };
        this.calendarService.scheduleEvent(eventScheduleDetail);
        return savedBooking;
    }

    public deleteOne(bookingId: string): Promise<any> {
        return this.deskBookingModel.deleteOne({ '_id': bookingId });
    }

    public async findDeskBookingHistoryByUser(userId: string): Promise<DeskBookingInfo[]> {
        const startDate: Date = DateUtils.getStartOfDay(DateUtils.getPastDate(new Date(), 3, 'months'));
        const endDate: Date = DateUtils.getEndOfDay(DateUtils.getFuturDate(new Date(), 6, 'months').toISOString());
        const dateTimeInterval: { checkInDateTime: { $gte: Date }, checkOutDateTime: { $lte: Date } } = {
            checkInDateTime: { $gte: startDate },
            checkOutDateTime: { $lte: endDate }
        };
        const desks: Desk[] = await this.desksService.findAll();
        const bookings: DeskBooking[] = await this.deskBookingModel.find({ 'user.id': userId, $and: [dateTimeInterval] });
        return bookings.map((booking: DeskBooking) => {
            const deskBookingInfo: DeskBookingInfo = {
                bookingInfo: booking,
                deskInfo: desks.find((desk: Desk) => new mongoose.Types.ObjectId(desk._id).toString() === booking.deskId)
            };
            return deskBookingInfo;
        });
    }

    public findDeskBookingsByCriteria(searchCriteria: SearchCriteria): Promise<DeskBooking[]> {
        const checkInDateTimeFormated: Date = DateUtils.getStartOfDay(searchCriteria.checkInDateTime);
        const checkOutDateTimeFormated: Date = DateUtils.getEndOfDay(searchCriteria.checkOutDateTime);
        const query: Object = DBQueryUtils.getSearchBookingQuery(checkInDateTimeFormated, checkOutDateTimeFormated);
        return this.deskBookingModel.find(query);
    }

    public async findDesksBookingState(searchCriteria: SearchCriteria): Promise<DeskBookingState[]> {
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
    }

    public async getOfficeLayoutWithDeskBookingsState(searchCriteria: SearchCriteria): Promise<DeskOfficeLayoutSVGData[]> {
        const listDeskBookingState: DeskBookingState[] = await this.findDesksBookingState(searchCriteria);
        return Promise.resolve(this.officeLayoutService.getOfficeLayoutWithDeskBookingsState(listDeskBookingState));
    }
}
