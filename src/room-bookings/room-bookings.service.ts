import { BookingConfirmationEmailService } from '../shared/services/email/booking-confirmation-email.service';
import { RoomBooking, RoomBookingDocument } from 'src/shared/schemas/room-booking.schema';
import { RoomBookingInfo, RoomBookingState } from 'src/shared/models/room-booking.model';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RoomOfficeLayoutSVGData } from 'src/shared/models/room-office-layout.model';
import { roomBookingCalendarSubject } from 'src/shared/constants/label.constant';
import { CalendarService } from 'src/shared/services/calendar/calendar.service';
import { PARAMETRE_INVALIDE } from 'src/shared/constants/error-label.constant';
import { OfficeLayoutService } from 'src/office-layout/office-layout.service';
import { EventScheduleDetail } from 'src/shared/models/event-schedule.model';
import { SearchCriteria } from 'src/shared/models/booking-state.model';
import { RoomsService } from '../shared/services/room/rooms.service';
import { DBQueryUtils } from 'src/shared/utils/db-query.utils';
import { DateUtils } from 'src/shared/utils/date.utils';
import { Room } from 'src/shared/schemas/room.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class RoomBookingsService {

    constructor(
        private readonly roomsService: RoomsService,
        private readonly calendarService: CalendarService,
        private readonly officeLayoutService: OfficeLayoutService,
        private readonly bookingConfirmationEmailService: BookingConfirmationEmailService,
        @InjectModel(RoomBooking.name) private readonly roomBookingModel: Model<RoomBookingDocument>
    ) { }

    public findAll(): Promise<RoomBooking[]> {
        return this.roomBookingModel.find();
    }

    public async findOne(id: string): Promise<RoomBooking> {
        const roomBooking: RoomBooking = await this.roomBookingModel.findById(id);
        if (roomBooking) throw new NotFoundException();
        return roomBooking;
    }

    public async create(roomBooking: RoomBooking): Promise<RoomBooking> {
        const { checkInDateTime, checkOutDateTime, user } = roomBooking;
        const checkInDateTimeFormated = DateUtils.getDateWithoutSecondAndMiilisecond(checkInDateTime);
        const checkOutDateTimeFormated = DateUtils.getDateWithoutSecondAndMiilisecond(checkOutDateTime);
        const bookingToSave: RoomBooking = { ...roomBooking, checkInDateTime: checkInDateTimeFormated, checkOutDateTime: checkOutDateTimeFormated };
        const savedBooking: RoomBooking = await new this.roomBookingModel(bookingToSave).save();
        const room: Room = await this.roomsService.findOne(savedBooking.roomId);
        this.bookingConfirmationEmailService.sendRoomBookingConfirmationEmail(savedBooking, room);
        const eventScheduleDetail: EventScheduleDetail = {
            userId: user.id,
            subject: roomBookingCalendarSubject(room.name),
            startDateTime: checkInDateTimeFormated.toISOString(),
            endDateTime: checkOutDateTimeFormated.toISOString()
        };
        this.calendarService.scheduleEvent(eventScheduleDetail);
        return savedBooking;
    }

    public deleteOne(bookingId: string): Promise<any> {
        return this.roomBookingModel.deleteOne({ '_id': bookingId });
    }

    public async getOfficeLayoutWithRoomBookingsState(searchCriteria: SearchCriteria): Promise<RoomOfficeLayoutSVGData[]> {
        const listDeskBookingState: RoomBookingState[] = await this.findRoomBookingState(searchCriteria);
        return Promise.resolve(this.officeLayoutService.getOfficeLayoutWithRoomBookingsState(listDeskBookingState));
    }

    public async findRoomBookingState(searchCriteria: SearchCriteria): Promise<RoomBookingState[]> {
        if (!searchCriteria.checkInDateTime || !searchCriteria.checkOutDateTime) {
            throw new BadRequestException(PARAMETRE_INVALIDE);
        }
        const rooms: Room[] = await this.roomsService.findAll();
        const bookings: RoomBooking[] = await this.findRoomBookingsByCriteria(searchCriteria);
        const ids: string[] = bookings.map((booking: RoomBooking) => new mongoose.Types.ObjectId(booking.roomId).toString());
        const roomBookingState: RoomBookingState[] = rooms.map((room: Room) => {
            return {
                searchCriteria,
                roomInfo: room,
                isBooked: ids.includes(new mongoose.Types.ObjectId(room._id).toString()),
                bookingInfo: bookings.find((booking: RoomBooking) => new mongoose.Types.ObjectId(room._id).toString() === booking.roomId) || null
            }
        });
        return roomBookingState;
    }

    public findRoomBookingsByCriteria(searchCriteria: SearchCriteria): Promise<RoomBooking[]> {
        const checkInDateTimeFormated: Date = DateUtils.getDateWithoutSecondAndMiilisecond(searchCriteria.checkInDateTime);
        const checkOutDateTimeFormated: Date = DateUtils.getDateWithoutSecondAndMiilisecond(searchCriteria.checkOutDateTime);
        const query: Object = DBQueryUtils.getSearchBookingQuery(
            DateUtils.getFuturDate(checkInDateTimeFormated, 1, 'minute'),
            DateUtils.getPastDate(checkOutDateTimeFormated, 1, 'minute')
        );
        return this.roomBookingModel.find(query);
    }

    public async findRoomBookingsByUser(userId: string): Promise<RoomBookingInfo[]> {
        const startDate: Date = DateUtils.getStartOfDay(DateUtils.getPastDate(new Date(), 3, 'months'));
        const endDate: Date = DateUtils.getEndOfDay(DateUtils.getFuturDate(new Date(), 6, 'months').toISOString());
        const dateTimeInterval: { checkInDateTime: { $gte: Date }, checkOutDateTime: { $lte: Date } } = {
            checkInDateTime: { $gte: startDate },
            checkOutDateTime: { $lte: endDate }
        };
        const rooms: Room[] = await this.roomsService.findAll();
        const bookings: RoomBooking[] = await this.roomBookingModel.find({ 'user.id': userId, $and: [dateTimeInterval] });
        return bookings.map((booking: RoomBooking) => {
            const roomBookingInfo: RoomBookingInfo = {
                bookingInfo: booking,
                roomInfo: rooms.find((room: Room) => new mongoose.Types.ObjectId(room._id).toString() === booking.roomId)
            };
            return roomBookingInfo;
        });
    }
}
