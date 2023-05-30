import { DeskBookingState } from 'src/shared/models/desk-booking-state.model';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { DeskBooking } from 'src/shared/schemas/desk-booking.schema';
import { DeskBookingsService } from './desk-bookings.service';

export type Criteria = {
    checkInDateTime: string;
    checkOutDateTime: string;
};

@Controller('desk-bookings')
export class DeskBookingsController {

    constructor(private readonly deskBookingsService: DeskBookingsService) { }

    @Get()
    public findAll(): Promise<DeskBooking[]> {
        return this.deskBookingsService.findAll();
    }

    @Post('state')
    public async findDesksBookingState(@Body() criteria: Criteria): Promise<DeskBookingState[]> {
        return this.deskBookingsService.findDesksBookingState(criteria);
    }

    @Post()
    public create(@Body() booking: DeskBooking): Promise<DeskBooking> {
        return this.deskBookingsService.create(booking);
    }
}
