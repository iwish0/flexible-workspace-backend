import { BookingConfirmationEmailService } from './services/email/booking-confirmation-email.service';
import { EmailService } from './services/email/email.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [
        EmailService,
        BookingConfirmationEmailService
    ],
    exports: [
        EmailService,
        BookingConfirmationEmailService
    ]
})
export class SharedModule { }
