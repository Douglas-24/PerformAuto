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

    async sendVerifyEmail(to:string, name:string, url:string){
        await this.mailerService.sendMail({
            to,
            subject: 'Verifica tu cuenta',
            template: 'verifiAccount',
            context: {name, url}
        })
    }

    async sendForgotPass(to:string, name:string, url:string){
        await this.mailerService.sendMail({
            to,
            subject: 'Restablecer contraseña',
            template: 'forgotPass',
            context: {name, url}
        })
    }


}
