import { RoomBooking, RoomBookingSchema } from 'src/shared/schemas/room-booking.schema';
import { RoomBookingsController } from './room-bookings.controller';
import { Room, RoomSchema } from 'src/shared/schemas/room.schema';
import { RoomBookingsService } from './room-bookings.service';
import { RoomsService } from './../rooms/rooms.service';
import { SharedModule } from 'src/shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  controllers: [RoomBookingsController],
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: RoomBooking.name, schema: RoomBookingSchema },
      { name: Room.name, schema: RoomSchema }
    ])],
  providers: [RoomBookingsService, RoomsService]
})
export class RoomBookingsModule { }
