import { BookingConfirmationEmailService } from '../shared/services/email/booking-confirmation-email.service';
import { RoomBooking, RoomBookingDocument } from 'src/shared/schemas/room-booking.schema';
import { RoomBookingInfo, RoomBookingState } from 'src/shared/models/room-booking.model';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RoomOfficeLayoutSVGData } from 'src/shared/models/room-office-layout.model';
import { PARAMETRE_INVALIDE } from 'src/shared/constants/error-label.constant';
import { OfficeLayoutService } from 'src/office-layout/office-layout.service';
import { SearchCriteria } from 'src/shared/models/booking-state.model';
import { RoomsService } from '../shared/services/room/rooms.service';
import { DateUtils } from 'src/shared/utils/date.utils';
import { Room } from 'src/shared/schemas/room.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class RoomBookingsService {

    constructor(
        private readonly roomsService: RoomsService,
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
        const { checkInDateTime, checkOutDateTime } = roomBooking;
        const checkInDateTimeFormated = DateUtils.getDateWithoutSecondAndMiilisecond(checkInDateTime);
        const checkOutDateTimeFormated = DateUtils.getDateWithoutSecondAndMiilisecond(checkOutDateTime);
        const bookingToSave: RoomBooking = { ...roomBooking, checkInDateTime: checkInDateTimeFormated, checkOutDateTime: checkOutDateTimeFormated };
        const savedBooking: RoomBooking = await new this.roomBookingModel(bookingToSave).save();
        const room: Room = await this.roomsService.findOne(savedBooking.roomId);
        this.bookingConfirmationEmailService.sendRoomBookingConfirmationEmail(savedBooking, room);
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
        const { checkInDateTime, checkOutDateTime } = searchCriteria;
        return this.roomBookingModel.find({
            $and: [
                {
                    checkInDateTime: { $gte: DateUtils.getStartOfDay(checkInDateTime) },
                    checkOutDateTime: { $lte: DateUtils.getEndOfDay(checkOutDateTime) }
                }
            ]
        });
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
