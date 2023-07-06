import { Body, Controller, Post } from '@nestjs/common';
import { OutlookCalendarService } from './outlook-calendar.service';

@Controller('outlook-calendar')
export class OutlookCalendarController {

    constructor(private readonly outlookCalendarService: OutlookCalendarService) { }

    @Post('schedule-meeting')
    public create(@Body() payload: any): Promise<unknown> {
        return this.outlookCalendarService.scheduleMeeting(payload);
    }

}
