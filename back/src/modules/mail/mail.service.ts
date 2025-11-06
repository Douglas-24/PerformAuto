import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendWelcone(to:string, name:string, password:string){
        await this.mailerService.sendMail({
            to,
            subject: 'Bienvenido a PerforAuto',
            template: 'welcome',
            context: {name, password}
        })
    }
}
