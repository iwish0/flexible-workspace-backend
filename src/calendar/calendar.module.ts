import { CalendarServiceModule } from '../shared/services/calendar/calendar-service.module';
import { CalendarController } from './calendar.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CalendarController],
  imports:[CalendarServiceModule]
})
export class CalendarModule {}
