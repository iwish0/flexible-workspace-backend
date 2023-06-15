import { DeskBookingInfo, DeskBookingState, SearchCriteria } from 'src/shared/models/desk-booking.model';
import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { OfficeLayoutSVGData } from 'src/shared/models/office-layout.models';
import { DeskBooking } from 'src/shared/schemas/desk-booking.schema';
import { DeskBookingsService } from './desk-bookings.service';

@Controller('desk-bookings')
export class DeskBookingsController {

    constructor(private readonly deskBookingsService: DeskBookingsService) { }

    @Get()
    public findAll(): Promise<DeskBooking[]> {
        return this.deskBookingsService.findAll().catch((error) => error);
    }

    @Get(':userId')
    public findAllByUser(@Param('userId') userId: string): Promise<DeskBookingInfo[]> {
        return this.deskBookingsService.findDeskBookingHistoryByUser(+userId).catch((error) => error);
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
    public async create(@Body() booking: DeskBooking): Promise<DeskBooking> {
        try {
            const savedDeskBooking: DeskBooking = await this.deskBookingsService.create(booking);
            return savedDeskBooking
        } catch (e: any) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':bookingId')
    public deleteOne(@Param('bookingId') bookingId: string): Promise<void> {
        return this.deskBookingsService.deleteOne(bookingId).catch((error) => error);
    }
}
