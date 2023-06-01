import { DeskBookingState } from 'src/shared/models/desk-booking-state.model';
import { OfficeLayoutSVGData } from 'src/shared/models/office-layout.models';
import { DeskBooking } from 'src/shared/schemas/desk-booking.schema';
import { DeskBookingsService } from './desk-bookings.service';
import { Controller, Get, Post, Body } from '@nestjs/common';

export type Criteria = {
    checkInDateTime: string;
    checkOutDateTime: string;
};

@Controller('desk-bookings')
export class DeskBookingsController {

    constructor(private readonly deskBookingsService: DeskBookingsService) { }

    @Get()
    public findAll(): Promise<DeskBooking[]> {
        return this.deskBookingsService.findAll().catch((error) => error);
    }

    @Post('state')
    public findDesksBookingState(@Body() criteria: Criteria): Promise<DeskBookingState[]> {
        return this.deskBookingsService.findDesksBookingState(criteria).catch((error) => error);
    }

    @Post('state/office-layout')
    public getOfficeLayoutWithDeskBookingsState(@Body() criteria: Criteria): Promise<OfficeLayoutSVGData[]> {
        return this.deskBookingsService.getOfficeLayoutWithDeskBookingsState(criteria).catch((error) => error);
    }

    @Post()
    public create(@Body() booking: DeskBooking): Promise<DeskBooking> {
        return this.deskBookingsService.create(booking).catch((error) => error);
    }
}
