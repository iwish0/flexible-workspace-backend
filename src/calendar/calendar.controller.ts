import { EventScheduleDetail } from 'src/shared/models/event-schedule.model';
import { CalendarService } from '../shared/services/calendar/calendar.service';
import { Controller, Body, Post } from '@nestjs/common';



@Controller('calendar')
export class CalendarController {

    constructor(private readonly calendarService: CalendarService) { }

    @Post('schedule-event')
    public scheduleEvent(@Body() eventSchedule: EventScheduleDetail): Promise<unknown> {
        return this.calendarService.scheduleEvent(eventSchedule);
    }
}
