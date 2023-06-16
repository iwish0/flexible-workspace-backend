import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { DeskBookingInfo, DeskBookingState } from 'src/shared/models/desk-booking.model';
import { OfficeLayoutSVGData } from 'src/shared/models/office-layout.models';
import { SearchCriteria } from 'src/shared/models/booking-state.model';
import { DeskBooking } from 'src/shared/schemas/desk-booking.schema';
import { DeskBookingsService } from './desk-bookings.service';

@Controller('desk-bookings')
export class DeskBookingsController {

    constructor(private readonly deskBookingsService: DeskBookingsService) { }

    @Get()
    public findAll(): Promise<DeskBooking[]> {
        return this.deskBookingsService.findAll();
    }

    @Get(':userId')
    public findAllByUser(@Param('userId') userId: string): Promise<DeskBookingInfo[]> {
        return this.deskBookingsService.findDeskBookingHistoryByUser(+userId);
    }

    @Post('state')
    public findDesksBookingState(@Body() searchCriteria: SearchCriteria): Promise<DeskBookingState[]> {
        return this.deskBookingsService.findDesksBookingState(searchCriteria);
    }

    @Post('state/office-layout')
    public getOfficeLayoutWithDeskBookingsState(@Body() searchCriteria: SearchCriteria): Promise<OfficeLayoutSVGData[]> {
        return this.deskBookingsService.getOfficeLayoutWithDeskBookingsState(searchCriteria);
    }

    @Post()
    public create(@Body() booking: DeskBooking): Promise<DeskBooking> {
        return this.deskBookingsService.create(booking);
    }

    @Delete(':deskBookingId')
    public deleteOne(@Param('deskBookingId') deskBookingId: string): Promise<void> {
        return this.deskBookingsService.deleteOne(deskBookingId);;
    }
}
