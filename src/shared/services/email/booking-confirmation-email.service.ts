import { BookingConfirmation } from '../../models/template/email/booking-confirmation.model';
import { DeskBookingConfirmationEmailConstant } from 'src/shared/constants/email.constant';
import { SmtpEnvVariable } from 'src/shared/models/config/env-variable-config.model';
import { DeskBooking } from '../../schemas/desk-booking.schema';
import { SMTP } from 'src/shared/constants/config.constant';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Desk } from 'src/shared/schemas/desk.schema';
import { DateUtils } from '../../utils/date.utils';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { Injectable } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import Mail from 'nodemailer/lib/mailer';
import { compile } from 'handlebars';
import { join } from 'node:path';

@Injectable()
export class BookingConfirmationEmailService {

    constructor(
        private readonly emailService: EmailService,
        private readonly config: ConfigService
    ) { }

    public async sendDeskBookingConfirmationEmail(
        booking: DeskBooking,
        desk: Desk
    ): Promise<SMTPTransport.SentMessageInfo> {
        const { checkInDateTime, checkOutDateTime, user } = booking;
        const templateData: BookingConfirmation = {
            checkInDate: DateUtils.dateToString(checkInDateTime),
            checkOutDate: DateUtils.dateToString(checkOutDateTime),
            deskName: desk.name
        };
        const { subject, templatePath } = DeskBookingConfirmationEmailConstant;
        const srcDirname: string = __dirname.replace('dist', 'src');
        const emailTemplateSource: string = await readFile(join(srcDirname, templatePath), 'utf-8');
        const template = compile(emailTemplateSource);
        const htmlToSend = template(templateData);
        let mailOptions: Mail.Options = {
            from: this.config.get<SmtpEnvVariable>(SMTP).emailSenderAdress,
            to: user.email,
            subject,
            html: htmlToSend
        };
        return this.emailService.sendEmail(mailOptions);
    }
}
