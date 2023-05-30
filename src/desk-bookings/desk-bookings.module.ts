import { Module } from '@nestjs/common';
import { DeskBookingsController } from './desk-bookings.controller';
import { DeskBookingsService } from './desk-bookings.service';
import { DesksService } from '../desks/desks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DeskBooking, DeskBookingSchema } from 'src/shared/schemas/desk-booking.schema';
import { Desk, DeskSchema } from 'src/shared/schemas/desk.schema';

@Module({
  controllers: [DeskBookingsController],
  imports: [MongooseModule.forFeature([{ name: DeskBooking.name, schema: DeskBookingSchema }, { name: Desk.name, schema: DeskSchema }])],
  providers: [DeskBookingsService, DesksService]
})
export class DeskBookingsModule { }
