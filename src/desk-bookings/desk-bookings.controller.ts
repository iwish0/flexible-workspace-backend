import { DeskBookingState, SearchCriteria } from 'src/shared/models/desk-booking-state.model';
import { OfficeLayoutSVGData } from 'src/shared/models/office-layout.models';
import { DeskBooking } from 'src/shared/schemas/desk-booking.schema';
import { DeskBookingsService } from './desk-bookings.service';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('desk-bookings')
export class DeskBookingsController {

    constructor(private readonly deskBookingsService: DeskBookingsService) { }

    @Get()
    public findAll(): Promise<DeskBooking[]> {
        return this.deskBookingsService.findAll().catch((error) => error);
    }

    @Post('state')
    public findDesksBookingState(@Body() searchCriteria: SearchCriteria): Promise<DeskBookingState[]> {
        return this.deskBookingsService.findDesksBookingState(searchCriteria).catch((error) => error);
    }

    @Post('state/office-layout')
    public getOfficeLayoutWithDeskBookingsState(@Body() searchCriteria: SearchCriteria): Promise<OfficeLayoutSVGData[]> {
        return this.deskBookingsService.getOfficeLayoutWithDeskBookingsState(searchCriteria).catch((error) => error);
    }

    @Post()
    public create(@Body() booking: DeskBooking): Promise<DeskBooking> {
        return this.deskBookingsService.create(booking).catch((error) => error);
    }
}
