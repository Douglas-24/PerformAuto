import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MailModule } from '../mail/mail.module';
import { SocketModule } from '../sockets/socket.module';
import { AwsS3Module } from '../aws-s3/aws-s3.module';
@Module({
  imports: [MailModule, SocketModule, AwsS3Module],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService]
})
export class NotificationModule {}
