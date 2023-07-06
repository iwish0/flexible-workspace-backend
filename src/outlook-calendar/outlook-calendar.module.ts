import { Module } from '@nestjs/common';
import { OutlookCalendarController } from './outlook-calendar.controller';
import { OutlookCalendarService } from './outlook-calendar.service';


@Module({
  controllers: [OutlookCalendarController],
  providers: [OutlookCalendarService],
})
export class OutlookCalendarModule {}
