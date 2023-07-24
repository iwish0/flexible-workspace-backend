import { CalendarService } from './calendar.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [CalendarService],
    exports: [CalendarService]
})
export class CalendarServiceModule { }
