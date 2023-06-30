import { RoomOfficeLayoutSVGData } from 'src/shared/models/room-office-layout.model';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SearchCriteria } from 'src/shared/models/booking-state.model';
import { RoomBookingInfo } from 'src/shared/models/room-booking.model';
import { RoomBooking } from 'src/shared/schemas/room-booking.schema';
import { RoomBookingsService } from './room-bookings.service';

@Controller('room-bookings')
export class RoomBookingsController {

    constructor(private readonly roomBookingsService: RoomBookingsService) { }

    @Get()
    public findAll(): Promise<RoomBooking[]> {
        return this.roomBookingsService.findAll();
    }

    @Get(':userId')
    public findAllByUser(@Param('userId') userId: string): Promise<RoomBookingInfo[]> {
        return this.roomBookingsService.findRoomBookingsByUser(userId);
    }

    @Post()
    public create(@Body() booking: RoomBooking): Promise<RoomBooking> {
        return this.roomBookingsService.create(booking);
    }

    @Delete(':roomBookingId')
    public deleteOne(@Param('roomBookingId') roomBookingId: string): Promise<void> {
        return this.roomBookingsService.deleteOne(roomBookingId);
    }

    @Post('state/office-layout')
    public getOfficeLayoutWithRoomBookingsState(@Body() searchCriteria: SearchCriteria): Promise<RoomOfficeLayoutSVGData[]> {
        return this.roomBookingsService.getOfficeLayoutWithRoomBookingsState(searchCriteria);
    }
}
