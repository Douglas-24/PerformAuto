import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { apiResponse } from 'src/core/utils/apiResponse';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}



  @Get('notification-employee/:id')
  async allNotificarionEmployee(@Param('id') id:string):Promise<successfulResponse> {
    const allNotification = await this.notificationService.findAllNotificationEmployee(+id);
    return apiResponse(200, 'Notificaciones del empleado', allNotification)
  }
  
  @Get('notification-user/:id')
  async findOne(@Param('id') id: string):Promise<successfulResponse> {
    const allNotification = await this.notificationService.findAllNotificationUser(+id)
    return apiResponse(200, 'Notificaciones del usuario', allNotification)
  }
  
  @Get('mark-read/:id')
  async markRead(@Param('id') id: string):Promise<successfulResponse> {
    const allNotification = await this.notificationService.markAsRead(+id)
    return apiResponse(200, 'Notificaciones leida')
  }
  
  
  @Delete(':id')
  async remove(@Param('id') id: string):Promise<successfulResponse>{
    await this.notificationService.remove(+id);
    return apiResponse(200, 'Notificacion eliminada')
  }
}
