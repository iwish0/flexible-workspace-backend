import { bookingConfirmationEmailTemplatePath, deskBookingConfirmationEmailTitle, roomkBookingConfirmationEmailTitle } from 'src/shared/constants/email.constant';
import { BookingConfirmationEmailTemplateData } from '../../models/template/email/booking-confirmation.model';
import { SmtpEnvVariable } from 'src/shared/models/config/env-variable-config.model';
import { RoomBooking } from 'src/shared/schemas/room-booking.schema';
import { DeskBooking } from '../../schemas/desk-booking.schema';
import { SMTP } from 'src/shared/constants/config.constant';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Desk } from 'src/shared/schemas/desk.schema';
import { Room } from 'src/shared/schemas/room.schema';
import { User } from 'src/shared/models/user.model';
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

    public sendDeskBookingConfirmationEmail(
        booking: DeskBooking,
        desk: Desk
    ): Promise<SMTPTransport.SentMessageInfo> {
        const { checkInDateTime, checkOutDateTime, user } = booking;
        const templateData: BookingConfirmationEmailTemplateData = {
            title: deskBookingConfirmationEmailTitle,
            checkInDate: DateUtils.dateToString(checkInDateTime),
            checkOutDate: DateUtils.dateToString(checkOutDateTime),
            bookingObjectName: desk.name,
            bookingType: 'desk'
        };
        return this.sendBookingConfirmationEmail(user, templateData);
    }

    public sendRoomBookingConfirmationEmail(
        booking: RoomBooking,
        room: Room
    ): Promise<SMTPTransport.SentMessageInfo> {
        const { checkInDateTime, checkOutDateTime, user } = booking;
        const templateData: BookingConfirmationEmailTemplateData = {
            title: roomkBookingConfirmationEmailTitle,
            checkInDate: DateUtils.dateToString(checkInDateTime),
            checkOutDate: DateUtils.dateToString(checkOutDateTime),
            checkInTime: '',
            checkOutTime: '',
            bookingObjectName: room.name,
            bookingType: 'room'
        };
        return this.sendBookingConfirmationEmail(user, templateData);
    }

    public async sendBookingConfirmationEmail(
        user: User,
        templateData: BookingConfirmationEmailTemplateData
    ): Promise<SMTPTransport.SentMessageInfo> {
        const srcDirname: string = __dirname.replace('dist', 'src');
        const emailTemplateSource: string = await readFile(join(srcDirname, bookingConfirmationEmailTemplatePath), 'utf-8');
        const template = compile(emailTemplateSource);
        const htmlToSend = template(templateData);
        let mailOptions: Mail.Options = {
            from: this.config.get<SmtpEnvVariable>(SMTP).emailSenderAdress,
            to: user.email,
            subject: templateData.title,
            html: htmlToSend
        };
        return this.emailService.sendEmail(mailOptions);
    }
}
