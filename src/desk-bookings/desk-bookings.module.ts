import { DeskBooking, DeskBookingSchema } from 'src/shared/schemas/desk-booking.schema';
import { DesksServiceModule } from '../shared/services/desk/desks-service.module';
import { OfficeLayoutService } from '../office-layout/office-layout.service';
import { DeskBookingsController } from './desk-bookings.controller';
import { DeskBookingsService } from './desk-bookings.service';
import { SharedModule } from '../shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DeskBookingsController],
  imports: [
    SharedModule,
    DesksServiceModule,
    MongooseModule.forFeature([{ name: DeskBooking.name, schema: DeskBookingSchema }])],
  providers: [
    DeskBookingsService,
    OfficeLayoutService
  ]
})
export class DeskBookingsModule { }
