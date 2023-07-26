import { AuthProviderModule } from '../auth-provider/auth-provider.module';
import { CalendarService } from './calendar.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [CalendarService],
    exports: [CalendarService],
    imports: [AuthProviderModule]
})
export class CalendarServiceModule { }
