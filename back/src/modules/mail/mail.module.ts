import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports:[
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: 587,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: `"${process.env.MAIL_FROM}" <${process.env.MAIL_USER}>`,
      },
      template: {
        dir: join(process.cwd(), 'dist', 'modules', 'mail', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    })
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
