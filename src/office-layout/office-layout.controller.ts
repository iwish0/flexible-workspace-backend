import { Body, Controller, Get } from '@nestjs/common';
import { OfficeLayoutService } from './office-layout.service';
import { OfficeLayoutSVGData, SvgRectAttribut } from 'src/shared/models/office-layout.models';
import { DeskBookingState } from 'src/shared/models/desk-booking.model';

@Controller('office-layout')
export class OfficeLayoutController {

    constructor(private readonly officeLayoutService: OfficeLayoutService) { }

    @Get()
    public getOfficeLayout(): SvgRectAttribut[] {
        return this.officeLayoutService.getRawOfficeLayout();
    }

    @Get('/desk-bookings-state')
    public getOfficeLayoutWithDeskBookingsState(@Body() listDeskBookingState: DeskBookingState[]): OfficeLayoutSVGData[] {
        return this.officeLayoutService.getOfficeLayoutWithDeskBookingsState(listDeskBookingState);
    }
}
