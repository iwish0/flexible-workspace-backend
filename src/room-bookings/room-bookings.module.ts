import { RoomBooking, RoomBookingSchema } from 'src/shared/schemas/room-booking.schema';
import { RoomsServiceModule } from '../shared/services/room/rooms-service.module';
import { OfficeLayoutService } from '../office-layout/office-layout.service';
import { RoomBookingsController } from './room-bookings.controller';
import { RoomBookingsService } from './room-bookings.service';
import { SharedModule } from 'src/shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  controllers: [RoomBookingsController],
  imports: [
    SharedModule,
    RoomsServiceModule,
    MongooseModule.forFeature([{ name: RoomBooking.name, schema: RoomBookingSchema }])],
  providers: [
    RoomBookingsService,
    OfficeLayoutService
  ]
})
export class RoomBookingsModule { }
