import { DeskOfficeLayoutSVGData, DeskSvgRectAttribut } from 'src/shared/models/desk-office-layout.model';
import { RoomOfficeLayoutSVGData } from 'src/shared/models/room-office-layout.model';
import { DeskBookingState } from 'src/shared/models/desk-booking.model';
import { RoomBookingState } from 'src/shared/models/room-booking.model';
import { OfficeLayoutService } from './office-layout.service';
import { Body, Controller, Get } from '@nestjs/common';

@Controller('office-layout')
export class OfficeLayoutController {

    constructor(private readonly officeLayoutService: OfficeLayoutService) { }

    @Get()
    public getDeskOfficeLayout(): DeskSvgRectAttribut[] {
        return this.officeLayoutService.getRawDeskOfficeLayout();
    }

    @Get('/desk-bookings-state')
    public getOfficeLayoutWithDeskBookingsState(@Body() listDeskBookingState: DeskBookingState[]): DeskOfficeLayoutSVGData[] {
        return this.officeLayoutService.getOfficeLayoutWithDeskBookingsState(listDeskBookingState);
    }

    @Get('/room-bookings-state')
    public getOfficeLayoutWithRoomBookingsState(@Body() listRoomBookingState: RoomBookingState[]): RoomOfficeLayoutSVGData[] {
        return this.officeLayoutService.getOfficeLayoutWithRoomBookingsState(listRoomBookingState);
    }
}
