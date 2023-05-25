import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from 'src/shared/schemas/booking.schema';

@Module({
  controllers: [BookingsController],
  imports: [MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }])],
  providers: [BookingsService]
})
export class BookingsModule { }
