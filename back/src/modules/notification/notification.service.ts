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
  async createNotificationForUser(dataNotification: { notification: CreateNotificationDto}) {
   
      const notification = await this.prisma.notifications.create({
        data: {
          typeNotifycation: dataNotification.notification.typeNotifycation,
          title: dataNotification.notification.title,
          message: dataNotification.notification.message,
          id_user: dataNotification.notification.id_user,
          employeeId: dataNotification.notification.employeeId
        }
      })

      
      if(dataNotification.notification.id_user)
      this.notificationSocket.sendNotificationToUser(dataNotification.notification.id_user, notification)
    
    if(dataNotification.notification.employeeId)
      this.notificationSocket.sendNotificationToEmployee(dataNotification.notification.employeeId, notification)
  }

  async findAllNotificationUser(id:number) {
    return await this.prisma.notifications.findMany({
      where: {
        id_user: id
      }
    })    
  }

  async findAllNotificationEmployee(id: number) {
    return await this.prisma.notifications.findMany({
      where:{
        employeeId: id
      }
    })
  }

  async markAsRead(id:number){
    return await this.prisma.notifications.update({
      where: {id},
      data: {
        read: true
      }
    })
  }

  async remove(id: number) {
    return await this.prisma.notifications.delete({
      where: {id: id}
    }) ;
  }
}
