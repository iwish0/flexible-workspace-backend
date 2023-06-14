import { SmtpEnvVariable } from 'src/shared/models/config/env-variable-config.model';
import { SMTP } from 'src/shared/constants/config.constant';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Transporter, createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {

    constructor(private readonly config: ConfigService) { }

    private createTransport(): Transporter<SMTPTransport.SentMessageInfo> {
        const { host, user, pass, port } = this.config.get<SmtpEnvVariable>(SMTP);
        return createTransport({
            host,
            port: +port,
            secure: true, // secure:true for port 465, secure:false for port 587
            auth: {
                user,
                pass
            }
        });
    }

    public sendEmail(mailOptions: Mail.Options): Promise<SMTPTransport.SentMessageInfo> {
        return this.createTransport().sendMail(mailOptions);
    }
}
