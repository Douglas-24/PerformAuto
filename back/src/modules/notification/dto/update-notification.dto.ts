import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationDto, NotificationFileDto } from './create-notification.dto';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {}
