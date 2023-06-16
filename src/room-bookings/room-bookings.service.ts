import { BookingConfirmationEmailService } from '../shared/services/email/booking-confirmation-email.service';
import { RoomBooking, RoomBookingDocument } from 'src/shared/schemas/room-booking.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DateUtils } from 'src/shared/utils/date.utils';
import { Room } from 'src/shared/schemas/room.schema';
import { RoomsService } from '../rooms/rooms.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoomBookingsService {

    constructor(
        private readonly roomsService: RoomsService,
        private readonly bookingConfirmationEmailService: BookingConfirmationEmailService,
        @InjectModel(RoomBooking.name) private readonly roomBookingModel: Model<RoomBookingDocument>
    ) { }


    public findAll(): Promise<RoomBooking[]> {
        return this.roomBookingModel.find();
    }

    public async findOne(id: string): Promise<RoomBooking> {
        const roomBooking: RoomBooking = await this.roomBookingModel.findById(id).catch((error) => error);
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
        await this.bookingConfirmationEmailService.sendRoomBookingConfirmationEmail(savedBooking, room);
        return savedBooking;
    }

    public deleteOne(bookingId: string): Promise<any> {
        return this.roomBookingModel.deleteOne({ '_id': bookingId });
    }
}
