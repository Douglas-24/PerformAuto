import { Injectable } from '@nestjs/common';
import { CreateNotificationDto, NotificationFileDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { NotificationSocketGateWay } from '../sockets/notifications-socket.gateway';
import { AwsS3Service } from '../aws-s3/aws-s3.service';
import { NotificationType } from '@prisma/client';
@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly awsService: AwsS3Service,
    private readonly notificationSocket: NotificationSocketGateWay,
  ) { }
  async createNotificationForUser(dataNotification: { notification: CreateNotificationDto, files?: Express.Multer.File[] }) {
   
      const notification = await this.prisma.notifications.create({
        data: {
          typeNotifycation: dataNotification.notification.typeNotifycation,
          title: dataNotification.notification.title,
          message: dataNotification.notification.message,
          id_user: dataNotification.notification.id_user,
          employeeId: dataNotification.notification.employeeId
        }
      })

      let uploadedFiles: { url: string; typeFile: string }[] = [];
      if (dataNotification.files && dataNotification.files.length > 0) {
        uploadedFiles = await this.awsService.uploadFiles(dataNotification.files)
        await this.prisma.notificationFile.createMany({
          data: uploadedFiles.map(file => ({
            notificationId: notification.id,
            url: file.url,
            type: file.typeFile,
          })),
        });
      }
      if(dataNotification.notification.id_user)
      this.notificationSocket.sendNotificationToUser(dataNotification.notification.id_user, notification)
    
    if(dataNotification.notification.employeeId)
      this.notificationSocket.sendNotificationToEmployee(dataNotification.notification.employeeId, notification)
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
