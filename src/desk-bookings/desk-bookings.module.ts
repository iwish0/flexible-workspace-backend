import { DeskBooking, DeskBookingSchema } from 'src/shared/schemas/desk-booking.schema';
import { OfficeLayoutService } from '../office-layout/office-layout.service';
import { DeskBookingsController } from './desk-bookings.controller';
import { Desk, DeskSchema } from 'src/shared/schemas/desk.schema';
import { DeskBookingsService } from './desk-bookings.service';
import { DesksService } from '../desks/desks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DeskBookingsController],
  imports: [MongooseModule.forFeature([{ name: DeskBooking.name, schema: DeskBookingSchema }, { name: Desk.name, schema: DeskSchema }])],
  providers: [DeskBookingsService, DesksService, OfficeLayoutService]
})
export class DeskBookingsModule { }
